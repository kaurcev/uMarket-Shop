import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import img404 from '../img/404.png'

export default function E404Page() {
  document.title = "Страница не найдена";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
       <main>
        <div className='full'>
        <img src={img404} alt="404" />
        <p>Страница не найдена..</p>
        <p className='mini'>Страница была удалена или не существовала вовсе</p>
        <Link className='bt' to='/'>Вернуться на главную</Link>
        </div>
       </main>
       <Footer />
      </>
    )
  }
  