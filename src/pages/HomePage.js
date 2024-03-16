import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css'
import sale from '../img/sale.gif'

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
       </main>
       <Footer />
      </>
    )
  }
  