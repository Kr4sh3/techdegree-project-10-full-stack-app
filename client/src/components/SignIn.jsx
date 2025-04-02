import { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const SignIn = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const emailAddress = useRef(null);
    const password = useRef(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        //From stores page user was last going to if being redirected from PrivateRoute
        let from = '/';
        if (location.state) {
            from = location.state.from;
        }
        //Build credentials object
        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }
        //Error Handling
        if (!emailAddress.current.value || !password.current.value) {
            setErrors(["Please provide an email and password"]);
            return;
        }
        //Attempt signin, and redirect to original route or home page on success, otherwise notify user of unsuccessful attempt
        const user = await actions.signIn(credentials);
        if (user !== null) {
            if (user instanceof Error)
                navigate("/error")
            else
                navigate(from);
        } else if (user === null) {
            setErrors(["Sign-in was unsuccessful"]);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} placeholder="Email" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} placeholder="Password" />
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/SignUp">sign up</Link>!</p>
            </div>
        </main>
    )
};

export default SignIn;