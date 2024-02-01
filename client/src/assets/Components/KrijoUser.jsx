import React, { useState , useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useParams  } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from '../../AuthContext';


const KrijoUser=()=>{
    const { register } = useAuth();
    const [username , setUsername] = useState('')  
    const [password , setPassword] = useState('') 
    const [confirm , setConfirm] = useState('')  
  
    const [errorMessage , setErrorMessage] = useState('')


    const createuser = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from the AuthContext
            await register(username, password, confirm);
            navigate("/");
            // Redirect or perform any other actions after successful user creation
          } catch (error) {
            // Handle user creation error
            console.error("Error creating user:", error.message);
            setErrorMessage("Failed to create user. Please try again.");
          }
        };
      

    return(
        <>
 <div className="container my-5">
    <div className="row justify-content-center">
    <div className="col-md-12 mt-4">
        <div className="card">
          <div className="card-body">

            <h4 className="card-title mb-4">Krijo Nje User</h4>

            <form onSubmit={(e)=> createuser(e)}>
          

              <div className="form-group mb-3">
                <label htmlFor="exampleInputName1">Username</label>
                <input type="text" className="form-control "
                  id="exampleInputName1" name="client" required maxLength="30" value={username} onChange={(e)=> setUsername(e.target.value)} 
              ></input>
                <span className="text-danger">
            
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputName2">Password</label>
                <input type="password" className="form-control"
                  id="exampleInputName2" name="clientTwo" required maxLength="30" value={password} onChange={(e)=> setPassword(e.target.value)} 
                ></input>
                <span className="text-danger">
            
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputName3">Confirm Password</label>
                <input type="password" className="form-control"
                  id="exampleInputName3" name="productCode" required maxLength="40" value={confirm} onChange={(e)=> setConfirm(e.target.value)} 
               ></input> 
                <span className="text-danger">
               
                </span>
              </div>

              <div className="form-group">
                <button className="btn btn-primary me-2 form-control" >Krijoje</button>
                <Link to={"/inventar"} className="btn btn-light form-control">Kthehu</Link>
             
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}

export default KrijoUser