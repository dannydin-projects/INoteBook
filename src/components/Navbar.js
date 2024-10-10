import React from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom";
export default function Navbar() {
    let location =useLocation();
    // useEffect(() => {
    //     console.log(location.pathname)
    //   }, [location]);
    let navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {localStorage.getItem('token') ? <li className="nav-item">
                                <Link className="nav-link"  to="/addnote">AddNote</Link>
                            </li>: ""}
                        </ul>
                        {!localStorage.getItem('token')? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">LogIn</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                        
                        </form> : <button className='btn btn-primary' onClick={handleLogout} >Logout</button>}
                    </div>
                </div>
            </nav>

        </>
    )
}
