import React, {useState, useContext} from 'react'
import Layout from '../components/Layout'
import style from "../styles/Login.module.css"
import { MainContext } from '../utils/MainContext'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter()
    //Managing Form Input
    const [formInfo, setFormInfo] = useState({email:"", password:""})
    const handleInputChange = e =>{
        setFormInfo({...formInfo,[e.target.name]:e.target.value})
    }
    // Managing Context 
    const {setUser }= useContext(MainContext)
    const handleSubmitForm = e =>{
        e.preventDefault()
        setUser({email:formInfo.email,ID: Math.floor(Math.random()*100)+1 })
        router.push("/")
    }
    return (
        <Layout>
            <div className={style.formContainer}>
                <form onSubmit={handleSubmitForm}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required={true} value={formInfo.email} onChange={(e)=> handleInputChange(e)}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required={true}  minLength={4} value={formInfo.password} onChange={(e)=> handleInputChange(e)}/>
                    <button>Log In</button>
                    
                </form>
            </div>
        </Layout>
    )
}

export default Login
