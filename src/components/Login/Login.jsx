import axios from "axios";
import Joi, { func } from "joi";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { NavbarReg } from "../Navbar/Navbar";

export function Login({ getUserData }) {
    let [joiError, setJoiError] = useState(null)
    let [emailerr, setEmailErr] = useState(undefined)
    let [loading, setLoading] = useState(false)

    let [user, setUser] = useState({
        "email": "",
        "password": ""

    })
    let navigate = useNavigate()
    let joiResponse

    function getUser(e) {
        setJoiError(null)
        setEmailErr(undefined)
        let inputvalue = e.target.value
        let propertyName = e.target.id
        let newUser = { ...user }
        newUser[propertyName] = inputvalue
        setUser(newUser)





    }

    let joilist
    function getValidate(e) {
        e.preventDefault()
        setLoading(true)

        const schema = Joi.object({
            "email": Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            "password": Joi.string().max(30).min(6).required(),

        })
        joiResponse = schema.validate(user, { abortEarly: false })

        if (joiResponse.error == undefined) {
            senduser()

        }
        else {
            joilist = joiResponse.error.details
            setJoiError(joilist)

            setLoading(false)
        }
    }


    async function senduser() {
        setLoading(true)
        let { data } = await axios.post("https://sticky-note-fe.vercel.app/signin", user)


        if (data.message == "success") {
            navigate("/home")
            localStorage.setItem("token", data.token)
            getUserData()
        }
        else {
            setEmailErr(data.message)
            setLoading(false)
        }

    }

    function getSpecificError(key) {

        if (joiError != null) {

            for (let i = 0; i < joiError.length; i++) {
                if (joiError[i].context.key == key) {
                    return joiError[i].message
                }

                return ""
            }

        }



    }










    return <>

        < Helmet>
            <title>
                Log in
            </title>
        </ Helmet>
        <section className="login container     ">
            <div className="row ">
                <div className="col-md-6 p-0">
                    <div className="item gaming-img">

                    </div>
                </div>
                <div className="col-md-6 p-0">
                    <div className="item ">
                        <div className="img-container d-flex align-items-center justify-content-center">
                            <img src={require("../../Images/logo.png")} className=" mx-auto mt-3" alt="gameoverLogo" />
                        </div>
                        <h2 className="text-center py-3">Log in to Game over!</h2>
                        <form onSubmit={getValidate} className="py-2 w-75 m-auto">
                            <input type="email" onChange={getUser} className="form-control my-2" placeholder="email" id="email" />
                            {getSpecificError("email") ? <div className="alert alert-danger"> {getSpecificError("email")}</div> : ""}

                            {emailerr == undefined ? "" : <div className="alert alert-danger">{emailerr}</div>}
                            <input type="password" onChange={getUser} className="form-control my-4" placeholder="password" id="password" />
                            {getSpecificError("password") ? <div className="alert alert-danger"> password must be from 6-20 characters and numbers only</div> : ""}
                            <button className="btn btn-primary my-3 text-white w-100">{loading ? <i className="fa-solid fa-spin   fa-spinner"></i> : "log in"} </button>


                        </form>
                        <hr />

                        <p className="text-center fw-bold my-5">Not a Member yet ?  <Link className="link" to={"/Register"} >Create account</Link></p>
                    </div>
                </div>

            </div>

        </section>


    </>
}






