import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ChatMessageType } from '@/types/types'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  const { message } = await req.json()
  const content = message.content

  const isAllowed = await checkPoints()
  if (!isAllowed) {
    return NextResponse.json({
      error: 'No points available, please try again tomorrow',
    })
  }

  // return NextResponse.json({
  //   data: {
  //     main_picture: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
  //     title: 'title of ani',
  //     mal_id: '5114',
  //     role: 'ai',
  //   },
  // })

  // create embedding from openai based on message
  const embedding = await createEmbedding(content)
  // query semantic search from mongodb databse
  const results = await semanticSearch(embedding)
  const object = results[0] as ChatMessageType

  return NextResponse.json({
    data: {
      ...object,
      role: 'ai',
    },
  })
}

const checkPoints = async () => {
  const { id } = await getUserByClerkId()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      gpt_points: true,
      refresh_date: true,
    },
  })

  if (user.gpt_points > 0) {
    await removePoint(id, user.gpt_points)
    return true
  }
  return false
}

const removePoint = async (id: string, currentPoints: number) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      gpt_points: currentPoints - 1,
    },
  })
}

const createEmbedding = async (content: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: content,
  })

  const { data } = embeddingResponse
  return data[0].embedding
}

const semanticSearch = async (embedding: number[]) => {
  const results = await prisma.anime.aggregateRaw({
    pipeline: [
      {
        $vectorSearch: {
          queryVector: embedding,
          path: 'embeddings',
          limit: 1,
          numCandidates: 10,
          index: 'animeEmbeddingIndex',
        },
      },
      {
        $project: {
          title: 1,
          main_picture: 1,
          mal_id: 1,
        },
      },
    ],
  })

  return results
}
