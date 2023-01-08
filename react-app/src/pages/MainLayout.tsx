import SideBar from '../components/Sidebar/Sidebar';
import {Outlet, useLocation  } from 'react-router-dom';
import { HOME_PAGE_PATH, LISTING_PULL_REQUEST_PAGE_PATH } from '../routes/DashboardRouter';

const routing = [
    {
        route: HOME_PAGE_PATH,
        icon: <i className="fa-solid fa-book-bookmark"></i>,
        text: 'Repositories'
    },

    {
        route: LISTING_PULL_REQUEST_PAGE_PATH,
        icon: <i className="fa-solid fa-code-pull-request"></i>,
        text: 'Pull Request'
    }
];


function MainLayout() {
    const location = useLocation();
    return (
        <div className="App">
            <SideBar
                currentRoute={location.pathname}
                width={280}
                routing={routing}
            />

            <Outlet/>
        </div>
    );
}

export default MainLayout;
