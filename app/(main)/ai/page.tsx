import { Metadata } from 'next'
import Chat from './Chat'

export const metadata: Metadata = {
  title: 'MyAnimeStore - Anime AI',
  description:
    'Explore advanced AI analysis and recommendations for anime content.',
}

const AiPage = () => {
  return (
    <main>
      <div className="md:w-1/2 w-full px-2 md:px-0 shadow-2xl mx-auto">
        <h2>Ask AI For A Recommendation</h2>
        <Chat />
      </div>
    </main>
  )
}
export default AiPage
