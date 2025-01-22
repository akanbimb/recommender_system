import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">EduLearn</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="/courses">Courses</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <Button className="ml-auto">Sign In</Button>
      </div>
    </header>
  )
}

