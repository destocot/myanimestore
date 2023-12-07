'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChatMessageType } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAngleLeft, FaAngleRight, FaSearch } from 'react-icons/fa'
import z from 'zod'

const formatMessage = (message: string) => {
  return { role: 'user', content: message }
}

const Chat = ({ points }: { points: number }) => {
  const [history, setHistory] = useState<ChatMessageType[]>([])
  const [disabled, setDisabled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (history.length > 1) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [history])

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    if (points <= 0) {
      return form.setError('message', {
        type: 'custom',
        message: 'No points available, please try again tomorrow',
      })
    }

    setDisabled(true)
    const formatted = formatMessage(values.message)
    setHistory([...history, formatted])

    const res = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ history, message: formatted }),
    })
    const json = await res.json()

    if (json.error) {
      return form.setError('message', {
        type: 'custom',
        message: json.error,
      })
    } else {
      setHistory([...history, formatted, json.data])
      form.reset({ message: '' })
    }
    router.refresh()
    setDisabled(false)
  }

  const formSchema = z.object({
    message: z.string().min(3, {
      message: 'Search must be at least 3 characters',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex gap-2 relative min-w-1/3"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. an anime with ninjas and cats"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-6 whitespace-nowrap text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={disabled}>
            <FaSearch className="text-white" />
          </Button>
        </form>
      </Form>
      <div className="mt-8 space-y-2 mx-auto max-h-[50vh] hscrollbar overflow-y-auto">
        {history.map((message) => (
          <div
            key={message.content}
            className="bg-slate-900/40 shadow py-1 px-4 rounded w-full"
          >
            {displayMessage(message)}
          </div>
        ))}
        <div ref={ref}></div>
      </div>
    </div>
  )
}
export default Chat

const displayMessage = (message: ChatMessageType) => {
  if (message.role === 'user') {
    return (
      <p className="text-lg flex items-center">
        <FaAngleRight />
        {message.content}
      </p>
    )
  } else {
    return (
      <div className="flex gap-2 text-lg min-h-[150px]">
        <img
          src={message.main_picture || ''}
          alt="anime image"
          width={400}
          height={600}
          className="object-cover w-24 h-auto aspect-[2/3]"
        />
        <div className="flex flex-col justify-between">
          <p>
            <div className="flex items-center">
              <FaAngleLeft className="text-xl" />
              You might enjoy:{' '}
            </div>
            <Link
              aria-label="anime details"
              href={`/anime/${message.mal_id}`}
              className="font-semibold transition-all hover:text-blue-500"
            >
              {message.title}
            </Link>
          </p>
          <p className="">
            click{' '}
            <Link
              aria-label="anime details"
              href={`/anime/${message.mal_id}`}
              className="font-semibold text-blue-500"
            >
              here
            </Link>{' '}
            to find out more information
          </p>
        </div>
      </div>
    )
  }
}
