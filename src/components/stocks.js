import './stocks.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import serverUrl from "../config";


export default function StoksPanel() {
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
      <div className='stocks'>
      {loading ? (
            <>
              <div className="cart load">
                </div>
            </>
          ) : (
            datas.map((item) => (   
              <div className="cart"  key={item.id}  onClick={() => stockOpen(item.id)}>
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p className="mini">{item.provider}</p>
                </div>
                <img src="/assets/img/min-logo.png" alt="" />
              </div>
            ))
          )}
          </div>
      </>
    )
  }
