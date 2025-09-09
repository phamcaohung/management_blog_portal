import { Badge, Divider, Modal } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { CustomAvatar } from "../pages/CustomStyle";
import { REACTIONS_IMAGE } from "../../utils/data";
import { useMemo, useState } from "react";


const ReactionDetailModal = ({ reactionDetail, setReactionDetail, reaction, isFollow }) => {
    const [selectedReaction, setSelectedReaction] = useState('all')
    const reactionCounts = useMemo(() => {
        const counts = {}
        let totalCount = 0
        
        reaction.forEach(item => {
            const reactionType = item.reaction
            counts[reactionType] = (counts[reactionType] || 0) + 1
            totalCount++
        })
        
        return { ...counts, all: totalCount }
    }, [reaction])

    const filteredReactions = useMemo(() => {
        if (selectedReaction === 'all') {
            return reaction
        }
        return reaction.filter(item => item.reaction === selectedReaction)
    }, [reaction, selectedReaction])

    const uniqueReactionTypes = useMemo(() => {
        const types = new Set()
        reaction.forEach(item => {
            types.add(item.reaction)
        })
        return Array.from(types)
    }, [reaction])
    
    return (
        <Modal open={reactionDetail} onClose={() => setReactionDetail(false)}>
            <div className="bg-[#252728] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-auto">
                <div className="flex justify-between items-center px-5 py-5">
                    <div className="flex items-center">
                        <div 
                            className={`hover:bg-white/10 cursor-pointer ${
                                selectedReaction === 'all' ? 'border-b-6 border-b-blue-600' : ''
                            }`}
                            onClick={() => setSelectedReaction('all')}
                        >
                            <div className="flex items-center py-3 px-4">
                                <h2 className="text-white text-base font-bold mr-2">
                                    All
                                </h2>
                                <span className="text-white text-base font-bold">
                                    {reactionCounts.all}
                                </span>
                            </div>
                        </div>
                        {uniqueReactionTypes.map((reactionType) => (
                            <div 
                                className={`hover:bg-white/10 cursor-pointer ${
                                    selectedReaction === reactionType ? 'border-b-6 border-b-blue-600' : ''
                                }`}
                                key={reactionType}
                                onClick={() => setSelectedReaction(reactionType)}
                            >
                                <div className="flex items-center py-2 px-3">
                                    <img
                                        src={REACTIONS_IMAGE[reactionType]}
                                        alt={reactionType}
                                        className="w-8 h-8 mr-1"
                                    />
                                    <span className="text-white text-xl font-bold">
                                        {reactionCounts[reactionType]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="cursor-pointer bg-gray-600 rounded-3xl p-2"
                        onClick={() => setReactionDetail(false)}
                    >
                        <ClearIcon
                            fontSize="medium"
                            className="text-gray-300"
                        />
                    </div>
                </div>
                <Divider className="bg-gray-400" />

                <div className="mt-5 pb-5 overflow-y-auto">
                    {
                        filteredReactions.map((item) => (
                            <div 
                                key={item._id} 
                                className="flex justify-between items-center py-3 px-5 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <div className="flex items-center">
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <div className="-ml-6">
                                                <img
                                                    src={REACTIONS_IMAGE[item.reaction]}
                                                    alt={item.reaction}
                                                    className="w-8 h-8"
                                                />
                                            </div>
                                        }
                                    >
                                        <CustomAvatar
                                            src={item.user?.avatar}
                                            sx={{ width: 60, height: 60, marginRight: 2 }}
                                        />
                                    </Badge>

                                    <h2 className="font-bold text-white text-lg ml-3">
                                        {item.user?.name}
                                    </h2>
                                </div>
                                
                                <div className="bg-white/10 flex items-center py-2 px-4 rounded-lg hover:bg-white/20 cursor-pointer transition-colors">
                                    <PersonAddIcon fontSize="medium" className="text-white" />
                                    <h3 className="text-blue-400 font-medium text-lg ml-2">
                                        {isFollow ? 'Unfollow' : 'Follow'}
                                    </h3>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Modal>
    )
}

export default ReactionDetailModal