import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logOutAdmin } from '../../../redux/actions/adminAction';


const AdminNavbar = () => {
    const navigate = useNavigate()
    const menu = [
        { icon: AccountCircleIcon, route: "/admin" },
        { icon: AutoStoriesIcon, route: `/admin/blogs` }
    ]
    const location = useLocation()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutAdmin())
    }

    return (
        <div className="bg-[#252728] h-[80px] sticky top-0 z-50">
            <div className='flex justify-center'>
                {menu.map((item, index) => {
                    const active = location.pathname === item.route
                    return (
                        <div
                            onClick={() => navigate(item.route)}
                            key={index}
                            className={`
                                    ${active && 'border-b-6 border-blue-500'} 
                                    pt-6 ml-10 cursor-pointer text-center w-30
                                    transition-all duration-300 hover:bg-white/10
                                `}
                        >
                            <item.icon
                                sx={{
                                    fontSize: 50
                                }}
                                className={`${active ? 'text-blue-500' : 'text-gray-400'}`}
                            />
                        </div>
                    )
                })}
                <div
                    onClick={handleLogOut}
                    className="pt-6 ml-10 cursor-pointer text-center w-30 hover:bg-white/10"
                >
                    <LogoutIcon
                        sx={{ fontSize: 50 }}
                        className="text-gray-400"
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar