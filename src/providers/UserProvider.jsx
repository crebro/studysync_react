import React, { useState, useEffect, createContext } from "react";
import axios from 'axios'

export const UserContext = createContext({});

function UserProvider(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
                setLoading(false);
            }).catch(error => {
                setUser(null);
                setLoading(false);
            });
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    return (
        <>
            <UserContext.Provider value={{ user: user, setUser: setUser, loading: loading }}>
                {loading ? <div>Loading</div> : props.children}
            </UserContext.Provider>
        </>
    )
}

export default UserProvider;
