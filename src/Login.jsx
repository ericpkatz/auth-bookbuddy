import { useState } from 'react'

function Login({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      await login({
        email,
        password
      });
    }
    catch(ex){
      setError(ex);
    }
  }
  return (
    <form onSubmit={ submit }>
      { error }
      <input value={ email } onChange={ ev => setEmail(ev.target.value)}/>
      <input value={ password } onChange={ ev => setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
  )
}

export default Login
