import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// routing
const Users = Loadable(lazy(() => import('views/UserList/UserList')));
const OfferUsers = Loadable(lazy(() => import('views/UtilizedOffers/OfferUserList')));
const Version = Loadable(lazy(() => import('views/Version/Index')));
const Offers = Loadable(lazy(() => import('views/Offers/Index')))
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard1/index')));
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/account-setting',
            element: <AccountProfile />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/offer-users',
            element: <OfferUsers />
        },
        {
            path: '/offers',
            element: <Offers />
        },
        {
            path: '/version',
            element: <Version />
        }
    ]
};

export default AdminRoutes;
