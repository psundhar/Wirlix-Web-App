import React from 'react';

import DebatePage from './pages/DebatePage';
import HomePage from './pages/HomePage';

export default ({page}) => {
    let component;
    switch(page) {
        case 'debate': {
            component = <DebatePage/>;
            break;
        }
        default: {
            component = <HomePage />;
            break;
        }
    }

    return component;
}