import { useDispatch } from "react-redux"
import { singInAdmin } from "../../../redux/actions/adminAction"
import { useNavigate } from "react-router-dom"
import "../user/SigninAndSignup.css"
import { TextField } from "@mui/material"
import { useState } from "react"


const SigninAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = (e) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        dispatch(singInAdmin(data, navigate))
    }

    return (
        <div className="signin-and-signup">
            <div className="w-[700px] bg-white rounded-2xl shadow-2xl">
                <div className="py-30 px-40 h-full text-center">
                    <h1 className="text-5xl font-bold pb-10">
                        Sign In Admin
                    </h1>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                        label="Username"
                        fullWidth
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        label="password"
                        fullWidth
                        type="password"
                        required
                    />
                    <button 
                        onClick={handleSignIn}
                        className="bg-[#111827] uppercase cursor-pointer text-white text-xl font-bold py-10 px-44 mt-10"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SigninAdmin