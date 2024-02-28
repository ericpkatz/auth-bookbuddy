import { useState } from 'react'

function Register({ register }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      await register({
        email,
        password,
        firstName,
        lastName
      });
    }
    catch(ex){
      setError(ex);
    }
  }
  return (
    <form onSubmit={ submit }>
      { error }
      <input placeholder='first name' value={ firstName } onChange={ ev => setFirstName(ev.target.value)}/>
      <input placeholder='last name' value={ lastName } onChange={ ev => setLastName(ev.target.value)}/>
      <input placeholder='email' value={ email } onChange={ ev => setEmail(ev.target.value)}/>
      <input placeholder='password' value={ password } onChange={ ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  )
}

export default Register
