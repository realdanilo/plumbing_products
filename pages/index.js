import styles from '../styles/Home.module.css'
import {useRouter} from "next/router"
import { useState } from 'react'
import { getById } from '../utils/dbMethods'
import main from '../utils/dbConnection'


export default function Home({data}) {
  const initID = data ? data.materialID : "1000"
  const [materialId, SetMaterialId] = useState(initID)
  const router = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/?id=${materialId}`)
  }

  return (
    <div className={styles.container}>
     <form onSubmit={handleSubmit} >
       <input  type="text" minLength="8" value={materialId} autoFocus={true} required  onChange={(e)=> SetMaterialId(e.target.value)}/>
     </form>
     {/* if there is material, show pic + desc */}
    {data && (
      <div className={styles.infoGraph}>
        <img src={data.imageURL} alt={data.description}/>
        <h3>{data.description}</h3>
        <p>{data.categoryName}</p>
        <p>{data.subCategory}</p>


      </div>
    )}
    </div>
  )
}
export async function getServerSideProps({query:{id}}){
 let res = await getById(id) 
 return {props: {data: JSON.parse(JSON.stringify(res))}}

}