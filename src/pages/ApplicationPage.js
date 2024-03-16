import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ApplicationPage () {
  document.title = "Как установить приложение";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
      <Header />
        <main>
          <h1>Как установить приложения на устройства</h1>
          <p>Тут инфа о PWA</p>
        </main>
      <Footer />
      </>
    )
  }
  