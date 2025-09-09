import TuneIcon from '@mui/icons-material/Tune';
import { CustomTextField } from '../pages/CustomStyle';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSaveBlogs } from '../../redux/actions/blogAction';

const LeftSaveBlog = ({ setLoading }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true)
            await dispatch(getSaveBlogs(content, user))
            setLoading(false)
        }, 400)
        return () => clearTimeout(timer)
    }, [content, user, dispatch])

    return (
        <div className='px-5'>
            <div className="flex justify-between items-center py-5">
                <h1 className="text-4xl font-bold text-white">
                    Saved
                </h1>
                <span className="bg-[#484848] py-2 px-4 rounded-xl hover:bg-white/10">
                    <TuneIcon fontSize="large" className="text-white " />
                </span>
            </div>

            <div className='mt-5'>
                <CustomTextField
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-full'
                    label={"Search Content"}
                />
            </div>

            <div className='mt-5'>
                <CustomTextField
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className='w-full'
                    label={"Search Saved From User"}
                />
            </div>
        </div>
    )
}

export default LeftSaveBlog