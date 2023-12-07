import Image from 'next/image'
import SearchAnime from './SearchAnime'

const Hero = () => {
  return (
    <section className="bg-white dark:bg-slate-900/40 mb-2">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Your Digital Haven for Anime Enthusiasts
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Discover, Collect, and Dive into a Vast Universe of Anime Adventures
            Right at Your Fingertips
          </p>
          <div className="w-3/4 mx-auto">
            <SearchAnime />
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex mx-auto shadow">
          <img
            width={400}
            height={200}
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  )
}
export default Hero
