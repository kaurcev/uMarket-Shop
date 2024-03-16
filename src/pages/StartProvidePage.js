import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StartProvidePage() {
  document.title = "Как стать поставщиком";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
      <Header />
        <main>
          <h1>Как стать поставщиком?</h1>
          <p>Поговорим о том, как стать поставщиком :)</p>
        </main>
      <Footer />
      </>
    )
  }
  