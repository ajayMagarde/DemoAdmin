import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';
import NavMotion from 'layout/NavMotion';
import GuestGuard from 'utils/route-guard/GuestGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';
import AdminRoutes from './AdminRoutes';

const LoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        {
            path: '/',
            element: (
                <NavMotion>
                    <AuthGuard>
                        <LoginPage />
                    </AuthGuard>
                </NavMotion>
            )
        },
        LoginRoutes,
        AdminRoutes
    ]);
}
