import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const LogOut = () => { 
    const navigate = useNavigate()
    const handleLogOut = () => {
        navigate("/")
    }
    
    return(
        <>
            <AlertDialog>
  <AlertDialogTrigger><Button className="cursor-pointer">Logo Out <LogOutIcon /></Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-xl md:text-2xl">Are you sure you want to logout?</AlertDialogTitle>
      <AlertDialogDescription className="text-lg md:text-xl">
        This action will you log you out from the page
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="cursor-pointer text-lg md:text-xl">Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-black text-white cursor-pointer text-lg md:text-xl" onClick={handleLogOut}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </>
    )
}