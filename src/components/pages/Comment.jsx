import { Avatar } from "@mui/material"
import ReactionComment from "./ReactionComment"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment } from "../../redux/actions/commentAction"
import { showNotification } from "../../redux/actions/notificationAction"


const Comment = ({ comment, blogId }) => {
    const userId = useSelector(store => store.users?.user)?._id
    const myComment = userId === comment.user._id
    const dispatch = useDispatch()

    const handleDeleteComment = async () => {
        await dispatch(deleteComment(blogId, comment._id))
        dispatch(showNotification('Delete Comment Successfully', 'success'))
    }

    return (
        <div className="mt-5">
            <div className="flex">
                <Avatar
                    src={comment.user?.avatar}
                    sx={{ width: 50, height: 50, marginRight: 3 }}
                />
                <div className="">
                    <div className="bg-[#333334] rounded-2xl px-5 py-2 w-auto">
                        <div className="flex items-center">
                            <h2 className="font-bold mr-5 text-gray-300 text-lg">{comment.user?.name}</h2>
                        </div>
                        <h3 className="text-gray-300 text-base">
                            {comment.content}
                        </h3>
                    </div>
                    <div className="flex">
                        <h6 className="text-gray-300 text-xs ml-4 mt-2">
                            {comment.createdAt}
                        </h6>
                        <ReactionComment myReaction={comment.myReaction} />
                        {myComment &&
                            <h6
                                onClick={handleDeleteComment}
                                className="text-red-300 text-xs ml-4 mt-2 cursor-pointer"
                            >
                                Delete
                            </h6>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Comment