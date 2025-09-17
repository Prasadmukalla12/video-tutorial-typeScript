
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup"


export function AddVideo(){

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues:{
            title:"",
            description:"",
            url:"",
            likes:"",
            dislikes:"",
            views:"",
            comments:"",
            category_id:""
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
                category_id:parseInt(video.category_id)
            }
            axios.post("http://localhost:3000/videos",product)
            .then(()=>{
                alert("Video added")
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
        })
    })

    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="w-25 text-white">
                <dl>
                    <dt>Title</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="title" className="form-control" /></dd>
                    <dd className="text-danger">{formik.touched.title && formik.errors.title}</dd>
                    <dt>description</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="description" className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.description}</dd>
                    <dt>URL</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="url" className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.url}</dd>
                    <dt>Likes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="likes" className="form-control" /></dd>
                    <dd className="text-danger">{formik.touched.likes && formik.errors.likes}</dd>
                    <dt>Dislikes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="dislikes" className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.dislikes}</dd>
                    <dt>views</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="views" className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.views}</dd>
                    <dt>comments</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="comments" className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.comments}</dd>
                    <dt>Category</dt>
                    <dd><select onChange={formik.handleChange} name="category_id" className="form-select">
                          <option value="">Select Category</option>
                          <option value="1">React</option>
                          <option value="2">Java</option>
                          <option value="3">Python</option>
                        </select>
                    </dd>
                    <dd className="text-danger">{formik.errors.category_id}</dd>
                </dl>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/admin-dashboard" className="btn btn-warning mx-2">Cancel</Link>
            </form>
        </div>
    )
}