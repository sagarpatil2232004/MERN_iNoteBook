import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router'



export default function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        window.location.reload(); 
        navigate('/Login');
    }
    return (
        <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark " >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/" ? "active" : " "}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/About" ? "active" : " "}`} to="/About">About</Link>
                            </li>
                        </ul>
                        {
                        
                            !localStorage.getItem('token') ?
                            (
                                <>
                                    <Link type="button" className="btn btn-sm mx-2 btn-primary" to="/Login" >Login</Link>
                                    <Link type="button" className="btn btn-sm btn-primary" to="/SignUp" >SignUp</Link>
                                </>
                            )
                            :
                            (
                                <Link type="button" className="btn btn-sm btn-primary" to="/Login" onClick={(e) => handleLogout(e)} >Logout</Link>
                            )
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}
