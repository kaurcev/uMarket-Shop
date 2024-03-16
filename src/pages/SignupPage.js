import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import serverUrl from "../config";

export default function Signup() {
  document.title = "Автооризация";
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
    SigninRequest();
  };

  function SigninRequest() {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    fetch(`//${serverUrl}/api/User/signup.php?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          console.log(data.data.token);
          localStorage.setItem('token', data.data.token);
          navigate('/auth');
        } else {
         // alert("Не работает");
        }
      })
      .catch(error => {
        alert(`501 ошибка: ${error.message}`);
        console.error(error);
      });
  }

  return (
    <>
    <Header />
    <main className="centered">
      {localStorage.getItem('token') ? (
        <>
          <p>Вы уже авторизированы</p>
          <p><Link className='bt' to="/">Перейти</Link></p>
        </>
      ) : (
        <>
          <form className="login-form" onSubmit={submitHandler}>
            <h2>Регистрация</h2>
            <p>Логин</p>
            <input type="text" value={username} onChange={usernameHandler} />
            <p>Пароль</p>
            <input type="password" value={password} onChange={passwordHandler} />
            <p><button>Зарегистрироваться</button></p>
          </form>
        </>
      )}
    </main>
    <Footer />
    </>

  );
}