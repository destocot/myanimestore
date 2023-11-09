'use client'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  query: z.string().min(3, {
    message: 'Search must be at least 3 characters',
  }),
})

const SearchAnime = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  })

  const submitHandler = (values: z.infer<typeof formSchema>) => {
    router.push(`/search/${values.query}/page/1`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex gap-2 relative min-w-1/3"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Search an anime..."
                  {...field}
                  className=""
                />
              </FormControl>
              <FormMessage className="absolute -top-8 whitespace-nowrap text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit">
          <FaSearch className="text-white" />
        </Button>
      </form>
    </Form>
  )
}

export default SearchAnime
