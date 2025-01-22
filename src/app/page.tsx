import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import ChatButton from './components/ChatButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <ChatButton />
    </div>
  )
}

