import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SigninAndSignup from "../components/auth/user/SigninAndSignup";
import VerifyEmail from "../components/pages/VerifyEmail";
import Home from "../components/pages/Home";
import { useSelector } from "react-redux";
import Navbar from "../components/pages/Navbar";
import Profile from "../components/profile/Profile";
import NotificationModal from "../components/modals/NotificationModal";
import { useEffect, useState } from "react";
import MainSaveBlogs from "../components/saveBlog/MainSaveBlogs";
import { location } from "../utils/data";
import BlogDetail from "../components/blogs/BlogDetail";


const GeneralRouter = () => {
    const user = useSelector(store => store.users?.user)
    const { pathname } = useLocation()
    const [content, setContent] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div>
            <NotificationModal />
            {!user ? (
                <Routes>
                    <Route path="/signin" element={<SigninAndSignup name={"container"} />} />
                    <Route path="/auth/verify" element={<VerifyEmail />} />
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
            ) : (
                <>
                    <Navbar content={content} setContent={setContent} />
                    {location.includes(pathname) ? (
                        <Home content={content} />
                    ) : (
                        <Routes>
                            <Route path="/profile/:userId" element={<Profile />} />
                            <Route path="/saved" element={<MainSaveBlogs />} />
                            <Route path="/blog/:blogId" element={<BlogDetail />} />
                        </Routes>
                    )}
                </>
            )}
        </div>
    )
}

export default GeneralRouter