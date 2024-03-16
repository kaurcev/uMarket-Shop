import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoksPanel from '../components/stocks';
import Prodoload from '../components/prodoload';
import serverUrl from "../config";
import '../styles/productpanel.css'

export default function MainPage() {
  document.title = "Главная";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`//${serverUrl}/api/Product/all.php`);
          const jsonData = await response.json();
          setData(jsonData.data);
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); // Пустой массив зависимостей
  
    const productOpen = async (id) => {
      navigate(`/product?id=${id}`);
    };
  
    return (
      <>
        <Header />
          <main>
            <StoksPanel />
            <h3>Эксклюзив юМаркет Шоп</h3>
            <div className="productpanel">
            {loading ? (
              <>
              <Prodoload />
              <Prodoload />
              </>
              ) : (
              data.map((item) => (
                  <div className="cart" key={item.id}>
                    <img
                      onClick={() => productOpen(item.id)}
                      src={`//${serverUrl}/img/${item.img}`}
                      alt={item.name}
                    />
              <div className="pan">
                <h3>{item.coste} ₽</h3>
                <h5>{item.name}</h5>
                <p className='mini'>{item.description}</p>
              </div>
              </div>
                ))
              )}
            </div>
          </main>
       <Footer />
      </>
    )
  }
  