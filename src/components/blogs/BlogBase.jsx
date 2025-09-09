import { useDispatch, useSelector } from "react-redux"
import FirstBlog from "./FirstBlog"
import { useEffect, useState } from "react"
import { getBlogs } from "../../redux/actions/blogAction"
import ListBlog from "./ListBlog"
import { useInfiniteScroll } from "../../utils/hook"


const BlogBase = ({ content }) => {
    const blogs = useSelector(store => store.blogs?.blogs)
    const user = useSelector(store => store.users?.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const limit = 10

    useInfiniteScroll({
        length: blogs?.length,
        dispatchAction: getBlogs(content, limit, 0, true),
        dispatchActionMore: getBlogs(content, limit, skip),
        dispatch: dispatch,
        setLoading: setLoading,
        setHasMore: setHasMore,
        setSkip: setSkip,
        setLoadingMore: setLoadingMore,
        content: content,
        hasMore: hasMore,
        skip: skip,
        loadingMore: loadingMore,
        limit: limit,
    })

    return (
        <>
            <FirstBlog />
            <ListBlog
                loading={loading}
                blogs={blogs}
                loadingMore={loadingMore}
                hasMore={hasMore}
                userId={user._id}
            />
            {blogs?.length === 0 &&
                <div className="flex justify-center mt-70">
                    <h2 className="text-4xl text-gray-200 font-bold">
                        Blog Not Found
                    </h2>
                </div>
            }
        </>
    )
}

export default BlogBase