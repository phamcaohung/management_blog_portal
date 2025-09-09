import { Skeleton } from "@mui/material"


const SkeletonBlog = () => {
    return (
        <div className="bg-[#242526] rounded-2xl p-5">
            <div className="flex justify-between">
                <div className="flex">
                    <Skeleton
                        variant="circular"
                        animation="pulse"
                        sx={{ width: 50, height: 50, marginRight: 3, bgcolor: 'gray' }}
                    />
                    <div>
                        <div className="flex items-center">
                            <Skeleton
                                animation="pulse"
                                sx={{ width: 80, height: 10, bgcolor: "gray" }}
                            />
                        </div>
                        <Skeleton
                            animation="pulse"
                            sx={{ width: 40, height: 20, bgcolor: "gray" }}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Skeleton
                    animation="pulse"
                    sx={{ width: 300, height: 10, bgcolor: "gray" }}
                />
            </div>
            <div className="mt-5">
                <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    sx={{ height: 300, bgcolor: "gray" }}
                />
            </div>
            <div className="flex justify-between">
                <Skeleton
                    animation="pulse"
                    sx={{ width: 200, height: 30, bgcolor: "gray" }}
                />
                <Skeleton
                    animation="pulse"
                    sx={{ width: 200, height: 30, bgcolor: "gray", mx: 5 }}
                />
                <Skeleton
                    animation="pulse"
                    sx={{ width: 200, height: 30, bgcolor: "gray" }}
                />
            </div>
        </div>
    )
}

export default SkeletonBlog