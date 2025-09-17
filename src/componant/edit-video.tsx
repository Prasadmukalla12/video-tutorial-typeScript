import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { VideoDetailsContract } from "../contracts/videoDetails-contract"
import * as yup from "yup"



export function EditVideo(){

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

    const formik = useFormik({
        initialValues : {
            title:video?.title,
            description:video?.description,
            url:video?.url,
            likes:video?.likes,
            dislikes:video?.dislikes,
            views:video?.views,
            comments:video?.comments,
            category_id:video?.category_id
        },
        onSubmit:(video)=>{
            var product = {
                title:video.title,
                description:video.description,
                url:video.url,
                likes:video.likes,
                dislikes:video.dislikes,
                views:video.views,
                comments:video.comments,
                category_id:Number(video.category_id)
            }
            axios.put(`http://localhost:3000/videos/${params.id}`,product)
            .then(()=>{
                alert("Video updated")
                navigate("/admin-dashboard")
            })
        },
        validationSchema:yup.object({
                    title:yup.string().required("Title required"),
                    description:yup.string().required("Description required"),
                    url:yup.string().required("URL required"),
                    likes:yup.string().required("Likes required"),
                    dislikes:yup.string().required("Dislikes required"),
                    views:yup.string().required("Views required"),
                    comments:yup.string().required("Comments required"),
                    category_id:yup.string().required("Category required")
                }),
        enableReinitialize:true
    })

    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="text-white w-75 m-2">
                <dl className="row">
                    <dt className="col-3">Title</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.title} type="text" className="form-control" name="title" /></div>
                        <div className="text-danger">{formik.errors.title}</div>
                    </dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.description} type="text" className="form-control" name="description" /></div>
                        <div className="text-danger">{formik.errors.description}</div>
                    </dd>
                    <dt className="col-3">URL</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.url} type="text" className="form-control" name="url" /></div>
                        <div className="text-danger">{formik.errors.url}</div>
                    </dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.likes} type="number" className="form-control" name="likes" /></div>
                        <div className="text-danger">{formik.errors.likes}</div>
                    </dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.dislikes} type="number" className="form-control" name="dislikes" /></div>
                        <div className="text-danger">{formik.errors.dislikes}</div>
                    </dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.views} type="number" className="form-control" name="views" /></div>
                        <div className="text-danger">{formik.errors.views}</div>
                    </dd>
                    <dt className="col-3">Comments</dt>
                    <dd className="col-3">
                        <div><input onChange={formik.handleChange} value={formik.values.comments} type="text" className="form-control" name="comments" /></div>
                        <div className="text-danger">{formik.errors.comments}</div>
                    </dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-3">
                        <div>
                            <select onChange={formik.handleChange} value={formik.values.category_id} name="category_id" className="form-select">
                                <option value="">Select Category</option>
                                <option value="1">React</option>
                                <option value="2">Java</option>
                                <option value="3">Python</option>
                            </select>
                        </div>
                        <div className="text-danger">{formik.errors.category_id}</div>
                    </dd>
                </dl>
                <button className="btn btn-success" type="submit">Submit</button>
                <Link className="btn btn-warning mx-2" to="/admin-dashboard">Cancel</Link>
            </form>
        </div>
    )
}