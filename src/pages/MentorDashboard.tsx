import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { BarChart, Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'recharts';
import { Book, GraduationCap, AlertTriangle } from "lucide-react";

// Sample data - in a real app, this would come from a backend
const studentsData = [
  { 
    id: "STU001",
    name: "John Smith",
    subjects: [
      { name: "Mathematics", attendance: 85, marks: { midterm: 78, final: 82 } },
      { name: "Physics", attendance: 92, marks: { midterm: 88, final: 90 } },
      { name: "Computer Science", attendance: 78, marks: { midterm: 75, final: 80 } },
    ]
  },
  { 
    id: "STU002",
    name: "Emma Wilson",
    subjects: [
      { name: "Mathematics", attendance: 90, marks: { midterm: 85, final: 88 } },
      { name: "Physics", attendance: 88, marks: { midterm: 82, final: 85 } },
      { name: "Computer Science", attendance: 95, marks: { midterm: 92, final: 94 } },
    ]
  }
];

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState(studentsData[0]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("currentUser");
    if (!userData) {
      navigate("/");
      return;
    }
    setCurrentUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  const getAverageAttendance = () => {
    return Math.round(
      currentStudent.subjects.reduce((acc, subj) => acc + subj.attendance, 0) / 
      currentStudent.subjects.length
    );
  };

  const getAverageMarks = () => {
    return Math.round(
      currentStudent.subjects.reduce((acc, subj) => 
        acc + ((subj.marks.midterm + subj.marks.final) / 2), 0
      ) / currentStudent.subjects.length
    );
  };

  if (!currentUser) return null;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-slate-500 mt-2">Monitor your ward's academic progress</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Student
          </label>
          <Select 
            value={currentStudent.id}
            onValueChange={(value) => {
              const student = studentsData.find(s => s.id === value);
              if (student) setCurrentStudent(student);
            }}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {studentsData.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Attendance</p>
                <h3 className="text-2xl font-bold">{getAverageAttendance()}%</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Marks</p>
                <h3 className="text-2xl font-bold">{getAverageMarks()}%</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Low Attendance Subjects</p>
                <h3 className="text-2xl font-bold">
                  {currentStudent.subjects.filter(s => s.attendance < 75).length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{subject.name}</span>
                      <span className={`font-medium ${
                        subject.attendance >= 75 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {subject.attendance}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          subject.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.attendance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex space-x-4 text-sm">
                        <span>Midterm: {subject.marks.midterm}%</span>
                        <span>Final: {subject.marks.final}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ 
                          width: `${(subject.marks.midterm + subject.marks.final) / 2}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default MentorDashboard;
