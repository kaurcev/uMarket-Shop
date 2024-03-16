import './stocks.css';
import React, { useState, useEffect } from 'react';
import serverUrl from "../config";
import { useNavigate, useLocation } from 'react-router-dom';


export default function RewsPanel() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productid = searchParams.get('id');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`//${serverUrl}/api/rews/info.php?id=${productid}`);
            const jsonData = await response.json();
            setData(jsonData.data);
            window.scrollTo(0, 0)
            setData(jsonData.data);
        } catch (error) { console.log(error);} finally { setLoading(false);}
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей

    return (
      <>
      {loading ? (
        <></>
      ) : (
        <div className="rev">
        {
        data.map((item) => (
        <div className='body'>
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
        </div>))}
        </div>
      )}
      </>
    )
  }
