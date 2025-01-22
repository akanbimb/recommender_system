import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Learn Anything, Anytime, Anywhere
      </h1>
      <p className="max-w-[640px] text-center text-lg text-muted-foreground sm:text-xl">
        Discover a world of knowledge with our AI-powered learning platform. Get personalized course recommendations and expert guidance.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">Explore Courses</Button>
      </div>
    </section>
  )
}

