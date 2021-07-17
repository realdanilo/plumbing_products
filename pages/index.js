import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router"
import { useState } from 'react'
import { getById } from '../utils/dbMethods'


export default function Home({material}) {
  const [materialId, SetMaterialId] = useState()
  const router = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/?id=${materialId}`)
  }

  return (
    <div className={styles.container}>
     <form onSubmit={handleSubmit} >
       <input  type="text" minLength="0" required  onChange={(e)=> SetMaterialId(e.target.value)}/>
       <button>find</button>
     </form>
    
    </div>
  )
}
export async function getServerSideProps({query:{id}}){
 let res = await getById(id) 
 console.log(res);
 return {props: {data: {name:"test"}}}

}