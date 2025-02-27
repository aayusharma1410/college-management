import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Book, UserSquare2, GraduationCap, Users, UserCog } from "lucide-react";

type Role = 'teacher' | 'student' | 'mentor' | 'admin';

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH101", teacher: "Dr. Smith" },
  { id: 2, name: "Physics", code: "PHY201", teacher: "Dr. Johnson" },
  { id: 3, name: "Computer Science", code: "CS301", teacher: "Prof. Davis" },
];

const RoleCard = ({ 
  role, 
  icon: Icon, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  role: Role; 
  icon: any; 
  title: string; 
  description: string; 
  selected: boolean; 
  onClick: () => void; 
}) => (
  <div 
    onClick={onClick}
    className={`${
      selected 
        ? 'border-purple-600 bg-purple-50' 
        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
    } border-2 rounded-lg p-4 cursor-pointer transition-colors`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${selected ? 'bg-purple-100' : 'bg-gray-100'}`}>
        <Icon className={`w-6 h-6 ${selected ? 'text-purple-600' : 'text-gray-600'}`} />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const roles = [
    {
      role: 'teacher' as Role,
      icon: GraduationCap,
      title: 'Teacher Login',
      description: 'Access your class and manage attendance'
    },
    {
      role: 'student' as Role,
      icon: UserSquare2,
      title: 'Student Login',
      description: 'View your attendance and academic records'
    },
    {
      role: 'mentor' as Role,
      icon: Users,
      title: 'Parent/Mentor Login',
      description: 'Monitor your ward\'s progress'
    },
    {
      role: 'admin' as Role,
      icon: UserCog,
      title: 'Admin Login',
      description: 'Manage system and user settings'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Accept all credentials as valid
    switch (selectedRole) {
      case 'teacher':
        // For teachers, create a dummy subject if the code doesn't exist
        const subject = subjects.find(s => s.code.toLowerCase() === subjectCode.toLowerCase()) || {
          id: 999,
          name: "Custom Subject",
          code: subjectCode,
          teacher: "Teacher"
        };
        sessionStorage.setItem("currentSubject", JSON.stringify(subject));
        navigate("/attendance");
        break;

      case 'student':
        sessionStorage.setItem("currentUser", JSON.stringify({ 
          role: 'student', 
          name: username || "Student User", 
          id: "STU001" 
        }));
        navigate("/student-dashboard");
        break;

      case 'mentor':
        sessionStorage.setItem("currentUser", JSON.stringify({ 
          role: 'mentor', 
          name: username || "Mentor User"
        }));
        navigate("/mentor-dashboard");
        break;

      case 'admin':
        sessionStorage.setItem("currentUser", JSON.stringify({ 
          role: 'admin', 
          name: username || "Admin User"
        }));
        navigate("/admin-dashboard");
        break;

      default:
        setError("Please select a role");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Book className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to AMS</h1>
          <p className="text-gray-600">Attendance Management System</p>
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Please select your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {roles.map((role) => (
                <RoleCard
                  key={role.role}
                  {...role}
                  selected={selectedRole === role.role}
                  onClick={() => setSelectedRole(role.role)}
                />
              ))}
            </div>

            {selectedRole && (
              <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
                {selectedRole === 'teacher' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Subject Code
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="e.g. MATH101"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                        required
                        className="pl-10"
                      />
                      <Book className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="pl-10"
                        />
                        <UserSquare2 className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10"
                        />
                        <LockKeyhole className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  Login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          Need help? Contact system administrator
        </div>
      </div>
    </div>
  );
};

export default Index;
