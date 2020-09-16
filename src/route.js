import React from 'react';

const SignUp = React.lazy(() => import('./auth/SignUp'));
const SignIn = React.lazy(() => import('./auth/SignIn'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp },
    { path: '/auth/signin', exact: true, name: 'Signin', component: SignIn }
];

export default route;