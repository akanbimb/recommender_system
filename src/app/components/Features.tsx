import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Extensive Course Library",
    description: "Access thousands of courses across various subjects and skill levels."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "AI-Powered Recommendations",
    description: "Get personalized course suggestions based on your interests and learning style."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Interactive Community",
    description: "Connect with fellow learners, join study groups, and participate in discussions."
  }
]

export default function Features() {
  return (
    <section className="container mx-auto py-12 md:py-24 lg:py-32">
      <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">Why Choose EduLearn?</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

