import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoksPanel from '../components/stocks';
import Prodoload from '../components/prodoload';

export default function MainPage() {
  document.title = "Главная";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

    return (
      <>
        <Header />
          <main>
            <StoksPanel />
            <h3>Эксклюзив юМаркет Шоп</h3>
            <div className="productpanel">
              <Prodoload />
            </div>
          </main>
       <Footer />
      </>
    )
  }
  