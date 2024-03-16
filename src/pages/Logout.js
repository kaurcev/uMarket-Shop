import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  document.title = "Выход";
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/');
  })
  return (
  <>
  </>
  )
}
  