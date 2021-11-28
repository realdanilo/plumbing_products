import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { getByDescription, getById } from "../utils/dbMethods";
import MainForm from "../components/MainForm";
import { useContext } from "react";
import { MainContext } from "../utils/MainContext";
import MaterialSKU from "../components/MaterialSKU";
import MaterialDescription from "../components/MaterialDescription";
import Layout from "../components/Layout"
import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter()
  let appFirstLoad = router.asPath == "/"
  let data = props.result?.data;
  let res = data ? data.res : null 
  const { loading, setLoading } = useContext(MainContext);
  useEffect(() => {
    setLoading(data?.loading);
  }, [data]);


  return (
    <Layout>
      <MainForm />
      {/* if loading */}
      {loading && <div className={styles.loader} />}
      {/* if error */}
      {data && data.error && <p>{data.message}</p>}
      {/* if search was completed but no products were found */}
      {res ==null && !appFirstLoad && <p>Not found</p>}
      {/* if SKU */}
      {res && data.searchType == "SKU" && <MaterialSKU product={data.res} />}
      {/* if description */}
      {res && data.searchType == "description" && (
        <MaterialDescription products={data.res} />
      )}
    </Layout>
  );
}
export async function getServerSideProps({
  req,
  query: { searchType, searchInput },
}) {
  if (!searchInput || !searchType || req.method != "GET") return { props: {} };

  let data = { loading: true, searchInput, products:null, product:null,searchType};

  if (searchType == "description") {
    //search by description
    let res = await getByDescription(searchInput);
    if(res.length ==0 ) res = null
    data = { ...data, loading: false, res };
  } else if (searchType == "SKU") {
    //search by SKU
    let res = await getById(searchInput);
    data = { ...data, loading: false, res };
  } else {
    //return error
    data = { error: true, message: "Search Verification Error, Contact Dan" };
  }

  return { props: { result: JSON.parse(JSON.stringify({ data })) } };
}
