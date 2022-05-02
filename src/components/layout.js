import React, { useState, useEffect } from 'react';
import Loader from './loader';
import Navigation from './navigation';
import { Helmet } from 'react-helmet';
import Footer from './footer';
import Seo from './Seo';

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
                    const yOffset = -160;
                    const y = e.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 0);
        }
    }, [isLoading, location]);

    const hash = location.hash && location.hash.length > 0 ? location.hash.substring(1).charAt(0).toUpperCase() + location.hash.slice(2) : '';

    return (
        <div>
            <Helmet bodyAttributes={{ class: !isLoading ? 'loaded' : 'hidden' }} />
            <Seo title={`Jack Labbe${(hash ? ` - ${hash}` : ``)}`} />
            <div id="root">
                {isLoading ? (
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