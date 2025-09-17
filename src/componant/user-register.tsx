import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"


export function UserRegister(){

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            user_id:"",
            user_name:"",
            password:"",
            email:""
        },
        onSubmit:(user)=>{
            var details = {
                user_id:user.user_id,
                user_name:user.user_name,
                password:user.password,
                email:user.email
            }
            axios.post("http://localhost:3000/users",details)
            .then(()=>{
              alert("user submitted")
              navigate("/user-login")
            })
        },
        validationSchema:yup.object({
            user_id:yup.string().required("UserId required"),
            user_name:yup.string().required("UserName required"),
            password:yup.string().required("Password required"),
            email:yup.string().required("Email required")
        })
    })


    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="w-25 p-2 text-white">
                <dl>
                    <dt>User-ID</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="user_id" /></dd>
                    <dd className="text-danger">{formik.errors.user_id}</dd>
                    <dt>UserName</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="user_name" /></dd>
                    <dd className="text-danger">{formik.errors.user_name}</dd>
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="password" /></dd>
                    <dd className="text-danger">{formik.errors.password}</dd>
                    <dt>Email</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="email" /></dd>
                    <dd className="text-danger">{formik.errors.email}</dd>
                </dl>
                <button type="submit" className="btn btn-primary w-100">Register</button>
                <Link to="/user-login">Existing User!</Link>
            </form>
        </div>
    )
}