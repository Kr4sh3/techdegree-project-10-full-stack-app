import React from 'react';

const Header = () => (
    <header>
        <div class="wrap header--flex">
            <h1 class="header--logo"><a href="index.html">Courses</a></h1>
            <nav>
                <ul class="header--signedin">
                    <li>Welcome, Joe Smith!</li>
                    <li><a href="sign-out.html">Sign Out</a></li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;