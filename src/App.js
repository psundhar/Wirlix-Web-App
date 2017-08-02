import React from 'react';

import DebatePage from './pages/DebatePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ImagePage from './pages/ImagePage';
import RankingsPage from './pages/RankingsPage';
import AboutPage from './pages/AboutPage';
import TutorialPage from './pages/TutorialPage';

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
        case 'rankings': {
            component = <RankingsPage />;
            break;
        }
        case 'about': {
            component = <AboutPage/>;
            break;
        }
        case 'tutorial': {
            component = <TutorialPage/>;
            break;
        }
        default: {
            component = <HomePage />;
            break;
        }
    }

    return component;
}