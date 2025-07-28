import { Login } from "./components/login";
import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { PostDetail } from "./pages/postDetails";
import { AddPost } from "./pages/addPost";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/sideBar";
import { LogOut } from "./components/logOut";

function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <SidebarTrigger />
            <LogOut />
          </div>
          <div className="flex-1 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}




function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="home/posts/:id" element={<PostDetail />} />
        <Route path="addPost" element={<AddPost />} />
      </Route>
    </Routes>
  );
}
export default App;
