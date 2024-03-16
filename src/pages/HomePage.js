import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css'
import sale from '../img/sale.gif'
import bugs from '../img/bugs.gif'
import dron from '../img/dron.gif'

export default function HomePage() {
  document.title = "Добро пожаловать!";
    return (
      <>
      <Header />
       <main className="centered">
            <img src={sale} alt="Скидки" />
            <h1>Добро пожаловать на юМаркет Шоп</h1>
            <p>Перейдите в свой аккаунт для начала покупок!</p>
            <Link to="/main" className='bt'>Перейти</Link>
            <div className='duo'>
            <img src={bugs} alt="Работа над системой" />
              <div>
              <h2>Слаженная работа над системой</h2>
              <ul>
                <li>ыва</li>
                <li>ыва</li>
                <li>ыва</li>
                <li>ыва</li>
              </ul>
              </div>
            </div>
            <div className='duo r'>
            <img src={dron} alt="Доставка" />
              <div>
              <h2>Быстрая доставка</h2>
              <ul>
                <li>ыва</li>
                <li>ыва</li>
                <li>ыва</li>
                <li>ыва</li>
              </ul>
              </div>
            </div>
       </main>
       <Footer />
      </>
    )
  }
  