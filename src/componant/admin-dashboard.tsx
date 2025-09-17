import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import type { VideoDetailsContract } from "../contracts/videoDetails-contract";
import axios from "axios";



export function AdminDashboard(){

    const[cookie,,removeCookie] = useCookies(["admin_id"])
    const navigate = useNavigate()
    const[videoDetails,setVideoDetails] = useState<VideoDetailsContract[]>()
    const [search,setSearch] = useState<string>("")
    const [sortItem,setSortItem] = useState<string>("")
    const [categoryFilter,SetCategoryFilter] = useState<string>("")

    function LoadVideoDetails(){
        axios.get("http://localhost:3000/videos")
        .then(res=>{
            setVideoDetails(res.data)
        })
    }

    useEffect(()=>{
        if(cookie["admin_id"]===undefined){
            navigate("/admin-login")
        }else{
            LoadVideoDetails()
        }
    },[])

    function handleSignoutClick(){
        removeCookie('admin_id') 
        navigate("/admin-login")   
    }

    function handleSearchChange(e:any){
        setSearch(e.target.value)
    }

    function handleCategoryChange(e:any){
        SetCategoryFilter(e.target.value)
    }

    function handleSortChange(e:any){
        setSortItem(e.target.value)
    }

    function AllShortCuts(){
        var video = [...videoDetails || [] ]

        if(search){
         video =  video.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
        }

        if(sortItem==="likes"){
           video = [...video].sort((a,b)=>b.likes - a.likes)
        }

        if(sortItem==="views"){
          video = [...video].sort((a,b)=>b.views - a.views)
        }

        if(categoryFilter){
            video = video.filter(item=>item.category_id===parseInt(categoryFilter))
        }

        return video;

    }

    const filterVideos = AllShortCuts()

    return(
        <div className="container-fluid text-white">
            <div className="d-flex justify-content-between align-items-center mt-1">
                <div><h4>{cookie["admin_id"]}-dashboard</h4><Link to="/add-video" className="btn btn-primary">Add Video</Link></div>
                <div className="d-flex justify-content-between align-items-center">
                    <input type="text" className="form-control" value={search} onChange={handleSearchChange} />
                    <select value={categoryFilter} onChange={handleCategoryChange} className="form-select mx-2">
                        <option value="">Select Category</option>
                        <option value="1">React</option>
                        <option value="2">Java</option>
                        <option value="3">Python</option>
                    </select>
                    <select value={sortItem} onChange={handleSortChange} className="form-control">
                        <option value="">Sory by</option>
                        <option value="likes">Likes</option>
                        <option value="views">Views</option>
                    </select>
                </div>
                <div>
                    <button onClick={handleSignoutClick} className="btn btn-danger">Singout</button>
                </div>
            </div>
            <table className="table table-bordered table-hover table-dark m-1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Likes</th>
                        <th>Views</th>
                        <th>Aciton</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterVideos.length<=0 ? (
                            <div>
                                <h5 className="text-center">No Video Found</h5>
                            </div>
                        ) : (
                            filterVideos.map(video=>
                            <tr className="text-center" key={video.id}>
                                <td className="align-middle">{video.title}</td>
                                <td className="align-middle"><iframe src={video.url} height="200" width="250"></iframe></td>
                                <td className="align-middle">{video.likes}</td>
                                <td className="align-middle">{video.views}</td>
                                <td className="align-middle"><Link to={`/edit-video/${video.id}`} className="bi bi-pen-fill btn btn-warning"></Link><Link to={`/delete-video/${video.id}`} className="bi bi-trash btn btn-danger mx-2"></Link></td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}