import './header.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import serverUrl from '../config';

export default function Header() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchtext, setSearchtext] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);     

  
  const searchHandler = (event) => {
    setSearchtext(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('q', searchtext);
    navigate(`/search?${params.toString()}`)
  };

    return (
      <>
        <header>
            <div className='header'>
                <div className='minipanel'>
                <nav>
                    {loading ? (
                    <>
                    <Link to="/">Минутку</Link>
                    </>
                    ) : (
                    <>
                    <Link to="/">{data.country_code3}</Link>
                    <Link to="/">
                    <i className="fa fa-map-o" aria-hidden="true"></i>{data.city} (на основе вашего IP)</Link>
                    </>
                    )
                    }                    
                </nav>
                <nav>
                    <Link to="/start">Стать поставщиком</Link>
                    <Link to="/application">Декстоп приложение</Link>
                    <Link to="/stocks">Акции</Link>
                    {localStorage.getItem('token') ? (
                    <>
                     <Link to="/profile"><b>Профиль</b></Link>
                    </>
                    ) : (
                    <>
                     <Link to="/auth"><b>Необходимо войти</b></Link>
                    </>
                    )}
                </nav>
                </div>
                <div className='mainpanel'>
                <div className='dop'>
                <Link to="/">
                <img className='logo' src={`//${serverUrl}/img/logo.png`} alt="юМаркет Шоп" />
                </Link>
                    <button>Категория</button>
                </div>
                <form className='search' onSubmit={submitHandler}>
                    <input placeholder="Введите для поиска" onChange={searchHandler}  />
                    <button>Поиск</button>
                </form>
                <nav>
                {localStorage.getItem('token') ? (
                <>
                <Link to="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span>Главная</span>
                    </Link>
                    <Link to="/basket">
                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Корзина</span>
                    </Link>
                    <Link className="profnav" to="/profile">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                    <span>Профиль</span>
                    </Link>
                    <Link to="/logout">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Выход</span>
                    </Link>
                </>
                ) : (
                <>
                <Link to="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span>Главная</span>
                    </Link>
                    <Link to="/auth">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    <span>Войти</span>
                </Link>
                        </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
      </>
    )
  }
