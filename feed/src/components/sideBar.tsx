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

import { House, Plus } from 'lucide-react';
import { Link } from "react-router-dom";


const items = [
  {
    title: "Feed",
    url: "/home",
    icon: House,
  },
  {
    title: "AddPost",
    url: "/addPost",
    icon: Plus
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl md:text-4xl mb-4 font-bold">
            Kendrix
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3 ">
                      <item.icon className="md:text-2xl font-bold" />
                      <span className="md:text-2xl text-lg font-semibold ">{item.title}</span>
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
