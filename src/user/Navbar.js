import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/Aspira.png';

const navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" id='nav'>
                <div class="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="aspira" id='logo' />
                        {/* <b>ASPIRA</b> */}
                    </NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mt-3 pr-lg-2" id='links'>
                            <li class="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to='/signin'>SigIn</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to='/signup'>Registration</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to='/details'>Details</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default navbar