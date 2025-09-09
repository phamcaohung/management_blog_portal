import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import LeftSaveBlog from "./LeftSaveBlog"
import SkeletonSaveBlog from "../loading/SkeletonSaveBlog"
import { useState } from "react"
import SavedBlogs from "./SavedBlogs"


const MainSaveBlogs = () => {
    const savedBlog = useSelector(store => store.blogs?.savedBlog)
    const [loading, setLoading] = useState(true)

    return (
        <div>
            <Grid container>
                <Grid size={3} className="bg-[#252728]">
                    <LeftSaveBlog setLoading={setLoading}/>
                </Grid>
                <Grid size={9} className="bg-[#1C1C1D] h-screen px-20 pt-10 overflow-y-auto pb-10">
                    <h2 className="text-3xl text-gray-200 font-bold">All</h2>
                    {savedBlog.length === 0 && 
                        <div className="flex justify-center mt-20">
                            <h2 className="text-2xl text-gray-300">There are no blogs yet.</h2>
                        </div>
                    }
                    {loading ? (
                        savedBlog.map((item) =>
                            <SkeletonSaveBlog key={item._id} />
                        )
                    ) : (
                        savedBlog.map((item, index) =>
                            <SavedBlogs
                                key={index}
                                item={item}
                            />
                        )
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default MainSaveBlogs