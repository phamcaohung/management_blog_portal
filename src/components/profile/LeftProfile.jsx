import { CustomAvatar } from "../pages/CustomStyle"


const LeftProfile = ({ photos }) => {
    

    return (
        <div className="bg-[#252728] rounded-xl px-5 py-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-200 font-bold cursor-pointer hover:underline">
                    Photos
                </h2>
                <h3 className="text-lg text-blue-400 px-3 py-2 hover:bg-white/10 rounded-lg cursor-pointer">
                    See All Photos
                </h3>
            </div>
            <div className="flex flex-wrap mt-5 gap-4">
                {photos?.map((item, index) => (
                    <CustomAvatar
                        key={index}
                        src={item}
                        variant="square"
                        sx={{
                            width: 125,
                            height: 125,
                            borderRadius: 2,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default LeftProfile