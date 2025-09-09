import { useEffect } from "react"

export const useInfiniteScroll = ({
    length,
    dispatchAction,
    dispatchActionMore,
    dispatch,
    content,
    user,
    setLoading,
    loadingMore,
    setLoadingMore,
    hasMore,
    setHasMore,
    skip,
    setSkip,
    limit
}) => {
    console.log("length: ", length);
    
    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true)
            await dispatch(dispatchAction)
            if (length < limit) {
                console.log("length: ", length);
                setHasMore(false)                
            }
            else {              
                setHasMore(true)
            }
            setSkip(limit)
            setLoading(false)
        }, 400)

        return () => clearTimeout(timer)
    }, [dispatch, content, user])

    useEffect(() => {
        if (hasMore) {
            const handleScroll = async () => {
                if (!hasMore || loadingMore) return

                if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.scrollHeight) {
                    setLoadingMore(true)
                    const more = await dispatch(dispatchActionMore)
                    if (!more || more.length < limit)
                        setHasMore(false)
                    setSkip(prev => prev + limit)
                    setLoadingMore(false)
                }
            }

            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }
    }, [content, skip, dispatch, hasMore, loadingMore, user])
}
