import { AppLayout } from "@/components/AppLayout";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { Book, GraduationCap, Users, UserCog } from "lucide-react";

    const AdminDashboard = () => {
      const navigate = useNavigate();
      const [currentUser, setCurrentUser] = useState<any>(null);

      useEffect(() => {
        const userData = sessionStorage.getItem("currentUser");
        if (!userData || JSON.parse(userData).role !== 'admin') {
          navigate("/");
          return;
        }
        setCurrentUser(JSON.parse(userData));
      }, [navigate]);

      const handleLogout = () => {
        sessionStorage.removeItem("currentUser");
        navigate("/");
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
                <p className="text-slate-500 mt-2">Manage system and user settings</p>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-center space-x-4 pt-6">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <h3 className="text-2xl font-bold">150</h3>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center space-x-4 pt-6">
                  <div className="p-3 bg-green-100 rounded-full">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Teachers</p>
                    <h3 className="text-2xl font-bold">15</h3>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center space-x-4 pt-6">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Book className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Subjects</p>
                    <h3 className="text-2xl font-bold">10</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <Button>Manage Users</Button>
                  <Button>Manage Subjects</Button>
                  <Button>Generate Reports</Button>
                  <Button>Send Notifications</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </AppLayout>
      );
    };

    export default AdminDashboard;
