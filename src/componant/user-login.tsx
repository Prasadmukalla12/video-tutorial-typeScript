import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import type { UserContract } from "../contracts/usercontract";
import axios from "axios";
import * as yup from "yup"


export function UserLogin(){

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            user_id :"",
            password:""
        },
        onSubmit : (user)=>{
            axios.get("http://localhost:3000/users")
            .then(res=>{
                var result = res.data.find((item:UserContract)=>item.user_id===user.user_id)
               if(result){
                if(result.password===user.password){
                    navigate("/user-dashboard")
                }else{
                    alert("Invalid password")
                }
               }else{
                alert("Invalid User")
               }
            })
        },
        validationSchema:yup.object({
            user_id:yup.string().required("User required"),
            password:yup.string().required("password required")
        })
    })

    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="w-25 p-2 text-white">
                <dl>
                    <dt>User-ID</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="user_id" /></dd>
                    <dd className="text-danger">{formik.errors.user_id}</dd>
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="password" /></dd>
                    <dd className="text-danger">{formik.errors.password}</dd>
                </dl>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <Link to="/user-register">New user!</Link>
            </form>
        </div>
    )
}