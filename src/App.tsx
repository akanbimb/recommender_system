
import { Table } from '@/components/ui/table';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './app/page';
import { useState } from "react"
import {
  BarChart,
  BookOpen,
  Calendar,
  ChevronDown,
  Filter,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Star,
  Users,
} from "lucide-react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const recommendationAccuracy = 92
const totalCourses = 1248
const activeUsers = 8742
const avgCourseCompletion = 73.2
const userEngagement = 68.9

const weeklyData = [
  { name: "Mon", accuracy: 85.2, engagement: 64.3 },
  { name: "Tue", accuracy: 86.7, engagement: 67.1 },
  { name: "Wed", accuracy: 84.9, engagement: 65.8 },
  { name: "Thu", accuracy: 87.3, engagement: 69.2 },
  { name: "Fri", accuracy: 88.1, engagement: 71.5 },
  { name: "Sat", accuracy: 89.4, engagement: 72.3 },
  { name: "Sun", accuracy: 87.4, engagement: 68.9 },
]

const categoryData = [
  { name: "Programming", value: 35.8 },
  { name: "Design", value: 24.2 },
  { name: "Business", value: 18.7 },
  { name: "Data Science", value: 15.3 },
  { name: "Other", value: 6.0 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const userFeedback = [
  {
    id: 1,
    user: "Alex Morgan",
    avatar: "/placeholder.svg?height=40&width=40",
    comment:
      "The recommendations are much more relevant to my career goals now. I appreciate the transparency in why courses are suggested.",
    date: "2 days ago",
    sentiment: "positive",
    courseContext: "Web Development",
  },
  {
    id: 2,
    user: "Jamie Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "I'm seeing a better mix of courses. The system seems to understand my learning pace better than before.",
    date: "3 days ago",
    sentiment: "positive",
    courseContext: "UX Design",
  },
  {
    id: 3,
    user: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    comment:
      "Still getting some recommendations that don't align with my skill level. Would like more intermediate options.",
    date: "1 week ago",
    sentiment: "neutral",
    courseContext: "Data Science",
  },
  {
    id: 4,
    user: "Taylor Reed",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "The explanation for why courses are recommended helps me understand if they're worth my time.",
    date: "2 weeks ago",
    sentiment: "positive",
    courseContext: "Business Strategy",
  },
]

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6" />
          <span>EduInsight</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[260px] lg:w-[320px]" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[240px] flex-col border-r bg-muted/40 md:flex">
          <div className="flex flex-col gap-2 p-4">
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
              onClick={() => setSelectedTab("overview")}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
              onClick={() => setSelectedTab("recommendations")}
            >
              <Star className="h-4 w-4" />
              Recommendations
            </Button>
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </Button>
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <Users className="h-4 w-4" />
              Users
            </Button>
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </Button>
            <Button variant="ghost" className="flex items-center justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Recommendation Dashboard</h1>
              <p className="text-muted-foreground">Monitor recommendation performance and user feedback</p>
            </div>
            <Tabs defaultValue="overview" className="mt-6" value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="feedback">User Feedback</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Last 7 days</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                      <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                      <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                      <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Recommendation Accuracy</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{recommendationAccuracy}%</div>
                      <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalCourses}</div>
                      <p className="text-xs text-muted-foreground">+24 new this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{activeUsers}</div>
                      <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Course Completion</CardTitle>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{avgCourseCompletion}%</div>
                      <p className="text-xs text-muted-foreground">+3.4% from last month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Weekly Performance</CardTitle>
                      <CardDescription>Recommendation accuracy and user engagement over time</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ResponsiveContainer width="100%" height={350}>
                        <RechartsLineChart
                          data={weeklyData}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[50, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#8884d8"
                            strokeWidth={2}
                            name="Recommendation Accuracy (%)"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="engagement"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            name="User Engagement (%)"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Course Categories</CardTitle>
                      <CardDescription>Distribution of recommended courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>User Engagement Metrics</CardTitle>
                        <CardDescription>Breakdown of how users interact with recommendations</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart
                        data={[
                          { name: "Click Rate", value: 42.7 },
                          { name: "Enrollment", value: 28.3 },
                          { name: "Completion", value: 73.2 },
                          { name: "Satisfaction", value: 85.6 },
                          { name: "Return Rate", value: 64.1 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="value" fill="#8884d8" name="Percentage" radius={[4, 4, 0, 0]}>
                          {[
                            { name: "Click Rate", value: 42.7 },
                            { name: "Enrollment", value: 28.3 },
                            { name: "Completion", value: 73.2 },
                            { name: "Satisfaction", value: 85.6 },
                            { name: "Return Rate", value: 64.1 },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendation Transparency</CardTitle>
                    <CardDescription>
                      Insights into how recommendations are generated and their accuracy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm font-medium">Algorithm Confidence</div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-[87.4%] rounded-full bg-primary"></div>
                            </div>
                            <span className="text-sm font-medium">87.4%</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-sm font-medium">User Relevance Rating</div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-[82.1%] rounded-full bg-primary"></div>
                            </div>
                            <span className="text-sm font-medium">82.1%</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-sm font-medium">Content Diversity</div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-[76.8%] rounded-full bg-primary"></div>
                            </div>
                            <span className="text-sm font-medium">76.8%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Recommendation Factors</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Breakdown of factors influencing course recommendations
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">User Learning History</div>
                                  <div className="text-sm font-medium">42.5%</div>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div className="h-2 w-[42.5%] rounded-full bg-blue-500"></div>
                                </div>
                              </div>
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">Career Goals</div>
                                  <div className="text-sm font-medium">28.7%</div>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div className="h-2 w-[28.7%] rounded-full bg-green-500"></div>
                                </div>
                              </div>
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">Skill Gaps</div>
                                  <div className="text-sm font-medium">18.3%</div>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div className="h-2 w-[18.3%] rounded-full bg-yellow-500"></div>
                                </div>
                              </div>
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">Similar User Patterns</div>
                                  <div className="text-sm font-medium">10.5%</div>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div className="h-2 w-[10.5%] rounded-full bg-red-500"></div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="pt-6">
                              <h4 className="font-medium mb-2">Recommendation Improvements</h4>
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    +12.4%
                                  </Badge>
                                  <span className="text-sm">Relevance improvement</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                    +8.7%
                                  </Badge>
                                  <span className="text-sm">Diversity improvement</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                                    +15.2%
                                  </Badge>
                                  <span className="text-sm">User satisfaction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                    +6.8%
                                  </Badge>
                                  <span className="text-sm">Completion rate</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Feedback on Recommendations</CardTitle>
                    <CardDescription>Qualitative feedback from users about the recommendation system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Sentiment Overview</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Positive: 72.4%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Neutral: 18.3%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Negative: 9.3%</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        {userFeedback.map((feedback) => (
                          <div key={feedback.id} className="rounded-lg border p-4">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={feedback.avatar} alt={feedback.user} />
                                <AvatarFallback>
                                  {feedback.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">{feedback.user}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <span>{feedback.date}</span>
                                      <span>•</span>
                                      <Badge variant="outline">{feedback.courseContext}</Badge>
                                    </div>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={
                                      feedback.sentiment === "positive"
                                        ? "bg-green-50 text-green-700 hover:bg-green-50"
                                        : feedback.sentiment === "neutral"
                                          ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                                          : "bg-red-50 text-red-700 hover:bg-red-50"
                                    }
                                  >
                                    {feedback.sentiment}
                                  </Badge>
                                </div>
                                <p className="mt-2 text-sm">{feedback.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

const routes = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/'>
    <Route index element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
));

const App = () => {
  return (<RouterProvider router={routes} />)
}

export default App;