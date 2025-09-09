import { Button, Collapse, Divider, Typography } from "@mui/material"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useState } from "react";
import Comment from "../pages/Comment";
import CreateComment from "../pages/CreateComment";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreHorizModal from "../modals/MoreHorizModal";
import ReactionBlog from "../pages/ReactionBlog";
import { REACTIONS_IMAGE } from "../../utils/data";
import { CustomAvatar } from "../pages/CustomStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../redux/actions/userAction";
import { showNotification } from "../../redux/actions/notificationAction";
import ReactionDetailModal from "../modals/ReactionDetailModal";


const Blogs = ({ blog, userId }) => {
    const followingId = useSelector(store => store.users?.user)?.following
    const [open, setOpen] = useState(false)
    const [moreHorizIcon, setMoreHorizIcon] = useState(false)
    const conditionShow = userId === blog.user?._id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isFollow = followingId.includes(blog.user?._id)
    const [reactionDetail, setReactionDetail] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const handleFollow = async () => {
        if (isFollow) {
            await dispatch(unFollowUser(blog.user._id))
            dispatch(showNotification("UnFollowing User Successfully", "success"))
        }
        else {
            await dispatch(followUser(blog.user._id))
            dispatch(showNotification("Following User Successfully", "success"))
        }
    }

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

    return (
        <div className="bg-[#242526] rounded-2xl p-5 mb-8">
            <div className="flex justify-between">
                <div className="flex">
                    <CustomAvatar
                        src={blog?.user?.avatar}
                        sx={{ width: 60, height: 60, marginRight: 3 }}
                        onClick={() => navigate(`/profile/${blog.user?._id}`)}
                    />
                    <div>
                        <div className="flex items-center">
                            <h2
                                className="font-bold text-gray-300 text-xl hover:underline cursor-pointer"
                                onClick={() => navigate(`/profile/${blog.user?._id}`)}
                            >
                                {blog.user?.name}
                            </h2>
                            <h3
                                onClick={handleFollow}
                                className="font-bold text-blue-400 ml-5 text-sm cursor-pointer hover:underline"
                            >
                                {
                                    userId === blog.user?._id
                                        ? ''
                                        : isFollow ? 'UnFollow' : 'Follow'
                                }
                            </h3>
                        </div>
                        <h3 className="font-semibold text-gray-300 text-xs mt-2">{blog.createdAt}</h3>
                    </div>
                </div>
                <div>
                    <MoreHorizIcon
                        fontSize="large"
                        className="text-gray-300 cursor-pointer"
                        onClick={() => setMoreHorizIcon(!moreHorizIcon)}
                    />
                    <MoreHorizModal
                        open={moreHorizIcon}
                        blog={blog}
                        conditionShow={conditionShow}
                        setOpen={setOpen}
                    />
                </div>
            </div>
            <div className="mt-5">
                <Typography
                    className="text-base text-white whitespace-pre-wrap"
                    sx={
                        expanded
                            ? {}
                            : {
                                display: "-webkit-box",
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }
                    }
                >
                    {blog.content}
                </Typography>
                <h2 
                    className="text-base text-gray-300 hover:underline cursor-pointer"
                    onClick={() => setExpanded(!expanded)}>
                    {expanded ? "See less" : "See more"}
                </h2>
            </div>
            <div
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="mt-5 cursor-pointer"
            >
                <img
                    src={blog.fileUrl}
                    alt=""
                    className="w-full"
                />
            </div>
            <div className="flex justify-between my-3">
                <div
                    onClick={() => setReactionDetail(!reactionDetail)}
                    className="flex items-center ml-2 cursor-pointer"
                >
                    {topReactions(blog.reactions).map((item, index) => (
                        <img
                            key={index}
                            src={REACTIONS_IMAGE[item.reaction]}
                            alt=""
                            className="w-7 h-7 -ml-3"
                        />
                    ))}
                    {blog.reactions?.length !== 0 &&
                        <h5 className="text-base text-gray-300 cursor-pointer ml-1">
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
            <Divider className="bg-gray-400" />
            <div className="flex justify-around px-10 mt-3">
                <div className="flex items-center">
                    <ReactionBlog
                        blogId={blog._id}
                        myReaction={blog.myReaction}
                    />
                </div>
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <ModeCommentIcon className="text-gray-300 mr-2" fontSize="medium" />
                    <h4 className="text-gray-300 text-base">Comments</h4>
                </div>
            </div>
            <Collapse in={open}>
                <div className="mt-2 space-y-3">
                    <Divider className="bg-gray-400" />
                    {blog.comments?.length === 0 &&
                        <div className="h-20 flex justify-center items-center">
                            <h2 className="text-base text-gray-300">Be the first to comment.</h2>
                        </div>
                    }
                    {blog.comments?.map((item) =>
                        <Comment
                            comment={item}
                            key={item._id}
                            blogId={blog._id}
                        />
                    )}
                    <CreateComment user={blog.user} blogId={blog._id} />
                </div>
            </Collapse>
            <ReactionDetailModal
                reactionDetail={reactionDetail}
                setReactionDetail={setReactionDetail}
                reaction={blog.reactions}
                isFollow={isFollow}
            />
        </div>
    )
}

export default Blogs