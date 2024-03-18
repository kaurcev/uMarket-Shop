import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);        
        if(localStorage.getItem('token') == null){
          navigate('/auth')
        }
        const params = new URLSearchParams();
        params.append('token', localStorage.getItem('token'));
        const response = await fetch(`//${serverUrl}/api/user/token.php?${params.toString()}`);
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
  }, []); // Пустой массив зависимостей

  const geopos = async () => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        try {
          setLoading(true);        
          if(localStorage.getItem('token') == null){
            navigate('/auth')
          }
          const params = new URLSearchParams();
          params.append('token', localStorage.getItem('token'));
          params.append('latitude', position.coords.latitude);
          params.append('longitude',position.coords.longitude);
          const response = await fetch(`//${serverUrl}/api/user/position.php?${params.toString()}`);
          const jsonData = await response.json();
          window.scrollTo(0, 0);
          if(!jsonData.status){
            navigate('/logout')
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
      function (error) {
        console.error("Ошибка получения местоположения:", error);
      }
    );
  }

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
            <Link className='bt op' to="/profile">Общие данные</Link>
            <Link className='bt op' to="/basket">Корзина</Link>
            {data.role === "2" ? (
            <>
              <Link className='bt op' to="/postavs">Панель поставщика</Link>
            </>
            ) : null}
            {data.role === "3" ? (
            <>
              <Link className='bt op' to="/admin">Панель администратора</Link>
            </>
            ) : null}
            </div>
            <div className='carted'>
			<h3>{data.username}</h3>
      <hr/>
      <div className='duo'>
      <p className="mini">Аккаунт создан: {data.created}</p>
      <p className="mini" onClick={() => geopos()}><i className="fa fa-map-marker" aria-hidden="true"></i> Обновить геопозицию</p>
      </div>
      <h3>Место доставки</h3>
      <p className='mini'>Рекомендуется указывать Ваше домашнее положение</p>
      <h3>Ваша активность</h3>
      <p className='mini'>Обратите внимание, что наша система авторизации поддерживает единую авторизацию (Только через одно устройство)</p>
      <div className='usercontroll'>
			<p><i className="fa fa-paw" aria-hidden="true"></i> {data.useragent}</p>
      <p className="mini"><i className="fa fa-terminal" aria-hidden="true"></i> {data.ip}</p>
      </div>
      <h3>Пополнение</h3>
      <div>
      <form method="POST" action="https://yoomoney.ru/quickpay/confirm">
        <input type="hidden" name="receiver" value="4100110853907883"/>
        <input type="text" name="label" defaultValue={data.username} />
        <input type="hidden" name="quickpay-form" value="button"/>
        <input name="sum" value="2" data-type="number"/>
        <input type="hidden" name="successURL" value="https://api.umarketshop.site/api/pay/success.php"/>
        <label><input type="radio" name="paymentType" value="PC"/>ЮMoney</label>
        <label><input type="radio" name="paymentType" value="AC"/>Банковской картой</label>
        <button>Перевести</button>
      </form>
      </div>
      </div>
      </div>
          </>
          )}
        </main>
      <Footer />
    </>
  )
}

export default Profile;