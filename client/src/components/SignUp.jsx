import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';
import axios from "axios";

const SignIn = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    // State
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Build User Object
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        //Post user object, signing them in if successful, and showing errors is unsuccessful
        try {
            const response = await axios.post("http://localhost:5000/api/users", user);
            if (response.status === 201) {
                console.log(`${user.firstName} is sucessfully signed up and authenticated!`);
                await actions.signIn(user);
                navigate("/");
            }
        } catch (error) {
            if (!error.response) //No error.response will be returned on server error, so we navigate to error page when that happens
                navigate("/error");
            else {
                setErrors(error.response.data.errors);
            }

        }

    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="First Name" ref={firstName} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Last Name" ref={lastName} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" placeholder="Email" ref={emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Password" ref={password} />
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/SignIn">sign in</Link>!</p>
            </div>
        </main>
    );
}

export default SignIn;