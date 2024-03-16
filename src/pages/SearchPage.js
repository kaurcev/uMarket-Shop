import Footer from '../components/Footer';
import Header from '../components/Header';
import Prodoload from '../components/prodoload';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import serverUrl from "../config";

export default function SearchPage() {
  document.title = "Результаты поиска";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('q');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`//${serverUrl}/api/Product/search.php?search=${search}`);
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
  }, [search]); // Пустой массив зависимостей

  const productOpen = async (id) => {
    navigate(`/product?id=${id}`);
  };

  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
       <Header />
       <main>
        <h3 className="pagename">Найдено по запросу: {search}</h3>
        <div className="productpanel">
        {loading ? (
            <>
              <Prodoload />
              <Prodoload />
            </>
          ) : (
            data.map((item) => (
              <div className="cart" key={item.id}>
                <img
                  onClick={() => productOpen(item.id)}
                  src={`//${serverUrl}/img/${item.img}`}
                  alt={item.name}
                />
                <h3>{item.coste}₽</h3>
                <h4>{item.name}</h4>
                <p className='mini'>{item.description}</p>
              </div>
            ))
          )}
        </div>
       </main>
       <Footer />
      </>
    )
  }
  