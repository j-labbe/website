import React, { useState, useEffect } from 'react';
import Loader from './loader';
import Head from './head';
import Navigation from './navigation';
import { Helmet } from 'react-helmet';
import Footer from './footer';

if (typeof window !== 'undefined') {
    require('smooth-scroll')('a[href*="#"]');
}

const Layout = ({ children, location }) => {
    const isHome = location.pathname === '/';
    const [isLoading, setIsLoading] = useState(isHome);

    useEffect(() => {
        if (isLoading) return;
        if (location.hash) {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const e = document.getElementById(id);
                if (e) {
                    e.scrollIntoView();
                }
            }, 0);
        }
    }, [isLoading, location]);

    return (
        <div>
            <Helmet bodyAttributes={{ class: !isLoading ? 'loaded' : 'hidden' }} />
            <Head location={location} />
            <div id="root">
                {isLoading && isHome ? (
                    <Loader onFinishLoad={() => setIsLoading(false)} />
                ) : (
                    <div className="generalContainer">
                        <Navigation isHome={isHome} />
                        <div id="content">
                            {children}
                            <Footer />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layout;