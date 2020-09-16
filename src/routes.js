import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardPage = React.lazy(()=> import('./pages/Dashboard/dashboard'));
const Article_Dashboard = React.lazy(()=> import('./pages/Article/Article_Dashboard'));
const Article_Create = React.lazy(()=> import('./pages/Article/Article_Create'));
const Article_Detail = React.lazy(()=> import('./pages/Article/Article_Detail'));
const Travel_Dashboard = React.lazy(()=> import('./pages/Travel/Travel_Dashboard'));
const Travel_Create = React.lazy(()=> import('./pages/Travel/Travel_Create'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardPage },
    { path: '/article', exact: true, name: 'Article', component: Article_Dashboard },
    { path: '/article/create', exact: true, name: 'Article_Create', component: Article_Create },
    { path: '/article/detail', exact: true, name: 'Article_Detail', component: Article_Detail },
    { path: '/travel', exact: true, name: 'Travel', component: Travel_Dashboard },
    { path: '/travel/create', exact: true, name: 'Travel_Create', component: Travel_Create },
];

export default routes;