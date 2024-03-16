
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";

export default function StockOPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productid = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`//${serverUrl}/api/stok/info.php?id=${productid}`);
        const jsonData = await response.json();
        window.scrollTo(0, 0)
        if(jsonData.status){
          setData(jsonData.data);
        }else{
          navigate('/404');
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []); 


  return (
    <>
    <Header />
      <main>
      {loading ? (
        <>
          <div className='cart load'>
            <hr/>
            <p className='load'></p>
            <p className='load'></p>
          </div>
        </>
        ) : (
          <>
          <div className='cart'>
          <h1>{data.name}</h1>
          <hr/>
          <p>{data.description}</p>
          <p>Поставщик: {data.provider}</p>
          </div>
          </>
          )}
       </main>
       <Footer />
    </>
  );
}