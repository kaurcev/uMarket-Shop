import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import serverUrl from "../config";
import '../styles/product.css'

export default function ProductPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
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
        const response1 = await fetch(`//${serverUrl}/api/rews/info.php?id=${productid}`);
        const jsonData1 = await response1.json();
        setData1(jsonData1.data);
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
            <div className='rews'><span><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i> </span> <span id="revs">{data1.length} отзывов</span> <span>Поделиться</span></div>    
            <div> Артикул товара: {data.id}</div>
          </div>
          <div className="duo">
            <div className="photoitem">
              <div className="cart">
                <img src={`//backend/img/${data.img}`} alt={data.name}/>
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
                <button className="btop">Купить в 1 клик</button>
                <div>
                  <h5>Часто задаваемые вопросы</h5>
                  <div className="duo">
                    <Link to='#'>Как оплатить?</Link>
                    <Link to='#'>Безопасность</Link>
                  </div>
                </div>
              </div>
              </div>
              <h4>Описание</h4>
              <p>{data.description}</p>
              <h4>Отзывы</h4>
              <div className="duo b">
                <div className="rev">
                  {
                  data1.map((item) => (
                  <div className='body'>
                    <div>
                        <h4>{item.username}</h4>
                        <span>
                            {
                            Array.from({ length: item.coll }, (_, index) => (
                            <i key={index} className="fa fa-star gold" aria-hidden="true"></i>
                            ))}
                          </span>
                    </div>
                    <p>{item.message}</p>
                  </div>))}
                </div>
                <div className='postav'>
                  <h5>Информация о поставщике</h5>
                  <p>{data.provname}</p>
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
  