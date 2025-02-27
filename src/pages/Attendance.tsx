import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { BarChart, Users, UserCheck, AlertTriangle } from "lucide-react";

// Sample data - in a real app, this would come from a backend
const studentsData = {
  "MATH101": [
    { id: 1, name: "John Smith", attendance: [], percentage: 85 },
    { id: 2, name: "Emma Wilson", attendance: [], percentage: 92 },
    { id: 3, name: "Michael Brown", attendance: [], percentage: 65 },
    { id: 4, name: "Sarah Davis", attendance: [], percentage: 78 },
    { id: 5, name: "James Wilson", attendance: [], percentage: 45 },
  ],
  "PHY201": [
    { id: 6, name: "Sarah Johnson", attendance: [], percentage: 88 },
    { id: 7, name: "David Lee", attendance: [], percentage: 95 },
    { id: 8, name: "Lisa Anderson", attendance: [], percentage: 72 },
  ],
  "CS301": [
    { id: 9, name: "James Wilson", attendance: [], percentage: 89 },
    { id: 10, name: "Emily Davis", attendance: [], percentage: 94 },
    { id: 11, name: "Robert Taylor", attendance: [], percentage: 68 },
  ]
};

const Attendance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<{[key: string]: boolean}>({});
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    const subjectData = sessionStorage.getItem("currentSubject");
    if (!subjectData) {
      navigate("/");
      return;
    }
    const subject = JSON.parse(subjectData);
    setCurrentSubject(subject);
    setStudents(studentsData[subject.code as keyof typeof studentsData] || []);
  }, [navigate]);

  const handleAttendanceUpdate = (studentId: number, present: boolean) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleSaveAttendance = () => {
    console.log("Saving attendance for:", {
      subject: currentSubject?.name,
      date: date?.toISOString(),
      records: attendanceRecords
    });
    setIsOpen(false);
  };

  const handleExportToExcel = () => {
    console.log("Exporting to Excel...");
    // Implementation for Excel export would go here
  };

  const getLowAttendanceStudents = () => {
    return students.filter(student => student.percentage < 75);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("currentSubject");
    navigate("/");
  };

  if (!currentSubject) return null;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Welcome, {currentSubject.teacher}</h2>
            <p className="text-slate-500 mt-2">
              {currentSubject.name} ({currentSubject.code})
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{students.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Present Today</p>
                <h3 className="text-2xl font-bold">
                  {Object.values(attendanceRecords).filter(Boolean).length}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
                <h3 className="text-2xl font-bold">
                  {Math.round(students.reduce((acc, curr) => acc + curr.percentage, 0) / students.length)}%
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 pt-6">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Low Attendance</p>
                <h3 className="text-2xl font-bold">{getLowAttendanceStudents().length}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </Card>

            <Card className="p-4">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Low Attendance Alerts</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {getLowAttendanceStudents().map(student => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                  >
                    <div>
                      <p className="font-medium text-red-800">{student.name}</p>
                      <p className="text-sm text-red-600">{student.percentage}% attendance</p>
                    </div>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Attendance Register</h3>
                <div className="space-x-2">
                  <Button onClick={() => handleExportToExcel()} variant="outline" size="sm">
                    Export to Excel
                  </Button>
                  <Button onClick={() => setIsOpen(true)}>Take Attendance</Button>
                </div>
              </div>
              
              <div className="space-x-2 mb-4">
                {(['daily', 'weekly', 'monthly'] as const).map((viewType) => (
                  <Button
                    key={viewType}
                    variant={view === viewType ? "default" : "outline"}
                    size="sm"
                    onClick={() => setView(viewType)}
                  >
                    {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                  </Button>
                ))}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Overall %</TableHead>
                    <TableHead>Today's Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.percentage >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.percentage}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          attendanceRecords[student.id] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {attendanceRecords[student.id] ? 'Present' : 'Not marked'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Take Attendance - {currentSubject.name}</SheetTitle>
              <SheetDescription>
                {date?.toLocaleDateString()}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          attendanceRecords[student.id] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {attendanceRecords[student.id] ? 'Present' : 'Absent'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={attendanceRecords[student.id] ? "destructive" : "default"}
                          size="sm"
                          onClick={() => handleAttendanceUpdate(student.id, !attendanceRecords[student.id])}
                        >
                          Mark {attendanceRecords[student.id] ? 'Absent' : 'Present'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSaveAttendance}>
                  Save Attendance
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default Attendance;
