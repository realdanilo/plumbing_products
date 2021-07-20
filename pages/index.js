import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router"
import { useState } from 'react'
import { getById } from '../utils/dbMethods'
import main from '../utils/dbConnection'


export default function Home({data}) {
  const [materialId, SetMaterialId] = useState("1000")
  const router = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/?id=${materialId}`)
  }

  return (
    <div className={styles.container}>
     <form onSubmit={handleSubmit} >
       <input  type="text" minLength="8" autoFocus={true} required  onChange={(e)=> SetMaterialId(e.target.value)}/>
       <button>find</button>
     </form>
     {/* if there is material, show pic + desc */}
    {data && (
      <>
      <p>{data.materialID}</p>
      <p>{data.description}</p>
      </>
    )}
    </div>
  )
}
export async function getServerSideProps({query:{id}}){
 let res = await getById(id) 
 return {props: {data: JSON.parse(JSON.stringify(res))}}

}