import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { VideoDetailsContract } from "../contracts/videoDetails-contract"

interface video {
    videos : VideoDetailsContract[]
    videosCount:number
}

 const initialState:video = {
    videos : [],
    videosCount : 0
}

const videoSlicer = createSlice({
    name:"video",
    initialState,
    reducers : {
        addToWatchLater : (state,action)=>{
            state.videos.push(action.payload)
            state.videosCount = state.videos.length
        },
        removeToWatchLater: (state, action:PayloadAction<string>) => {
            state.videos = state.videos.filter(video => video.id !== action.payload)
            state.videosCount = state.videos.length
}
    }
})

export const {addToWatchLater,removeToWatchLater} = videoSlicer.actions
export default videoSlicer.reducer