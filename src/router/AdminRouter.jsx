import { Navigate, Route, Routes } from "react-router-dom"
import SigninAdmin from "../components/auth/admin/SigninAdmin"
import { useSelector } from "react-redux"
import AdminNavbar from "../components/auth/admin/AdminNavBar"
import DashBoardUser from "../components/auth/admin/DashBoardUser"
import NotificationModal from "../components/modals/NotificationModal"
import DashBoardBlog from "../components/auth/admin/DashBoardBlog"


const AdminRouter = () => {
    const admin = useSelector(store => store.admin?.admin)
    console.log("admin: ", admin);

    return (
        <div>
            <NotificationModal />
            {
                !admin ? (
                    <Routes>
                        <Route path="/signin" element={<SigninAdmin />} />
                        <Route path="*" element={<Navigate to="/admin/signin" replace />} />
                    </Routes>
                ) : (
                    <>
                        <AdminNavbar />
                        <Routes>
                            <Route path="/" element={<DashBoardUser />} />
                            <Route path="/blogs" element={<DashBoardBlog />} />
                        </Routes>
                    </>
                )
            }
        </div>
    )
}

export default AdminRouter