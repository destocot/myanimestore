import Link from 'next/link'
import { FolderKanbanIcon, GithubIcon, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="dark:bg-slate-900/40">
      <div className="container flex flex-wrap items-center px-4 py-8 mx-auto justify-between max-w-5xl">
        <div className="flex flex-wrap justify-center">
          <ul className="flex items-center space-x-4">
            <li className="hover:underline underline-offset-4">
              <Link href={'/'}>Home</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link href={'/profile'}>Profile</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link href={'/search/anime/page/1'}>Search</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link href={'/top'}>Khurram&apos;s Top 10</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center space-x-4 lg:mt-0">
          <Link href={'https://www.linkedin.com/in/khurram-ali1/'}>
            <Linkedin />
          </Link>
          <Link href={'https://github.com/destocot'}>
            <GithubIcon />
          </Link>
          <Link href={'https://khurramali.site'}>
            <FolderKanbanIcon />
          </Link>
          <Link href={'https://www.instagram.com/instrumentalwords/'}>
            <Instagram />
          </Link>
        </div>
      </div>
      <div className="pb-2">
        <p className="text-center">
          @2023 All rights reserved MyAnimeStore - Khurram Ali
        </p>
      </div>
    </footer>
  )
}
