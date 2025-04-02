import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const { authUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    { //Header changes based on whether user is logged in or not
                        authUser ?
                            <ul className="header--signedin">
                                <li>Welcome, {`${authUser.firstName} ${authUser.lastName}`}!</li>
                                <li><Link to="SignOut">Sign Out</Link></li>
                            </ul>
                            :
                            <ul className="header--signedout">
                                <li><Link to="SignUp">Sign Up</Link></li>
                                <li><Link to="SignIn">Sign In</Link></li>
                            </ul>
                    }
                </nav>
            </div>
        </header>
    )
};

export default Header;