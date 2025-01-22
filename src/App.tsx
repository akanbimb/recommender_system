import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Book, Users, Timer, TrendingUp } from 'lucide-react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './app/page';


const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState('student_1');
  
  // Sample recommendation data
  const recommendations = {
    knn: [
      { course: 'course_1', similarity: 0.85, category: 'CS', difficulty: 'medium' },
      { course: 'course_2', similarity: 0.82, category: 'Math', difficulty: 'hard' },
    ],
    lmf: [
      { course: 'course_3', score: 0.95, category: 'Physics', difficulty: 'medium' },
      { course: 'course_4', score: 0.91, category: 'CS', difficulty: 'easy' },
    ],
    explanation: [
      { feature: 'category_CS', importance: 0.8 },
      { feature: 'difficulty_medium', importance: 0.6 },
      { feature: 'category_Math', importance: 0.4 },
    ]
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium">Total Courses</p>
                <p className="text-2xl font-bold">100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold">1,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Timer className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium">Avg. Completion</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium">Recommendation Accuracy</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>KNN Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Similarity</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.knn.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.course}</td>
                    <td>{(rec.similarity * 100).toFixed(1)}%</td>
                    <td><Badge>{rec.category}</Badge></td>
                    <td><Badge variant="outline">{rec.difficulty}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LMF Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Score</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.lmf.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.course}</td>
                    <td>{(rec.score * 100).toFixed(1)}%</td>
                    <td><Badge>{rec.category}</Badge></td>
                    <td><Badge variant="outline">{rec.difficulty}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Importance (LIME Explanation)</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={600} height={300} data={recommendations.explanation}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="feature" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="importance" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

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