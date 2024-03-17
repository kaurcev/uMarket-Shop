import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";

export default function ProdoEditPage() {
  const navigate = useNavigate();
  const [nameprodo, setNameprodo] = useState('');
  const [descriptionprodo, setDescriptionprodo] = useState('');
  const [costeprodo, setCosteprodo] = useState('');
  const [imgprodo, setimgprodo] = useState('');
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams();
  const searchParams = new URLSearchParams(location.search);
  const productid = searchParams.get('id');

  const nameprodoHandler = (event) => {
    setNameprodo(event.target.value);
  };

  const descriptionprodoHandler = (event) => {
    setDescriptionprodo(event.target.value);
  };

  const costeprodoHandler = (event) => {
    setCosteprodo(event.target.value);
  };

  const imgprodoHandler = (event) => {
    setimgprodo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    SigninRequest();
  };

  const SigninRequest = async () => {
    params.append('product', productid);
    params.append('name', nameprodo);
    params.append('desc', descriptionprodo);
    params.append('coste', costeprodo);
    params.append('img', imgprodo);
    params.append('token', localStorage.getItem('token'));
    try {
      const response = await fetch(`//${serverUrl}/api/provider/edit.php?${params.toString()}`);
      const data = await response.json();
      if (data.status) {
        alert("Работает");
      } else {
        alert("Не работает");
      }
    } catch (error) {
      alert(`501 ошибка: ${error.message}`);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params1 = new URLSearchParams();
        params1.append('token', localStorage.getItem('token'));
        const response1 = await fetch(`//${serverUrl}/api/user/token.php?${params1.toString()}`);
        const jsonData1 = await response1.json();
        setData1(jsonData1.data);

        const params = new URLSearchParams();
        params.append('token', localStorage.getItem('token'));
        params.append('id', productid);
        const response = await fetch(`//${serverUrl}/api/provider/myproductsedit.php?${params.toString()}`);
        const jsonData = await response.json();
        window.scrollTo(0, 0);
        if (jsonData.status) {
          setData(jsonData.data);
          setNameprodo(jsonData.data.name);
          setDescriptionprodo(jsonData.data.description);
          setCosteprodo(jsonData.data.coste);
          setimgprodo(jsonData.data.img);
        } else {
          // Handle error
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const handleClick = async (id) => {
    try {
      setLoading(true);
      params.append('id', id);
      params.append('token', localStorage.getItem('token'));
      const response = await fetch(`//${serverUrl}/api/provider/delete.php?${params.toString()}`);
      const jsonData = await response.json();
      if (jsonData.status) {
        navigate('/postavs')
      }
    } catch (error) {
      alert(`501 ошибка: ${error.message}`);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        {loading ? (
          <>Грузим</>
        ) : (
          <>
            <div className='caca'>
              <div className='navigate'>
                <Link className='bt op' to="/profile">Общие данные</Link>
                <Link className='bt op' to="/basket">Корзина</Link>
                {data1.role === "2" ? (
                  <>
                    <Link className='bt op' to="/postavs">Панель поставщика</Link>
                  </>
                ) : null}
                {data1.role === "3" ? (
                  <>
                    <Link className='bt op' to="/admin">Панель администратора</Link>
                  </>
                ) : null}
                </div>
              <div className='carted'>
                <h3 className="pagename">Редактирование товара <span className='mini'>{data.name}</span></h3>
                <hr />
                <form className='prodo' onSubmit={submitHandler}>
                  <p className='mini'>Наименование</p>
                  <input placeholder='Дайте название вашему товару!' defaultValue={data.name} onChange={nameprodoHandler} />
                  <p className='mini'>Описание</p>
                  <textarea placeholder='Опишите товар, чтобы привлечь покупателей!' defaultValue={data.description} onChange={descriptionprodoHandler} />
                  <p className='mini'>Цена</p>
                  <input placeholder='Дайте разумную цену вашему товару!' type="number" defaultValue={data.coste} onChange={costeprodoHandler} />
                  <p className='mini'>Картинка</p>
                  <input placeholder='none.png' defaultValue={data.img} onChange={imgprodoHandler} />
                  <p className='flex'><button className='op' type="reset">Отменить изменения</button><button>Сохранить изменения</button></p>
                </form>
                <button className='red' onClick={() => handleClick(productid)} disabled={loading}>Удалить товар</button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};