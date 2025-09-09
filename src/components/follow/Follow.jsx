import { useEffect, useRef, useState } from "react";
import { getBlogsFollowing } from "../../redux/actions/blogAction";
import { useDispatch, useSelector } from "react-redux";
import ListBlog from "../blogs/ListBlog";


const Follow = ({ content }) => {
    const blogsFollowing = useSelector(store => store.blogs?.blogsFollowing)
    const user = useSelector(store => store.users?.user)
    const dispatch = useDispatch()
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

            const data = await dispatch(getBlogsFollowing(content, limit, 0, true))
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
    }, [dispatch, content])

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
                    const more = await dispatch(getBlogsFollowing(content, limit, skip))

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
    }, [dispatch, hasMore, loadingMore, content])

    useEffect(() => {
        canLoadMore.current = false
    }, [content])

    return (
        <div className="">
            <ListBlog
                loading={loading}
                blogs={blogsFollowing}
                loadingMore={loadingMore}
                hasMore={hasMore}
                userId={user._id}
            />
        </div>
    )
}

export default Follow