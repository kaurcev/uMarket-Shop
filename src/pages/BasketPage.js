import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import '../styles/basket.css'

export default function BasketPage() {
  document.title = "Страница не найдена";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams();
    useEffect(() => {
      window.scrollTo(0, 0)
      }, [])

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/basket/all.php?${params.toString()}`);
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
      // eslint-disable-next-line
      }, []); 

    const handleClick = async (id) => {
      try {
        setLoading(true);
        params.append('item', id);
        params.append('u', localStorage.getItem('token'));
        const response = await fetch(`//${serverUrl}/api/basket/delete.php?${params.toString()}`);
        const jsonData = await response.json();
        if (jsonData.status) {
          setData(prevData => prevData.filter(item => item.id !== id));
        }
      } catch (error) {
        alert(`501 ошибка: ${error.message}`);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    const productOpen = async (id) => {
      navigate(`/product?id=${id}`);
    };
    return (
      <>
    <Header />
    <main className='basket'>
      <h1>Корзина</h1>
      <div className='duo'>
      <div className='spisok'>
      {loading ? (
        <>
        <div>
          asd
        </div>
        </>
          ) : (
            data.map((item) => (
            <div className='cart' key={item.id}>
              <img src={`//${serverUrl}/img/${item.img}`} alt='' />
              <div>
                <h3>{item.name}</h3>
                <p className='desc'>{item.description}</p>
                <h3>{item.coste}</h3>
                <h3>{item.count}</h3>
                <div className='panel'>
                  <button className='red' onClick={() => handleClick(item.id)} disabled={loading}>
                    Удалить
                  </button>
                  <button className='op' onClick={() => productOpen(item.product)} disabled={loading}>
                    Открыть товар
                  </button>
                </div>
              </div>
          </div>
            ))
          )}
        </div>
        <div className='panelinfo'>
          Это ваша корзина. Тут хранятся ваши товары, добавленные в корзину для дальнейших покупок
        </div>
      </div>
    </main>
    <Footer />
    </>
    )
  }
  