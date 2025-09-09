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
        <div className="bg-[#252728] h-[69px] sticky top-0 z-50">
            <div className='flex justify-center'>
                {menu.map((item, index) => {
                    const active = location.pathname === item.route
                    return (
                        <div
                            onClick={() => navigate(item.route)}
                            key={index}
                            className={`
                                    ${active && 'border-b-6 border-blue-500'} 
                                    pt-7 mx-3 cursor-pointer text-center w-25
                                    transition-all duration-300 hover:bg-white/10
                                `}
                        >
                            <item.icon
                                fontSize='large'
                                className={`${active ? 'text-blue-500' : 'text-gray-400'}`}
                            />
                        </div>
                    )
                })}
                <div
                    onClick={handleLogOut}
                    className="pt-7 mx-3 cursor-pointer text-center w-25 hover:bg-white/10"
                >
                    <LogoutIcon
                        fontSize='large'
                        className="text-gray-400"
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar