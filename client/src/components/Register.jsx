import { useState } from 'react';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            return;
        }

        if (e.target.name === 'password') {
            setPassword(e.target.value);
            return;
        }

        if (e.target.name === 'firstName') {
            setFirstname(e.target.value);
            return;
        }

        if (e.target.name === 'lastName') {
            setLastName(e.target.value);
            return;
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const res = await fetch('http://localhost:4001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName
            }),
            mode: 'cors'
        });

        console.log(res);
        // if (res.body.token) {
        //     setToken(res.body.token);
        // }
        // console.log(token)

    }

    return (
        <>
            <h1>Register Page</h1>
            <form className="App-form" onSubmit={handleSubmit}>

                <label htmlFor="firstName">First name: </label>
                <input id="firstName" value={firstName} name="firstName" className="inputBox" type="text" onChange={handleChange}></input>
                <br></br>
                <label htmlFor="lastName">Last name: </label>
                <input id="lastName" value={lastName} name="lastName" className="inputBox" type="text" onChange={handleChange}></input>
                <br></br>

                <label htmlFor="email">Email: </label>
                <input id="name" value={email} name="email" className="inputBox" type="email" onChange={handleChange}></input>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input id="password" value={password} name="password" className="inputBox" type="password" onChange={handleChange}></input>
                <br></br>
                <button type="submit" value="Submit" >Register</button>
            </form>
        </>
    )
}