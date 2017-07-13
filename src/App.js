import React from 'react';

import DebatePage from './pages/DebatePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ImagePage from './pages/ImagePage';

export default ({page}) => {
    let component;
    switch(page) {
        case 'debate': {
            component = <DebatePage/>;
            break;
        }
        case 'profile': {
            component = <ProfilePage/>;
            break;
        }
        case 'image': {
            component = <ImagePage/>;
            break;
        }
        default: {
            component = <HomePage />;
            break;
        }
    }

    return component;
}