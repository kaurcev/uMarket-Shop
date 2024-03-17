import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";

export default function RevPage() {
  document.title = "Отзывы о товарах";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams();
    useEffect(() => {
      window.scrollTo(0, 0)
      }, [])

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const params1 = new URLSearchParams();
            params1.append('token', localStorage.getItem('token'));
            const response1 = await fetch(`//${serverUrl}/api/user/token.php?${params1.toString()}`);
            const jsonData1 = await response1.json();
            setData1(jsonData1.data);
            params.append('token', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/provider/revs.php?${params.toString()}`);
            const jsonData = await response.json();
            setData(jsonData.data);
            if(!jsonData.status){
              navigate(`/start`);
            }
            window.scrollTo(0, 0);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      // eslint-disable-next-line
      }, []); 

    const productOpen = async (id) => {
      navigate(`/product?id=${id}`);
    };
    return (
      <>
    <Header />
    <main>
        {loading ? (
          <>Грузим</>
        ) : (
          <>
            <div className='caca'>
              <div className='navigate'>
                <Link className='bt op' to="/profile">Общие данные</Link>
                <Link className='bt op' to="/basket">Корзина</Link>
                {data1.role === "2" ? (
                  <>
                    <Link className='bt op' to="/postavs">Панель поставщика</Link>
                  </>
                ) : null}
                {data1.role === "3" ? (
                  <>
                    <Link className='bt op' to="/admin">Панель администратора</Link>
                  </>
                ) : null}
                </div>
              <div className='carted'>
              <h3 className="pagename">Отзывы вашим товарам</h3>
            <p className='mini'>Во имя честной торговли, отзывы удалять нельзя. При спорных ситуациях (спам атака), обращаться по почте <b>info@umarketshop.site</b></p>
              {loading ? (
        <>
        <div>
          asd
        </div>
        </>
          ) : (
            data.map((item) => (
              <div className='comment' onClick={() => productOpen(item.product)} disabled={loading}>
              <div className='duo b'>
                  <h4>{item.username}</h4>
                  <span>
                      {
                      Array.from({ length: item.coll }, (_, index) => (
                      <i key={index} className="fa fa-star gold" aria-hidden="true"></i>
                      ))}
                      </span>
              </div>
              <p>{item.message}</p>
              </div>
            ))
          )}
              </div>
            </div>
          </>
        )}
      </main>
    <Footer />
    </>
    )
  }
  