import { AppLayout } from "@/components/AppLayout";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { BarChart, Book, GraduationCap, AlertTriangle } from "lucide-react";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";

    // Sample data - in a real app, this would come from a backend
    const studentData = {
      id: "STU001",
      name: "John Smith",
      subjects: [
        { name: "Mathematics", attendance: 85, marks: { midterm: 78, final: 82 } },
        { name: "Physics", attendance: 92, marks: { midterm: 88, final: 90 } },
        { name: "Computer Science", attendance: 78, marks: { midterm: 75, final: 80 } },
      ]
    };

    const StudentDashboard = () => {
      const navigate = useNavigate();
      const [currentUser, setCurrentUser] = useState<any>(null);

      useEffect(() => {
        const userData = sessionStorage.getItem("currentUser");
        if (!userData || JSON.parse(userData).role !== 'student') {
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
          studentData.subjects.reduce((acc, subj) => acc + subj.attendance, 0) / 
          studentData.subjects.length
        );
      };

      const getAverageMarks = () => {
        return Math.round(
          studentData.subjects.reduce((acc, subj) => 
            acc + ((subj.marks.midterm + subj.marks.final) / 2), 0
          ) / studentData.subjects.length
        );
      };

      const getLowAttendanceSubjects = () => {
        return studentData.subjects.filter(s => s.attendance < 75);
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
                <p className="text-slate-500 mt-2">View your academic progress</p>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
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
                    <h3 className="text-2xl font-bold">{getLowAttendanceSubjects().length}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Midterm Marks</TableHead>
                      <TableHead>Final Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.subjects.map((subject) => (
                      <TableRow key={subject.name}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{subject.attendance}%</TableCell>
                        <TableCell>{subject.marks.midterm}%</TableCell>
                        <TableCell>{subject.marks.final}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </AppLayout>
      );
    };

    export default StudentDashboard;
