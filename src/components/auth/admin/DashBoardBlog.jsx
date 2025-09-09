import { InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBlogsAdmin } from "../../../redux/actions/adminAction"
import LoadingSpinner from "../../loading/LoadingSpinner"
import Blogs from "./Blogs"
import SearchIcon from '@mui/icons-material/Search';
import { useInfiniteScroll } from "../../../utils/hook"


const DashBoardBlog = () => {
    const blogs = useSelector(store => store.admin?.blogs)
    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const limit = 10
    
    useInfiniteScroll({
        length: blogs?.length,
        dispatchAction: getBlogsAdmin(content, user, limit, 0, true),
        dispatchActionMore: getBlogsAdmin(content, user, limit, skip),
        dispatch: dispatch,
        setLoading: setLoading,
        setHasMore: setHasMore,
        setSkip: setSkip,
        setLoadingMore: setLoadingMore,
        content: content,
        user: user,
        hasMore: hasMore,
        skip: skip,
        loadingMore: loadingMore,
        limit: limit,
    })

    return (
        <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-100 min-h-screen pb-5 px-100">
            <div className="py-10 flex justify-around">
                <TextField
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-96'
                    label={"Search Content"}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className='text-black' />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className='w-96'
                    label={"Search User"}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className='text-black' />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                blogs?.map((item, index) => <Blogs key={index} blog={item} />)
            )}

            {blogs?.length === 0 &&
                <div className="flex justify-center mt-70">
                    <h2 className="text-4xl text-black font-bold">
                        Blog Not Found
                    </h2>
                </div>
            }

        </div>
    )
}

export default DashBoardBlog