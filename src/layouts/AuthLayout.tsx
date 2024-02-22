import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme: any) => ({
    container: {
        display: 'flex',
        height: '100vh',
        width: '100%',
    },
    outletSection: {
        flex: '7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSection: {
        flex: '13',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

export function AuthLayout() {
    const classes = useStyles();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={classes.container}>
            <section className={classes.outletSection}>
                <Outlet />
            </section>
            {windowWidth > 1280 ? (
                <section className={classes.imageSection}>
                    <img
                        src="../../public/assets/32.v1-minimal-view-wallpaper-pc-hd.png"
                        alt="logo"
                        className={classes.image}
                    />
                </section>
            ) : null}
        </div>
    );
}
