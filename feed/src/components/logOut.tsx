import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"

export const LogOut = () => { 
    const navigate = useNavigate()
    const handleLogOut = () => {
        navigate('/')
    }
    return(
        <>
            <Button className="bg-black text-white font-bold md:text-xl" onClick={handleLogOut}>LogOut <LogOutIcon /></Button>
        </>
    )
}