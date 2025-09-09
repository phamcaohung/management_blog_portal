import { Grid } from "@mui/material"
import { CustomAvatar } from "../pages/CustomStyle"
import { useDispatch } from "react-redux"
import { unSaveBlog } from "../../redux/actions/blogAction"
import { showNotification } from "../../redux/actions/notificationAction"
import { useNavigate } from "react-router-dom"


const SavedBlogs = ({ item }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUnSave = async () => {
        await dispatch(unSaveBlog(item.blog._id))
        dispatch(showNotification("unSave Blog Successfully", "success"))
    }

    return (
        <div className="bg-[#252728] rounded-xl p-10 mt-5">
            <Grid container spacing={5}>
                <Grid size={4}>
                    <img
                        src={item.blog?.fileUrl}
                        alt=""
                        className="rounded-3xl"
                    />
                </Grid>
                <Grid size={6}>
                    <h2 className="text-2xl text-gray-200 font-bold truncate">
                        {item.blog.content}
                    </h2>
                    <div className="flex items-center mt-10">
                        <CustomAvatar
                            src={item.blog?.user?.avatar}
                        />
                        <h3 className="text-xl text-gray-400 font-semibold ml-5">
                            Saved From
                            <span className="text-gray-200 ml-3">{item.blog?.user?.name}</span>
                        </h3>
                    </div>
                    <div className="mt-10">
                        <button
                            onClick={() => navigate(`/blog/${item.blog._id}`)}
                            className="text-xl font-semibold bg-indigo-300 mr-5 hover:bg-black hover:text-white cursor-pointer"
                        >
                            View Detail
                        </button>
                        <button
                            onClick={handleUnSave}
                            className="text-xl font-semibold bg-red-300 hover:bg-red-500 cursor-pointer"
                        >
                            Unsave
                        </button>
                    </div>
                </Grid>
                <Grid size={2} className="items-center flex">
                    <div>
                        <h2 className="text-3xl text-white font-bold text-center">
                            Saved At
                        </h2>
                        <h2 className="text-2xl text-gray-200 font-bold text-center mt-5">
                            {item.createdAt}
                        </h2>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default SavedBlogs