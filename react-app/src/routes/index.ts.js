import {createBrowserRouter} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PageNotFound from '../pages/PageNotFound';
import ListingPullRequestPage from '../pages/ListingPullRequestPage';
import ReviewingPullRequestPage from '../pages/ReviewingPullRequestPage';
import MainLayout from '../pages/MainLayout';


import DashboardRouter from './DashboardRouter'

const RootRouter = {
    path: '/',
    element: <MainLayout/>,
    children: DashboardRouter
};



export const Router = createBrowserRouter([ RootRouter ]);
