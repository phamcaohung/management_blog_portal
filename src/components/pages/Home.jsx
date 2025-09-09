import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import LeftBlog from "../blogs/LeftBlog";
import RightBlog from "../blogs/RightBlog";
import { Route, Routes } from "react-router-dom";
import BlogBase from "../blogs/BlogBase";
import Follow from "../follow/Follow"



const Home = ({ content }) => {
    const user = useSelector(store => store.users?.user)

    return (
        <div className="bg-[#1C1C1D] min-h-screen pb-10">
            <Grid container paddingTop={5}>
                <Grid size={3}>
                    <LeftBlog
                        user={user}
                    />
                </Grid>

                <Grid
                    size={6}
                    paddingX={10}
                >
                    <Routes>
                        <Route path="/" element={<BlogBase content={content} />} />
                        <Route path="/follow" element={<Follow content={content} />} />
                    </Routes>
                </Grid>

                <Grid size={3}>
                    <RightBlog />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home