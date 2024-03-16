import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";
import Prodoload from '../components/prodoload';

export default function PostavPage(){
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('token', localStorage.getItem('token'));
        const response = await fetch(`//${serverUrl}/api/provider/myproducts.php?${params.toString()}`);
        const jsonData = await response.json();
        if(localStorage.getItem('token') == null){
          navigate('/auth')
        }
        const params1 = new URLSearchParams();
        params1.append('token', localStorage.getItem('token'));
        const response1 = await fetch(`//${serverUrl}/api/user/token.php?${params1.toString()}`);
        const jsonData1 = await response1.json();
        setData1(jsonData1.data);
        window.scrollTo(0, 0)
        if(jsonData.status){ 
          setData(jsonData.data);
        }else{
           navigate('/404');
          }
      } catch (error) { 
        console.log(error);
      } finally { setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const productOpen = async (id) => {
    navigate(`/postavs/edit?id=${id}`);
  };



  return (
    <>
      <Header />
      <main className='profile'>
		{loading ? (
			<>
			Загрузка
			</>
        ) : (
          <>
          <div className='caca'>
            <div className='navigate'>
            <Link className='bt' to="/profile">Общие данные</Link>
            <Link className='bt' to="/basket">Корзина</Link>
            {data1.role === "2" ?(
            <>
              <Link className='bt' to="/postavs">Панель поставщика</Link>
            </>
            ) : null}
            {data1.role === "3" ?(
            <>
              <Link className='bt' to="/admin">Панель администратора</Link>
            </>
            ) : null}
            </div>
            <div className='carted'>
              <Link className='button' to='/postavs/add'>Добавить товар</Link>
            <h3 className="pagename">Ваши товары</h3>
            <hr/>
            <div className="productpanel">
        {loading ? (
            <>
             <Prodoload />
              <Prodoload />
            </>
          ) : (
            data.map((item) => (
              <div  onClick={() => productOpen(item.id)} className="cart" key={item.id}>
                <img
                  src={`//${serverUrl}/img/${item.img}`}
                  alt={item.name}
                />
                <h3>{item.coste} ₽</h3>
                <h5>{item.name}</h5>
                <p className='mini'>{item.description}</p>
              </div>
            ))
          )}
        </div>
          </div>
      </div>
          </>
          )}
        </main>
      <Footer />
    </>
  );
};