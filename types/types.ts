export type AnimeCardType = {
  id: string
  mal_id: number
  title: string
  main_picture: string
}

export type ChatMessageType = {
  role: string
  content?: string
  title?: string
  mal_id?: number
  _id?: string
  main_picture?: string
}
