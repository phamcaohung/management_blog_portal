import { REACTIONS_IMAGE } from "../../../utils/data";
import { CustomAvatar } from "../../pages/CustomStyle"
import Comment from "../../pages/Comment";
import { Collapse, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deleteBlogAdmin } from "../../../redux/actions/adminAction";
import { showNotification } from "../../../redux/actions/notificationAction";


const Blogs = ({ blog }) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const disptach = useDispatch()

    const topReactions = (reactions) => {
        const reactionCounts = {}
        reactions.forEach(item => {
            const type = item.reaction
            if (reactionCounts[type])
                reactionCounts[type].count++
            else
                reactionCounts[type] = {
                    reaction: type,
                    count: 1
                }
        })
        return Object.values(reactionCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
    }

    const handleDelete = async (id) => {
        await disptach(deleteBlogAdmin(id))
        disptach(showNotification("Delete Blog Successfully", "success"))
    }

    return (
        <div className="bg-[#242526] rounded-2xl p-5 mb-8">
            <div className="flex justify-between">
                <div className="flex">
                    <CustomAvatar
                        src={blog?.user?.avatar}
                        sx={{ width: 50, height: 50, marginRight: 3 }}
                    />
                    <div>
                        <div className="flex items-center">
                            <h2 className="font-bold text-gray-300 text-xl">
                                {blog.user?.name}
                            </h2>
                        </div>
                        <h3 className="font-semibold text-gray-300 text-xs mt-2">{blog.createdAt}</h3>
                    </div>
                </div>
                <div>
                    <DeleteIcon
                        fontSize='large'
                        color='error'
                        onClick={() => handleDelete(blog._id)}
                        className='cursor-pointer'
                    />
                </div>
            </div>
            <div className="mt-5">
                <h2 className="text-base text-white whitespace-pre-wrap">
                    {blog.content}
                </h2>
            </div>
            <div
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="mt-5"
            >
                <img
                    src={blog.fileUrl}
                    alt=""
                    className="w-full"
                />
            </div>
            <div className="flex justify-between my-3">
                <div className="flex items-center ml-2 cursor-pointer">
                    {topReactions(blog.reactions).map((item, index) => (
                        <img
                            key={index}
                            src={REACTIONS_IMAGE[item.reaction]}
                            alt=""
                            className="w-10 h-10 -ml-3"
                        />
                    ))}
                    {blog.reactions?.length !== 0 &&
                        <h5 className="text-lg text-gray-300 cursor-pointer ml-1">
                            {blog.reactions?.length}
                        </h5>
                    }
                </div>
                <div className="flex items-center">
                    <h5
                        className="text-sm text-gray-300 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        {blog.comments?.length} comments
                    </h5>
                </div>
            </div >
            <Collapse in={open}>
                <div className="mt-2 space-y-3">
                    <Divider className="bg-gray-400" />
                    {blog.comments?.length === 0 &&
                        <div className="h-20 flex justify-center items-center">
                            <h2 className="text-lg text-gray-300">Be the first to comment.</h2>
                        </div>
                    }
                    {blog.comments?.map((item) =>
                        <Comment
                            comment={item}
                            key={item._id}
                            blogId={blog._id}
                        />
                    )}
                </div>
            </Collapse>
        </div>
    )
}

export default Blogs