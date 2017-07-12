import React from 'react';

import DebatePage from './pages/DebatePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

export default ({page}) => {
    let component;
    switch(page) {
        case 'debate': {
            component = <DebatePage/>;
            break;
        }
        case 'profile': {
            component = <ProfilePage/>;
            break
        }
        default: {
            component = <HomePage />;
            break;
        }
    }

    return component;
}