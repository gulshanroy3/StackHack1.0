import React, { lazy } from 'react';
import FullLayout from "../Layout/FullLayout"
import EventManagementLayout from "../Layout/EventManagementLayout"
import TaskManagementLayout from "../Layout/TaskManagementLayout"
const EventLogin = lazy(() => import("../pages/EventManagement/Login"))
const EventRegistration = lazy(() => import("../pages/EventManagement/Register"))
const EventAdminDashboard = lazy(() => import("../pages/EventManagement/adminDashboard"))
const TaskLogin = lazy(() => import("../pages/TaskManagement/Login"))
const TaskRegistration = lazy(() => import("../pages/TaskManagement/Register"))
const UserDashboard = lazy(() => import("../pages/TaskManagement/userDashboard"))
const Home = lazy(() => import("../pages/Home"))
export default [
    {
        path: '/event-management/login',
        exact: true,
        component: EventLogin,
        layout: EventManagementLayout
    },
    {
        path: '/event-management/registration',
        exact: true,
        component: EventRegistration,
        layout: EventManagementLayout
    },
    {
        path: '/event-management/admin-dashboard',
        exact: true,
        component: EventAdminDashboard,
        layout: FullLayout
    },
    {
        path: '/task-management/login',
        exact: true,
        component: TaskLogin,
        layout: TaskManagementLayout
    },
    {
        path: '/task-management/registration',
        exact: true,
        component: TaskRegistration,
        layout: TaskManagementLayout
    },
    {
        path: '/task-management/user-dashboard',
        exact: true,
        component: UserDashboard,
        layout: FullLayout
    },
    {
        path: '/home',
        exact: true,
        component: Home,
        layout: FullLayout
    }
];
