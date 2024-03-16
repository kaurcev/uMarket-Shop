import './stocks.css';
import React from 'react';


export default function StoksPanel() {

    return (
      <>
      <div className='stocks'>
      <div className="cart">
        <div>
            <h2>Пример акции</h2>
            <p>Описание акции</p>
            <p className="mini">ИП Поставщик</p>
        </div>
        <img src="/assets/img/min-logo.png" alt="" />
        </div>
        <div className="cart">
        <div>
            <h2>Пример акции</h2>
            <p>Описание акции</p>
            <p className="mini">ИП Поставщик</p>
        </div>
        <img src="/assets/img/min-logo.png" alt="" />
        </div>
      </div>
      </>
    )
  }
