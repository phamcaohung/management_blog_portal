import { InputAdornment, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBlogsAdmin } from "../../../redux/actions/adminAction"
import LoadingSpinner from "../../loading/LoadingSpinner"
import Blogs from "./Blogs"
import SearchIcon from '@mui/icons-material/Search';


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
    const skipRef = useRef(0)
    const canLoadMore = useRef(true)

    useEffect(() => {
        skipRef.current = skip
    }, [skip])

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true)
            canLoadMore.current = false

            const data = await dispatch(getBlogsAdmin(content, user, limit, 0, true))
            if (!data || data.length < limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            setSkip(limit)
            setLoading(false)
            canLoadMore.current = true
        }, 400)

        return () => clearTimeout(timer)
    }, [dispatch, content, user])

    useEffect(() => {
        if (!hasMore) return

        const handleScroll = async () => {
            if (!canLoadMore.current || loadingMore || skipRef.current === 0) {
                return
            }

            if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.scrollHeight) {
                canLoadMore.current = false
                setLoadingMore(true)

                try {
                    const more = await dispatch(getBlogsAdmin(content, user, limit, skipRef.current))

                    if (!more || more.length < limit) {
                        setHasMore(false)
                    }

                    setSkip(prev => prev + limit)
                } catch (error) {
                    console.error("Error loading more:", error)
                } finally {
                    setLoadingMore(false)
                    setTimeout(() => {
                        canLoadMore.current = true
                    }, 500)
                }
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [dispatch, hasMore, loadingMore, content, user])

    useEffect(() => {
        canLoadMore.current = false
    }, [content, user])

    return (
        <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-100 min-h-screen pb-5 px-100">
            <div className="py-10 flex justify-around">
                <TextField
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-80'
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
                    className='w-80'
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