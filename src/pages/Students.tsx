import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const studentsData = [
  {
    id: 1,
    name: "John Smith",
    studentId: "CS2023001",
    course: "Computer Science",
    attendance: "92%",
  },
  {
    id: 2,
    name: "Emma Wilson",
    studentId: "CS2023002",
    course: "Mathematics",
    attendance: "88%",
  },
  {
    id: 3,
    name: "Michael Brown",
    studentId: "CS2023003",
    course: "Physics",
    attendance: "95%",
  },
];

const Students = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Students</h2>
          <p className="text-slate-500 mt-2">Manage student records</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search students..."
              className="max-w-sm"
            />
            <Button>Add Student</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Students;
