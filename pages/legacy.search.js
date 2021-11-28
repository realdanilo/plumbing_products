import styles from '../styles/Home.module.css'
import {useRouter} from "next/router"
import { useEffect, useState } from 'react'
import { getByDescription } from '../utils/dbMethods'
import main from '../utils/dbConnection'
import Product from '../components/Product'
import Head from "next/head"

export default function Search({data}) {
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    router.push(`/search/?description=${description}`)
    //setTimeout(()=>{setLoading(false)}, 1000)
  }
  // useEffect(()=>{
  //   setLoading(!(router.query.id == (data?.materialID)))
  //   if(data ==null) setLoading(false)
  // },[router.query])
  return (
    <>
    <Head>
        <title>Search</title>
      </Head>
    <div className={styles.container}>
      
     <form onSubmit={handleSubmit} >
       <input  type="text"  placeholder="Search by description" value={description} autoFocus={true} required  onChange={(e)=> setDescription(e.target.value)}/>
     </form>
     <div className={styles.searchProductContainer}>
       {data.length ==0 && <h3>Not found</h3>}
       {data.length >0 && data.map((p,i)=> <Product {...p} key={i}/>)} 
     </div>
     <button onClick={(e)=> {
      e.preventDefault()
      router.push("/")
    }} className="global-button">Search by Sku</button>
    </div>
    
    </>
  )
}
export async function getServerSideProps({query:{description}}){
 let res = await getByDescription(description) 
 return {props: {data: JSON.parse(JSON.stringify(res))}}

}