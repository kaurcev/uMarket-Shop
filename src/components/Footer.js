import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";
import serverUrl from '../config';
import './footer.css';

export default function Footer() {
    return (
      <>
    <footer>
        <div className='footer'>
            <div className='fpanel main'>
            <div className='logo'>
            <img className='logo' src={`//${serverUrl}/img/logo.png`} alt="юМаркет Шоп" />
            </div>
            <div className='border'>
            <div className='qrcode'>
              <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value="Этой ссылкой поделились :) Огромное спасибо"
              viewBox={`0 0 256 256`}
              />
            </div>
            <p>Поделитесь страницей</p>
            <div className='logo'>
            <img className='logo' src={`//${serverUrl}/img/logo.png`} alt="юМаркет Шоп" />
            </div>
            </div>
            <p className='mini'>юМаркет Шоп | info@umarketshop.site</p>
            </div>
            <div className='fpanel'>
              <h4>юМаркет Шоп</h4>
              <Link to='/privacy'>Политика конфиденциальности</Link>
              <Link to='/terms'>Правила использования</Link>
              <Link to='/start'>Стать поставщиком</Link>
            </div>
        </div>
    </footer>
      </>
    )
  }
  