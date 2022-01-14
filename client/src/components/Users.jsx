import { useState, useEffect } from 'react';

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = () => {
            fetch('http://localhost:4001/users', {
                method: 'GET',
                mode: 'cors',
                headers: { 'x-access-token': sessionStorage.getItem('token') }
            })
                .then(res => res.json())
                .then(users => setUsers(users));
        }
        const a = fetchUsers();
        console.log(a);

    }, [])

    return (
        <>
            <h1>Registered Users</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                {users.map((user) => {
                    return (
                        <tr>
                            <td>{user['first_name']} {user['last_name']}</td>
                            <td>{user['email']}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

export default Users;