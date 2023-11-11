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
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import z from 'zod'

const formatMessage = (message: string) => {
  return { role: 'user', content: message }
}

const Chat = () => {
  const [history, setHistory] = useState<ChatMessageType[]>([])
  const [disabled, setDisabled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (history.length > 1) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [history])

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setDisabled(true)
    const formatted = formatMessage(values.message)
    setHistory([...history, formatted])

    const res = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ history, message: formatted }),
    })
    const { data } = await res.json()

    setHistory([...history, formatted, data])
    form.reset({ message: '' })
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
    return <p className="text-lg">{message.content}</p>
  } else {
    return (
      <div className="flex gap-2">
        <Image
          src={message.main_picture || ''}
          alt="message image"
          width={400}
          height={600}
          className="object-cover w-20 h-auto aspect-[2/3]"
        />
        <div className="flex flex-col justify-between">
          <p>
            You might enjoy:{' '}
            <span className="text-blue-500 font-semibold">{message.title}</span>
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

/**
 * 
 * {
            return (
              <div
                key={message.content}
                className="bg-slate-900/40 shadow py-1 px-4 rounded w-full"
              >
                <h4>{message.role}</h4>
                <p className="text-lg">{message.content}</p>
              </div>
            )
          }
 */
