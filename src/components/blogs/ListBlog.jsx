import SkeletonBlog from "../loading/SkeletonBlog"
import Blogs from "./Blogs"
import RefreshIcon from '@mui/icons-material/Refresh';

const ListBlog = ({ loading, blogs, loadingMore, userId }) => {
    return (
        <>
            {loading ? (
                blogs?.map((item) =>
                    <SkeletonBlog key={item._id} />
                )
            ) : (
                blogs?.map((item) =>
                    <Blogs
                        loading={loading}
                        userId={userId}
                        key={item._id}
                        blog={item}
                    />
                )
            )}
            {loadingMore &&
                <div className="flex justify-center">
                    <RefreshIcon
                        fontSize="large"
                        className='animate-spin text-white'
                    />
                </div>
            }
        </>
    )
}

export default ListBlog