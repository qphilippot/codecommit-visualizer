import HomePage from '../pages/HomePage';
import PageNotFound from '../pages/PageNotFound';
import ListingPullRequestPage from '../pages/ListingPullRequestPage';
import ReviewingPullRequestPage from '../pages/ReviewingPullRequestPage';

export const HOME_PAGE_PATH = '/';
export const NOT_FOUND_PAGE_PATH = '*';
export const LISTING_PULL_REQUEST_PAGE_PATH = '/pull-request';
export const REVIEWING_PULL_REQUEST_PAGE_PATH = '/pull-request/:id';


export default [
    {
        path: HOME_PAGE_PATH,
        element: <HomePage/>
    },
    {
        path: LISTING_PULL_REQUEST_PAGE_PATH,
        element: <ListingPullRequestPage/>
    },
    {
        path: REVIEWING_PULL_REQUEST_PAGE_PATH,
        element: <ReviewingPullRequestPage/>
    },
    {
        path: NOT_FOUND_PAGE_PATH,
        element: <PageNotFound/>
    }
]
