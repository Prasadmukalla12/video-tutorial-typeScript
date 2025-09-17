import { Link } from "react-router-dom";


export function VideoLibraryHome(){


    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center" style={{height:"500px"}}>
                <Link to="/admin-login" className="btn btn-primary">Admin</Link>
                <Link to="/user-login" className="btn btn-warning mx-3">User</Link>
            </div>
        </div>
    )
}