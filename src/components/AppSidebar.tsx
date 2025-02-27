import { CalendarDays, ListChecks, User, GraduationCap, Users, UserCog } from "lucide-react";
    import {
      Sidebar,
      SidebarContent,
      SidebarGroup,
      SidebarGroupContent,
      SidebarGroupLabel,
      SidebarMenu,
      SidebarMenuButton,
      SidebarMenuItem,
    } from "@/components/ui/sidebar";
    import { Link } from "react-router-dom";

    const menuItems = [
      {
        title: "Dashboard",
        icon: CalendarDays,
        path: "/",
      },
      {
        title: "Attendance",
        icon: ListChecks,
        path: "/attendance",
      },
      {
        title: "Students",
        icon: User,
        path: "/students",
      },
      {
        title: "Student Dashboard",
        icon: GraduationCap,
        path: "/student-dashboard",
      },
      {
        title: "Mentor Dashboard",
        icon: Users,
        path: "/mentor-dashboard",
      },
      {
        title: "Admin Dashboard",
        icon: UserCog,
        path: "/admin-dashboard",
      },
    ];

    export function AppSidebar() {
      return (
        <Sidebar>
          <SidebarContent>
            <div className="px-4 py-6">
              <h1 className="text-xl font-semibold text-slate-900">ClassKeeper</h1>
              <p className="text-sm text-slate-500">Attendance Management</p>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      );
    }
