import { useState } from "react";
import { getBlogsFollowing } from "../../redux/actions/blogAction";
import { useDispatch, useSelector } from "react-redux";
import ListBlog from "../blogs/ListBlog";
import { useInfiniteScroll } from "../../utils/hook";



const Follow = ({ content }) => {
    const blogsFollowing = useSelector(store => store.blogs?.blogsFollowing)
    const user = useSelector(store => store.users?.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const limit = 10
    
    useInfiniteScroll({
        length: blogsFollowing?.length,
        dispatchAction: getBlogsFollowing(content, limit, 0, true),
        dispatchActionMore: getBlogsFollowing(content, limit, skip),
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