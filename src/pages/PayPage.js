import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import paysimg from '../img/pays.png'

export default function PayPage() {
  document.title = "Оплата прошла успешна";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
       <main>
        <div className='full'>
          <img src={paysimg} alt="Оплата прошла успешно" />
          <h1>Баланс пополнен</h1>
          <p>Ваши средства будут скоро переведены на ваш юМаркет Кошелек</p>
          <p className='mini'></p>
          <Link className='bt' to='/profile'>Вернуться в профиль</Link>
        </div>
       </main>
       <Footer />
      </>
    )
  }
  