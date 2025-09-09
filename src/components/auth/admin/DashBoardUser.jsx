import { Divider, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUserAdmin, getUsersAdmin } from "../../../redux/actions/adminAction"
import { CustomAvatar } from "../../pages/CustomStyle"
import DeleteIcon from '@mui/icons-material/Delete';
import FilterCategory from "./FilterCategory"
import LoadingSpinner from "../../loading/LoadingSpinner"
import { showNotification } from "../../../redux/actions/notificationAction"
import { useInfiniteScroll } from "../../../utils/hook"


const DashBoardUser = () => {
    const users = useSelector(store => store.admin?.users)
    const dispatch = useDispatch()
    const styleTitle = "text-3xl font-bold"
    const styleText = "text-2xl font-semibold"
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const limit = 10

    const handleDeleteUser = async (id) => {
        await dispatch(deleteUserAdmin(id))
        dispatch(showNotification("Delete User Successfully", "success"))
    }

    useInfiniteScroll({
        length: users?.length,
        dispatchAction: getUsersAdmin(name, email, limit, 0, true),
        dispatchActionMore: getUsersAdmin(name, email, limit, skip),
        dispatch: dispatch,
        setLoading: setLoading,
        setHasMore: setHasMore,
        setSkip: setSkip,
        setLoadingMore: setLoadingMore,
        content: name,
        user: email,
        hasMore: hasMore,
        skip: skip,
        loadingMore: loadingMore,
        limit: limit,
    })

    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //         setLoading(true)
    //         await dispatch(getUsersAdmin(name, email, limit, 0, true))
    //         if (users?.length < limit) {
    //             console.log("hasMore: ", hasMore);
                
    //             setHasMore(false)                
    //         }
    //         else {              
    //             setHasMore(true)
    //         }
    //         setSkip(limit)
    //         setLoading(false)
    //     }, 400)

    //     return () => clearTimeout(timer)
    // }, [dispatch, name, email])

    // useEffect(() => {
    //     if (hasMore) {
    //         console.log("start");
            
    //         const handleScroll = async () => {
    //             if (!hasMore || loadingMore) return

    //             if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.scrollHeight) {
    //                 setLoadingMore(true)
    //                 const more = await dispatch(getUsersAdmin(name, email, limit, skip))
    //                 if (!more || more.length < limit)
    //                     setHasMore(false)
    //                 setSkip(prev => prev + limit)
    //                 setLoadingMore(false)
    //             }
    //         }

    //         window.addEventListener("scroll", handleScroll)
    //         return () => window.removeEventListener("scroll", handleScroll)
    //     }
    //}, [name, skip, dispatch, hasMore, loadingMore, email])

    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //         setLoading(true)
    //         await dispatch(getUsersAdmin(name, email))
    //         setLoading(false)
    //     }, 400)

    //     return () => clearTimeout(timer)
    // }, [dispatch, name, email])

    return (
        <div className="bg-gradient-to-br from-blue-100 via-green-100 to-blue-100 min-h-screen pb-5">
            <FilterCategory
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
            />

            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <Grid
                        container
                        paddingY={5}
                        textAlign={"center"}
                    >
                        <Grid size={1}>
                            <h2 className={styleTitle}>Avatar</h2>
                        </Grid>
                        <Grid size={2}>
                            <h2 className={styleTitle}>Username</h2>
                        </Grid>
                        <Grid size={2}>
                            <h2 className={styleTitle}>Email</h2>
                        </Grid>
                        <Grid size={2}>
                            <h2 className={styleTitle}>Blogs</h2>
                        </Grid>
                        <Grid size={2}>
                            <h2 className={styleTitle}>Blogs Saved</h2>
                        </Grid>
                        <Grid size={2}>
                            <h2 className={styleTitle}>Created At</h2>
                        </Grid>
                        <Grid size={1}>
                            <h2 className={styleTitle}>Delete</h2>
                        </Grid>
                    </Grid>

                    <div className="px-5 mb-5">
                        <Divider className="bg-black" />
                    </div>

                    {users?.map((item) => (
                        <div key={item._id}>
                            <Grid
                                container
                                textAlign={"center"}
                                alignItems={"center"}
                            >
                                <Grid size={1} className="flex justify-center">
                                    <CustomAvatar
                                        //onClick={() => }
                                        src={item.avatar}
                                        alt=""
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </Grid>
                                <Grid size={2}>
                                    <h3 className={styleText}>
                                        {item.name}
                                    </h3>
                                    <div className="flex justify-between px-8 pt-5">
                                        <h4 className="text-xl font-semibold">
                                            Followers: {item.followers}
                                        </h4>
                                        <h4 className="text-xl font-semibold">
                                            Following: {item.following}
                                        </h4>
                                    </div>
                                </Grid>
                                <Grid size={2}>
                                    <h3 className={styleText}>{item.email}</h3>
                                </Grid>
                                <Grid size={2}>
                                    <h3 className={styleText}>{item.blogs}</h3>
                                </Grid>
                                <Grid size={2}>
                                    <h3 className={styleText}>{item.saveBlog}</h3>
                                </Grid>
                                <Grid size={2}>
                                    <h3 className={styleText}>
                                        {item.createdAt}
                                    </h3>
                                </Grid>
                                <Grid size={1}>
                                    <DeleteIcon
                                        fontSize='large'
                                        color='error'
                                        onClick={() => handleDeleteUser(item._id)}
                                        className='cursor-pointer'
                                    />
                                </Grid>
                            </Grid>
                            <div className="px-5 my-5">
                                <Divider className="bg-black" />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default DashBoardUser