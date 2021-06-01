import { useEffect, useState } from 'react';

export default () => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        // you can debug local storage in chome console via Application > Storage > Local Storage > your webapp
        const localStorageTheme = window.localStorage.getItem('theme');
        setTheme(localStorageTheme || 'light');
        return () => {};
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            window.localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            window.localStorage.setItem('theme', 'light');
        }
    };
    return [theme, toggleTheme];
};
