import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        if (data.data.status) {
          alert("Теперь вы можете авторизироваться");
          navigate('/auth');
        } else {
          alert("Не работает");
        }
      })
      .catch(error => {
        alert(`501 ошибка: ${error.message}`);
        console.error(error);
      });
  }

  return (
    <>
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
            <p  className='mini'>Логин</p>
            <input type="text" value={username} onChange={usernameHandler} />
            <p className='mini'>Пароль</p>
            <input type="password" value={password} onChange={passwordHandler} />
            <p><button>Зарегистрироваться</button></p>
            <p className='center'><Link to='/auth'>Уже есть аккаунт?</Link></p>
          </form>
        </>
      )}
    </main>
    <Footer />
    </>

  );
}