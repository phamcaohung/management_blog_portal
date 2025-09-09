import { Grid, Skeleton } from "@mui/material"


const SkeletonSaveBlog = () => {
    return (
        <div className="bg-[#252728] rounded-xl p-10 mt-5">
            <Grid container spacing={5}>
                <Grid size={4}>
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ width: 350, height: 250, bgcolor: 'gray', borderRadius: 2 }}
                    />
                </Grid>
                <Grid size={6}>
                    <Skeleton
                        variant="text"
                        animation="pulse"
                        sx={{ width: 400, height: 40, bgcolor: "gray" }}
                    />
                    <div className="flex items-center mt-10">
                        <Skeleton
                            variant="circular"
                            animation="pulse"
                            sx={{ width: 70, height: 70, marginRight: 3, bgcolor: 'gray' }}
                        />
                        <Skeleton
                            variant="text"
                            animation="pulse"
                            sx={{ width: 200, height: 20, bgcolor: "gray" }}
                        />
                    </div>
                    <div className="mt-10 flex">
                        <Skeleton
                            variant="rectangular"
                            animation="pulse"
                            sx={{ width: 150, height: 50, bgcolor: 'gray', borderRadius: 2, marginRight: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            animation="pulse"
                            sx={{ width: 150, height: 50, bgcolor: 'gray', borderRadius: 2 }}
                        />
                    </div>
                </Grid>
                <Grid size={2} className="my-auto">
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ width: 150, height: 50, bgcolor: 'gray', borderRadius: 2, marginBottom: 2 }}
                    />
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ width: 150, height: 50, bgcolor: 'gray', borderRadius: 2 }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default SkeletonSaveBlog