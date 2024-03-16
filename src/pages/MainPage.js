import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoksPanel from '../components/stocks';

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
          </main>
       <Footer />
      </>
    )
  }
  