import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { VideoDetailsContract } from "../contracts/videoDetails-contract"
import { addToWatchLater,removeToWatchLater } from "../slicers/slicer"




export function UserDashboard(){

     const [details,setDetails] = useState<VideoDetailsContract[]>([])
     const [search,setSearch] = useState<string>("")
     const[categoryFilter,SetCategoryFilter] = useState<string>("")
     const[sortItem,setSortItem] = useState<string>("")

     const dispatch = useDispatch()
     const AllVideos = useSelector((state:any)=>state.videos)
     const VideoCount = useSelector((state:any)=>state.videosCount)

     function handleClick(video:VideoDetailsContract){
        dispatch(addToWatchLater(video))
     }

     function handleRemoveClick(id:string | undefined){
        if(id){
            dispatch(removeToWatchLater(id))
        }
     }

     function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>){
        setSearch(e.target.value)
    }

     function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>){
        setSortItem(e.target.value)
     }

     function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>){
        SetCategoryFilter(e.target.value)
     }

     function SortAndFilter(){
        var data = [...details]

        if(search){
            data = data.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()))
        }

        if(categoryFilter){
            data = data.filter(item=>item.category_id===parseInt(categoryFilter))
        }

        if(sortItem==="likes"){
            data.sort((a,b)=>b.likes - a.likes)
        }

        if(sortItem==="views"){
            data.sort((a,b)=>b.views - a.views)
        }

        return data;
     }

     const filterVideos = SortAndFilter()

     function LoadVideo(){
        axios.get("http://localhost:3000/videos")
        .then(res=>{
            setDetails(res.data)
        })
     }

     useEffect(()=>{
        LoadVideo()
     },[])

    return(
        <div className="container-fluid">
            <div className="p-3 d-flex justify-content-between align-items-center position-sticky top-0">
                <div><h3 className="text-white">User Dashboard</h3></div>
                <div className="d-flex justify-content-between align-items-center">
                    <div><input onChange={handleSearchChange} type="text" className="form-control" /></div>
                    <div className="mx-2">
                        <select onChange={handleCategoryChange} className="form-select">
                            <option value="">Select Category</option>
                            <option value="1">React</option>
                            <option value="2">Java</option>
                            <option value="3">Python</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={handleSortChange} className="form-select">
                            <option value="">Sory by</option>
                            <option value="likes">Likes</option>
                            <option value="views">Views</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button data-bs-toggle="offcanvas" data-bs-target="#slide" className="bi bi-cart4 btn btn-primary position-relative"><span className="badge position-absolute bg-danger">{VideoCount}</span></button>
                </div>
                <div className="offcanvas offcanvas-end" id="slide">
                    <div className="offcanvas-header d-flex justify-content-between align-items-center">
                        <span className="fs-4 fw-bold">Saved Videos</span>
                        <span><button className="btn btn-close" data-bs-dismiss="offcanvas"></button></span>
                    </div>
                    <div className="offcanvas-body">
                        {
                            AllVideos.length<=0 ? (
                                <span className="text-center fs-5">No Videos</span>
                            ) : (
                                <div>
                                    {
                                        AllVideos.map((video:VideoDetailsContract)=>
                                         <div className="d-flex justify-content-between align-items-center border border-1 p-1" key={video.id}>
                                            <span className="fw-bold">{video.title}</span>
                                            <span><iframe src={video.url} height="80" width="110"></iframe></span>
                                            <span><button onClick={()=>{handleRemoveClick(video.id)}} className="bi bi-trash btn btn-danger"></button></span>
                                         </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly">
                {
                    filterVideos.length<=0 ? (
                        <div>
                            <h3 className="text-warning">No videos Found</h3>
                        </div>
                    ) : (
                        filterVideos.map(video=>
                            <Card key={video.id} className="p-2 m-3" style={{width:"350px"}}>
                            <CardMedia component="iframe" src={video.url} height="200" />
                            <CardHeader title={video.title} />
                            <CardContent>
                                <Typography>{video.description}</Typography>
                            </CardContent>
                            <CardContent>
                                <ButtonGroup variant="outlined" fullWidth>
                                    <Button className="bi bi-hand-thumbs-up">{video.likes}</Button>
                                    <Button className="bi bi-hand-thumbs-down">{video.dislikes}</Button>
                                    <Button className="bi bi-eye">{video.views}</Button>
                                </ButtonGroup>
                            </CardContent>
                            <CardActions>
                                <Button onClick={()=>{handleClick(video)}} variant="contained" color="info" fullWidth>Watch Later</Button>
                            </CardActions>
                        </Card>
                        )
                    )
                }
            </div>
        </div>
    )
}