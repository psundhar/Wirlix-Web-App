import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DebatePage from './pages/DebatePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ImagePage from './pages/ImagePage';
import RankingsPage from './pages/RankingsPage';
import AboutPage from './pages/AboutPage';
import TutorialPage from './pages/TutorialPage';

const App = ({}) => {
    return (<BrowserRouter>
        <Switch>
            <Route path="/home" component={ HomePage } />
            <Route path="/debate" component={ DebatePage } />
            <Route path="/rankings" component={ RankingsPage } />
            <Route path="/about" component={ AboutPage } />
        </Switch>
    </BrowserRouter>)
};

export default App;
// export default ({page}) => {
//     let component;
//     switch(page) {
//         case 'debate': {
//             component = <DebatePage/>;
//             break;
//         }
//         case 'profile': {
//             component = <ProfilePage/>;
//             break;
//         }
//         case 'image': {
//             component = <ImagePage/>;
//             break;
//         }
//         case 'rankings': {
//             component = <RankingsPage />;
//             break;
//         }
//         case 'about': {
//             component = <AboutPage/>;
//             break;
//         }
//         case 'tutorial': {
//             component = <TutorialPage/>;
//             break;
//         }
//         default: {
//             component = <HomePage />;
//             break;
//         }
//     }
//
//     return component;
// }