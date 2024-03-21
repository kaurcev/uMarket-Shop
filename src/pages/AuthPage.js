import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import serverUrl from "../config";
import auth from '../img/auth.png'

export default function AuthPage() {
  document.title = "Авторизация";
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginRequest();
  };
  function loginRequest() {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    fetch(`//${serverUrl}/api/user/login.php?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          console.log(data.data.token);
          localStorage.setItem('token', data.data.token);
          navigate('/');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

    return (
      <>
      <main className="centered">
        {localStorage.getItem('token') ? (
          <>
            <img src={auth} alt="Картинка авторизации" />
            <p>Вы уже авторизированы</p>
            <p><Link className='bt' to="/main">Перейти</Link></p>
          </>
        ) : (
          <>
            
            <form className="login-form" onSubmit={submitHandler}>
              <h2>Авторизация</h2>
              <p className='mini'>Логин</p>
              <input type="text" value={username} onChange={usernameHandler} />
              <p className='mini'>Пароль</p>
              <input type="password" value={password} onChange={passwordHandler} />
              <p><button>Войти</button></p>
              <p className='center'><Link to='/signup'>Ещё нет аккаунта</Link></p>
            </form>
          </>
        )}
        </main>
       <Footer />
      </>
    )
  }
  