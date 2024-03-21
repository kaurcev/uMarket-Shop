import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";

export default function StockPage() {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responses = await fetch(`//${serverUrl}/api/stok/all.php`);
        const jsonDatas = await responses.json();
        setDatas(jsonDatas.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей
  
  const stockOpen = async (id) => {
    navigate(`/stock?id=${id}`);
  };

  return (
    <>
      <Header />
        <main>
          <h3>Проводимые акции</h3>
          <div className='flexcartpromo'>
          {loading ? (
            <>
            <div className="cart load">
              </div>
            </>
          ) : (
            datas.map((item) => (        
              <div key={item.id} className="cartpromo">
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p className="mini">{item.provider}</p>
                  <button onClick={() => stockOpen(item.id)}>Открыть</button>
                  </div>
                  <img src="/assets/img/min-logo.png" alt="" />
              </div>
            ))
          )}
          </div>
      </main>
      <Footer />
    </>
  );
};