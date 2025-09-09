import { Grid, Modal } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import Blogs from "../blogs/Blogs";
import { useEffect, useState } from "react";
import { getBlogById } from "../../redux/actions/blogAction";
import { useParams } from "react-router-dom";


const BlogDetail = () => {
    const user = useSelector(store => store.users?.user)
    const blog = useSelector(store => store.blogs?.blog)
    const { blogId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogById(blogId))
    }, [dispatch])
    return (
        <div className="bg-[#1C1C1D] min-h-screen pt-10">
            <Grid 
                container 
                display={"flex"} 
                justifyContent={"center"}
                paddingX={10}
            >
                <Grid size={6}>
                    {blog &&
                        <Blogs
                            blog={blog}
                            userId={user._id}
                        />
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default BlogDetail