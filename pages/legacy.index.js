import styles from '../styles/Home.module.css'
import {useRouter} from "next/router"
import { useEffect, useState } from 'react'
import { getById } from '../utils/dbMethods'
import main from '../utils/dbConnection'
import Head from "next/head"


export default function Home({data}) {
  const router = useRouter()
  const initID = data ? data.materialID : "1000"
  const [materialId, SetMaterialId] = useState(initID)
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    router.push(`/?id=${materialId}`)
    //setTimeout(()=>{setLoading(false)}, 1000)
  }
  useEffect(()=>{
    setLoading(!(router.query.id == (data?.materialID)))
    if(data ==null) setLoading(false)
  },[router.query])

  return (
    <div className={styles.container}>
      <Head>
        <title>{data ? data.description : "Van Marcke"}</title>
      </Head>
     <form onSubmit={handleSubmit} >
       <input  type="number" minLength="8" value={materialId} autoFocus={true} required  onChange={(e)=> SetMaterialId(e.target.value)}/>
     </form>
      {/* if loading */}
      {loading && (<div className={styles.loader}></div>)}
      {/* if data is null */}
      {((data == null) && (router.query.id))&& (<h3>{router.query.id} not found</h3>)}
      {/* if there is material, show pic + desc */}
      {(!loading && data) && (
        <div className={styles.infoGraph}>
          <img src={data.imageURL} alt={data.description}/>
          <h3>{data.description}</h3>
          <p>{data.categoryName}</p>
          <p>{data.subCategory}</p>


        </div>
      )}
           <button onClick={(e)=> {
      e.preventDefault()
      router.push("/search")
    }} className="global-button">Search by Description</button>
    </div>
  )
}
export async function getServerSideProps({query:{id}}){
 let res = await getById(id) 
 return {props: {data: JSON.parse(JSON.stringify(res))}}

}