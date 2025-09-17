import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"

export function AdminLogin(){


    const[,setCookie,] = useCookies(["admin_id"])
    const navigate = useNavigate()
 
    const formik = useFormik({
        initialValues:{
            admin_id : "",
            password:""
        },
        onSubmit:(user)=>{
            axios.get("http://localhost:3000/admin")
            .then(res=>{
              var result = res.data.find((item:any)=>item.admin_id===user.admin_id)
              if(result){
                 setCookie("admin_id",user.admin_id,{expires:new Date("2025-12-12")})
                 if(user.password===result.password){
                    navigate("/admin-dashboard")
                 }else{
                    alert("invalid password")
                 }
              }else{
                alert("invalid user")
              }
            })
        },
        validationSchema:yup.object({
            admin_id :yup.string().required("Admin required"),
            password:yup.string().required("Password required")
        })
    })

    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="w-25 p-2 text-white">
                <dl>
                    <dt>Admin-id</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="admin_id" /></dd>
                    <dd className="text-danger">{formik.errors.admin_id}</dd>
                    <dt>Password</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="password" /></dd>
                    <dd className="text-danger">{formik.errors.password}</dd>
                </dl>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/" className="btn btn-warning mx-2">Cancel</Link>
            </form>
        </div>
    )
}