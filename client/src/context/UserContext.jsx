import { createContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    const signIn = async (credentials) => {
        if (!credentials)
            return;
        //Encode credentials in base64
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
        //Build Header
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Basic ${encodedCredentials}`
            }
        }
        //Attempt authentication, returning null if failed, and a user object if successful
        try {
            const res = await axios.get('http://localhost:5000/api/users', options)
            if (res.status === 200) {
                const user = res.data;
                user.encodedCredentials = encodedCredentials;
                setAuthUser(user);
                Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
                return user;
            }
        } catch (err) {
            if (err.code === "ERR_NETWORK")
                return new Error("Network Error");
            return null;
        }
    }

    const signOut = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
    }

    return (
        <UserContext.Provider value={{
            authUser,
            actions:
            {
                signIn,
                signOut
            }
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;