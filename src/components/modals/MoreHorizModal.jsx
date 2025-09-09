import { Collapse } from "@mui/material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, saveBlog, unSaveBlog } from "../../redux/actions/blogAction";
import EditIcon from '@mui/icons-material/Edit';
import { showNotification } from "../../redux/actions/notificationAction";
import CreateBlogModal from "./CreateBlogModal";
import { useState } from "react";


const MoreHorizModal = ({ open, blog, conditionShow }) => {
    const savedBlogId = useSelector(store => store.users?.user)?.saveBlog
    const dispatch = useDispatch()
    const isSave = savedBlogId.includes(blog?._id)
    const [ openModal, setOpenModal ] = useState(false)
    
    
    const handleSaveBlog = async () => {
        if(isSave) {
            await dispatch(unSaveBlog(blog._id))
            dispatch(showNotification('Unsave Blog Successfully', 'success'))
        }
        else {
            await dispatch(saveBlog(blog._id))
            dispatch(showNotification('Save Blog Successfully', 'success'))
        } 
    }

    const handleDeleteBlog = async () => {
        await dispatch(deleteBlog(blog._id))
        dispatch(showNotification('Delete Blog Successfully', 'success'))
    }

    return (
        <>
            {open &&
                <Collapse in={open}>
                    <div className="bg-[#252728] w-60 h-auto absolute rounded-xl p-3 -translate-x-50 shadow-2xl">
                        {/* Save Blog */}
                        {!conditionShow &&
                            <div
                                onClick={handleSaveBlog}
                                className="flex items-center p-2 mt-3 hover:bg-white/10 cursor-pointer rounded-xl"
                            >
                                <BookmarkIcon
                                    fontSize="medium"
                                    className="text-orange-300"
                                />
                                <h3 className="text-base text-gray-200 ml-5">
                                    {isSave ? 'UnSave Blog' : 'Save Blog'}
                                </h3>
                            </div>
                        }

                        {conditionShow &&
                            <>
                                {/* Edit Blog */}
                                <div
                                    onClick={() => setOpenModal(true)}
                                    className="flex items-center p-2 mt-3 hover:bg-white/10 cursor-pointer rounded-xl"
                                >
                                    <EditIcon
                                        fontSize="medium"
                                        className="text-pink-400"
                                    />
                                    <h3 className="text-base text-gray-200 ml-5">
                                        Edit Blog
                                    </h3>
                                </div>


                                {/* Delete Blog */}
                                <div
                                    onClick={handleDeleteBlog}
                                    className="flex items-center p-2 mt-3 hover:bg-white/10 cursor-pointer rounded-xl"
                                >
                                    <DeleteIcon
                                        fontSize="medium"
                                        className="text-red-400"
                                    />
                                    <h3 className="text-base text-gray-200 ml-5">
                                        Delete Blog
                                    </h3>
                                </div>
                            </>
                        }
                    </div>
                </Collapse>
            }

            {openModal && 
                <CreateBlogModal
                    open={openModal}
                    setOpenModal={setOpenModal}
                    blog={blog}
                />
            }
        </>
    )
}

export default MoreHorizModal