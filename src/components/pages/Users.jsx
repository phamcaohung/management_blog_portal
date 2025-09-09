import { Skeleton } from "@mui/material"
import { CustomAvatar } from "./CustomStyle"
import { useDispatch, useSelector } from "react-redux"
import { followUser, unFollowUser } from "../../redux/actions/userAction"
import { showNotification } from "../../redux/actions/notificationAction"
import { useNavigate } from "react-router-dom"


const Users = ({ user, loading }) => {
    const followingId = useSelector(store => store.users?.user)?.following
    const isFollow = followingId.includes(user._id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFollow = async () => {
        if (isFollow) {
            await dispatch(unFollowUser(user._id))
            dispatch(showNotification("UnFollowing User Successfully", "success"))
        }
        else {
            await dispatch(followUser(user._id))
            dispatch(showNotification("Following User Successfully", "success"))
        }
    }

    return (
        <div>
            <div className="flex items-center mt-5">
                {loading ? (
                    <>
                        <Skeleton
                            variant="circular"
                            animation="pulse"
                            sx={{ width: 70, height: 70, marginRight: 3, bgcolor: 'gray' }}
                        />
                        <Skeleton
                            animation="pulse"
                            sx={{ width: 150, height: 20, bgcolor: "gray" }}
                        />
                    </>
                ) : (
                    <>
                        <CustomAvatar
                            src={user.avatar}
                            sx={{ width: 70, height: 70, marginRight: 3 }}
                            onClick={() => navigate(`/profile/${user?._id}`)}
                        />
                        <h3 
                            onClick={() => navigate(`/profile/${user?._id}`)}
                            className='text-gray-200 text-xl font-bold hover:underline cursor-pointer'
                        >
                            {user.name}
                        </h3>
                        <h3
                            onClick={handleFollow}
                            className="font-bold text-blue-400 ml-5 text-lg cursor-pointer hover:underline"
                        >
                            {isFollow ? 'UnFollow' : 'Follow'}
                        </h3>
                    </>
                )}
            </div>
        </div>
    )
}

export default Users