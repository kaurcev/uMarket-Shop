import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RewsPanel from '../components/rews';
import serverUrl from "../config";
import '../styles/product.css'

export default function ProductPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productid = searchParams.get('id');
  const [rewm, setRewm] = useState('');
  const [rewc, setRewc] = useState('');
  document.title = "Страница товара";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

  const RewLoadnRequest = async () => {
    const params = new URLSearchParams();
    params.append('message', rewm); 
    params.append('product', productid); 
    params.append('coll', rewc); 
    params.append('u', localStorage.getItem('token'));
    await fetch(`//${serverUrl}/api/rews/add.php?${params.toString()}`)
      .then(response => response.json())
      .then(data => { 
        if (data.status) { 
          alert("Работает");
        } else { 
          alert("Не работает");
        }
      })
      .catch(error => {
         alert(`501 ошибка: ${error.message}`);console.error(error);
        }
      );
  }

  const RewMessHandler = (event) => {
    setRewm(event.target.value);
  };

  const RewCollHandler = (event) => {
    setRewc(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    RewLoadnRequest();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`//${serverUrl}/api/product/item.php?id=${productid}`);
        const jsonData = await response.json();
        window.scrollTo(0, 0)
        if(jsonData.status){ setData(jsonData.data);}else{ navigate('/404');}
      } catch (error) { console.log(error);} finally { setLoading(false);}
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const handleClick = async (id) => {
    try {
      const params = new URLSearchParams();
      params.append('product', id);
      params.append('u', localStorage.getItem('token'));

      const response = await fetch(
        `//${serverUrl}/api/basket/add.php?${params.toString()}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          alert('Добавлено в корзину');
        } else {
          alert('Не удалось добавить в корзину');
        }
      } else {
        throw new Error('Ошибка при добавлении в корзину');
      }
    } catch (error) { alert(`Ошибка: ${error.message}`);console.log(error.message);
    } finally {}
  };


  const payhandleClick = async () => {
    try {
      const params = new URLSearchParams();
      params.append('money', data.coste);
      params.append('postav', data.provname);
      params.append('token', localStorage.getItem('token'));
      const response = await fetch(
        `//${serverUrl}/api/pay/paymed.php?${params.toString()}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          alert('Куплено');
        } else {
          alert('Купить не удалось');
        }
      } else {
        throw new Error('Ошибка при покупке');
      }
    } catch (error) { alert(`Ошибка: ${error.message}`);console.log(error.message);
    } finally {}
  };


    return (
      <>
       <Header />
       <main className='product'>
      {loading ? (
         <div>
          Загрузка
         </div>
        ) : (
          <>
          <h2>{data.name}</h2>
          <hr />
          <div className="duo b">
            <div className='rews'><span><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i> </span> 
            <span id="revs"> отзывов</span></div>    
            <div className='mini'> Артикул товара: {data.id}</div>
          </div>
          <div className="duo">
            <div className="photoitem">
              <div className="cart">
                <img src={`//${serverUrl}/img/${data.img}`} alt={data.name}/>
              </div>
                </div>
              <div className="asd">
                <div className="panel">
                  <h3>{data.coste} ₽</h3>
                  <span>за штуку</span>
                  {
                  localStorage.getItem('token') ? (
                    <>
                    <button onClick={() => handleClick(data.id)}>В корзину</button>
                    </>
                    ) : (
                    <>
                    <button>Необходимо авторизироваться</button>
                    </>
                    )}
                </div>
                <button className="bt op" onClick={payhandleClick}>Купить в 1 клик</button>
                <div>
                  <h5>Часто задаваемые вопросы</h5>
                  <div className="duo">
                    <Link to='/pay'>Как оплатить?</Link>
                    <Link to='/banan'>Безопасность</Link>
                  </div>
                </div>
              </div>
              </div>
              <h4>Описание</h4>
              <p>{data.description}</p>
              <h4>Отзывы</h4>
              <div className="reves">
               <RewsPanel />
                <div className='postav'>
                  <h5>Информация о поставщике</h5>
                  <p>{data.manager}</p>
                  <p className='mini'>{data.provdesc}</p>
                </div>
              </div>
            <form onSubmit={submitHandler}>
              <p className='mini'>Ваш отзыв</p>
              <textarea placeholder="Ваш отзыв" onChange={RewMessHandler}  />
              <p className='mini'>Ваша оценка</p>
              <input type="number" min="1" max="5" placeholder="Число" onChange={RewCollHandler}  />
              <button>Отправить</button>
            </form>
          </>
          )}
       </main>
       <Footer />
      </>
    )
  }
  