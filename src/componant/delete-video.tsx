import { useEffect, useState } from "react"
import type { VideoDetailsContract } from "../contracts/videoDetails-contract"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


export function DeleteVideo(){

    const params = useParams()
    const navigate = useNavigate()

    const [video,setVideo] = useState<VideoDetailsContract>()

    function LoadVideo(){
        axios.get(`http://localhost:3000/videos/${params.id}`)
        .then(res=>{
            setVideo(res.data)
        })
    }

    useEffect(()=>{
        LoadVideo()
    },[])

    function handleOkClick(){
        axios.delete(`http://localhost:3000/videos/${params.id}`)
        .then(()=>{
            alert("Video deleted")
            navigate("/admin-dashboard")
        })
    }

    function handleNoClick(){
        navigate("/admin-dashboard")
    }
    
    return(
        <div className="container-fluid">
            <div className="alert alert-danger alert-dismissible p-2 m-2 w-50">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{video?.title}</span>
                    <span><iframe src={video?.url} height="200" width="350"></iframe></span>
                    <span>
                        <button onClick={handleOkClick} className="btn btn-danger">OK</button>
                        <button onClick={handleNoClick} className="btn btn-warning mx-2">NO</button>
                    </span>
                </div>
            </div>
        </div>
    )
}