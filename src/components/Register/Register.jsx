import axios from "axios";
import Joi from "joi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarReg } from "../Navbar/Navbar";
import { Helmet, HelmetProvider } from 'react-helmet-async';


export function Register(){
    let [joiError,setJoiError]=useState(null)
    let [emailerr,setEmailErr]=useState(undefined)
    let [loading ,setLoading] =useState(false)

     let [user,setUser]=useState({
       
            "first_name":"",
            "last_name":"",
            "email":"",
            "password":"",
            "age":"0"
     })
     let navigate= useNavigate()

    function getUser(e){
        setJoiError(null)
        setEmailErr(undefined)
        let inputvalue= e.target.value
        let propertyName= e.target.id
        let newUser={...user}
        newUser[propertyName]=inputvalue
        setUser(newUser)
       



    
    }


    function getValidate(e){
        e.preventDefault()
        setLoading(true)


    const schema=Joi.object({
            "first_name": Joi.string().alphanum().min(4).max(14).required(),
            "last_name":  Joi.string().alphanum().min(4).max(14).required(),
            "email": Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } } ),
            "password": Joi.string().max(30).min(6).required(),
            "age":Joi.number().min(10).max(80).required()

        })
 let joiResponse=schema.validate(user,{abortEarly:false})

   if (joiResponse.error==undefined){
    senduser()
    console.log("no errors")
   }
   else{
    setLoading(false)
    setJoiError(joiResponse.error.details)
console.log(joiError)
   }
    }


async function senduser(){
    setLoading(true)
    let {data}= await axios.post("https://sticky-note-fe.vercel.app/signup",user)
    if(data.message=="success"){
    navigate("/login")
    }
    else{
        setLoading(false)
        setEmailErr( data.message)
}

}



function getSpecificError(key){
 
    if (joiError != null){

        for (let i = 0; i < joiError.length; i++) {
        if (joiError[i].context.key ==key){
            return  joiError[i].message
        }
        
        return ""
        }

    }

   

}



    return <>
      <Helmet>
         <title>
         Register
         </title>
      </Helmet>
    <section  className="Register ">

<div className="container ">
        <div className="row">
        <div className="col-md-6 p-0">
            <div className="item gaming-img">
            </div>
        </div>
        <div className="col-md-6 p-0">
            <div className="item">
                <h2 className="text-center py-3">Create My Account!</h2>
                <form  onSubmit={getValidate} className="py-2 w-75 m-auto">
                <input type="text" onChange={getUser} className="form-control my-2" placeholder="first_name" id="first_name" />
                {getSpecificError("first_name")? <div className="alert alert-danger"> {getSpecificError("first_name")}</div>: ""}

                    <input type="text" onChange={getUser} className="form-control my-2" placeholder="last_name" id="last_name" />
                    {getSpecificError("last_name")? <div className="alert alert-danger"> {getSpecificError("last_name")}</div> : ""}

                    
                    <input type="email" onChange={getUser} className="form-control my-2" placeholder="email" id="email" />
                    {getSpecificError("email")? <div className="alert alert-danger"> {getSpecificError("email")}</div>: ""}

                    {emailerr==undefined?"" : <div className="alert alert-danger">{emailerr}</div>}
                    <input type="password" onChange={getUser} className="form-control my-2" placeholder="password" id="password" />
                    {getSpecificError("password")? <div className="alert alert-danger"> {getSpecificError("password")}</div> : ""}
                    <input type="age" onChange={getUser} className="form-control my-2" placeholder="age" id="age" />
                    {getSpecificError("age")? <div className="alert alert-danger"> {getSpecificError("age")}</div>: ""}
                    
                <button className="btn btn-primary my-3 text-white w-100">{loading? <i className="fa-solid fa-spin   fa-spinner"></i> : "Create account"} </button>
               
       
                </form>
                <hr />

                <p className="text-center fw-bold my-5">Already a member?  <Link className="link" to={"/login"} >Log in</Link></p>
            </div>
        </div>
    
    </div>

</div>

</section>
 

</>

}