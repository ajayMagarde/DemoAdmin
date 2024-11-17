import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));
const AuthForgotPassword1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/ForgotPassword1')));
const AuthCheckMail1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/CheckMail1')));
const AuthResetPassword1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/ResetPassword1')));
const AuthCodeVerification1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/CodeVerification1')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '*',
            element: <AuthLogin />
        },
        {
            path: '/forgot-password',
            element: <AuthForgotPassword1 />
        },
        {
            path: '/check-mail',
            element: <AuthCheckMail1 />
        },
        {
            path: '/reset-password',
            element: <AuthResetPassword1 />
        },
        {
            path: '/code-verification',
            element: <AuthCodeVerification1 />
        }
    ]
};

export default LoginRoutes;
