import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { getByDescription, getById } from '../utils/dbMethods'
import MainForm from "../components/MainForm"
import { useContext } from 'react'
import { MainContext } from '../utils/MainContext'
import MaterialSKU from "../components/MaterialSKU"
import MaterialDescription from "../components/MaterialDescription"

export default function Home(props) {
  let data = props.result?.data
  const { loading,setLoading} = useContext(MainContext)
  useEffect(()=>{
    setLoading(data?.loading)
  },[data])
  

  return (
    <div className={styles.container}>
      <MainForm/>
      {/* if loading */}
      {loading && <div className={styles.loader}/>}
     {/* if error */}
      {data?.error && <p>{data.message}</p>}
     {/* if SKU */}
      {data?.searchType == "SKU" && <MaterialSKU product={data.product}/>}
     {/* if description */}
     {data?.searchType == "description" && <MaterialDescription products={data.products}/>}


      
    </div>
  )
}
export async function getServerSideProps({req, query:{searchType,searchInput}}){
  if (!searchInput || !searchType || req.method != "GET") return {props:{}}

  let data = {loading:true,searchInput}
  
  if(searchType=="description"){
    //search by description
    let res = await getByDescription(searchInput)
    data = {...data, loading:false, products:res, searchType}
  }
  else if(searchType=="SKU"){
    //search by SKU
    let res = await getById(searchInput)
    data = {...data,loading:false, product:res, searchType}
  }else{
    //return error
    data = {error:true, message:"Search Verification Error, Contact Dan"}
  }

 return {props: {result:JSON.parse(JSON.stringify({data }))}}

}