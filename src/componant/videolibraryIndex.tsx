
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./videolibraryIndex.css"
import { VideoLibraryHome } from "./videolibraryHome"
import { AdminLogin } from "./admin-login"
import { AdminDashboard } from "./admin-dashboard"
import { AddVideo } from "./add-video"
import { useCookies } from "react-cookie"
import { EditVideo } from "./edit-video"
import { DeleteVideo } from "./delete-video"
import { UserLogin } from "./user-login"
import { UserRegister } from "./user-register"
import { UserDashboard } from "./user-dashboard"

export function VideoLibraryIndex(){

  const [,,removeCookie] = useCookies(["admin_id"])

  function handleHomeClick(){

    removeCookie('admin_id')

  }

    return(
        <div className="container-fluid bg">
            <BrowserRouter>
              <header className="d-flex justify-content-between align-items-centerd p-3 text-white border border-3 position-sticky top-0">
                <div><h3>Video-Library</h3></div>
                <div><Link to="/" onClick={handleHomeClick} className="bi bi-house btn btn-primary"></Link></div>
              </header>
              <section>
                <Routes>
                    <Route path="/" element={<VideoLibraryHome/>}></Route>
                    <Route path="admin-login" element={<AdminLogin/>} />
                    <Route path="admin-dashboard" element={<AdminDashboard/>} />
                    <Route path="add-video" element={<AddVideo />} />
                    <Route path="edit-video/:id" element={<EditVideo />} />
                    <Route path="delete-video/:id" element={<DeleteVideo />} />
                    <Route path="user-login" element={<UserLogin/>} />
                    <Route path="user-register" element={<UserRegister />} />
                    <Route path="user-dashboard" element={<UserDashboard />} />
                </Routes>
              </section>
            </BrowserRouter>
        </div>
    )
}