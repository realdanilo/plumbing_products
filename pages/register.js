import React , {useState,useContext} from 'react'
import Layout from '../components/Layout'
import style from "../styles/Register.module.css"
import { MainContext } from '../utils/MainContext'
import { useRouter } from 'next/router'
import MetaSearchEngine from "../components/MetaSearchEngine"
import {  toast } from "react-toastify";


const Register = () => {
    const router = useRouter()
    //Managin Form Input
    const [formInfo, setFormInfo] = useState({email:"", password:""})
    const [fauxCreation, setFauxCreation] = useState(true)
    const handleInputChange = e =>{
        setFormInfo({...formInfo,[e.target.name]:e.target.value})
    }
    // Managing Context 
    const {setUser }= useContext(MainContext)

    //Timer, Fake connection
    const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));
      
    const handleSubmitForm = e =>{
        e.preventDefault()
        setUser({email:formInfo.email,ID: Math.floor(Math.random()*100)+1 })
        //fake api on creating user
        setFauxCreation(false)
        toast.success("Success", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        //wait 2 sec
        sleep(2000).then(()=> router.push("/"))
        
    }
    return (
        <Layout>
            <MetaSearchEngine/>
            <div className={style.formContainer}>
                <form onSubmit={handleSubmitForm}> 
                    <h1 hidden={fauxCreation}>Creating user...</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required={true} value={formInfo.email} onChange={(e)=> handleInputChange(e)}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required={true}  minLength={4} value={formInfo.password} onChange={(e)=> handleInputChange(e)}/>
                    <button>Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
