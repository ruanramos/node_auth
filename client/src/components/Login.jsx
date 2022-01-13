import { useState } from 'react';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      return;
    }
    setPassword(e.target.value);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await fetch('http://localhost:4001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
      mode: 'cors'
    });

    console.log(res);
    if (res.body.token) {
      setToken(res.body.token);
    }
    console.log(token)

  }

  return (
    <><h1>Login Page</h1>
      <form className="App-form" onSubmit={handleSubmit}>

        <label htmlFor="email">Email: </label>
        <input id="name" value={email} name="email" className="inputBox" type="email" onChange={handleChange}></input>
        <br></br>
        <label htmlFor="password">Password: </label>
        <input id="password" value={password} name="password" className="inputBox" type="password" onChange={handleChange}></input>
        <br></br>
        <button type="submit" value="Submit" >Login!</button>
      </form>
    </>
  )
}