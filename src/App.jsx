import { useState, useEffect } from 'react'
import Login from './Login';
import Register from './Register';
import Reservations from './Reservations'; 
import { Link, Routes, Route, useLocation } from 'react-router-dom';


function App() {
  const [auth, setAuth] = useState({});
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(()=> {
    if(window.localStorage.getItem('token')){
      attemptLoginWithToken();
    }
  }, []);

  useEffect(()=> {
    if(auth.id){
      console.log('user loggedin? here you can make api calls for that user');
    }
    else {
      console.log('user is not logged in');
    }
  }, [auth]);

  const attemptLoginWithToken = async()=> {
    const token = window.localStorage.getItem('token');
    const response = await fetch(
      'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me',
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
    const json = await response.json();
    if(response.ok){
      setAuth(json);
    }
  };

  const login = async(credentials)=> {
    const response = await fetch(
      'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    );
    const json = await response.json();
    if(response.ok){
      window.localStorage.setItem('token', json.token);
      attemptLoginWithToken();
    }
    else {
      throw json.message;
    }
  }

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const register = async(credentials)=> {
    const response = await fetch(
      'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    );
    const json = await response.json();
    if(response.ok){
      window.localStorage.setItem('token', json.token);
      attemptLoginWithToken();
    }
    else {
      throw json.message;
    }
  }

  return (
    <>
      <h1>Auth Book Buddy</h1>
      {
        auth.id ? <button onClick={ logout }>Welcome { auth.firstname } { auth.email } (Click to Logout)</button> : <><Login login={ login }/><Register register={ register }/></>
      }
      {
        auth.id ? (
          <nav>
            <Link to='/' className={ pathname === '/'? 'selected': ''}>Home</Link>
            <Link to='/reservations' className={ pathname === '/reservations' ? 'selected': ''}>Reservations</Link>
          </nav>
        ): null
      }

      <Routes>
        {
          !!auth.id && (
            <Route path='/reservations' element={<Reservations />} />
          )
        }
      </Routes>
    </>
  )
}

export default App
