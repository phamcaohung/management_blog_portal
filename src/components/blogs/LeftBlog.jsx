import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../pages/CustomStyle';
import Users from '../pages/Users';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions/userAction';

const LeftBlog = ({ user }) => {
    const navigate = useNavigate()
    const users = useSelector(store => store.users?.users)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true)
            await dispatch(getUsers(name))
            setLoading(false)
        }, 200)

        return () => clearTimeout(timer)
    }, [dispatch, name])

    return (
        <div className="px-5">
            <div
                onClick={() => navigate(`/profile/${user._id}`)}
                className='flex items-center hover:bg-white/10 py-5 px-2 cursor-pointer rounded-xl'
            >
                <div className='w-[60px] mr-5'>
                    <Avatar
                        src={user.avatar}
                        sx={{ width: 60, height: 60 }}
                    />
                </div>
                <h3 className='text-gray-200 text-xl font-bold'>{user.name}</h3>
            </div>

            <div className="flex items-center hover:bg-white/10 py-5 px-2 cursor-pointer rounded-xl">
                <div className='w-[60px] mr-5 text-center'>
                    <BookmarkIcon
                        className="text-green-300"
                        sx={{ fontSize: 40 }}
                    />
                </div>
                <div 
                    onClick={() => navigate("/saved")}
                    className='flex justify-between items-center w-full'
                >
                    <h2 className='text-gray-200 text-xl font-bold'>
                        Saved
                    </h2>
                </div>
            </div>
            <div className='mt-5'>
                <CustomTextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="User"
                    variant="outlined"
                />
                <div className="overflow-y-auto">
                    {users.map((item) => 
                        <Users
                            key={item._id}
                            user={item} 
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftBlog