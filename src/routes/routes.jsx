import { createBrowserRouter, RouterProvider } from "react-router";
import { Suspense, lazy } from "react";
const AuthenticationPage = lazy(() => import("../pages/AuthenticationPage/Authentication"));
const LeaderBoard = lazy(() => import("../pages/LeaderBoard/LeaderBoard"));
const TasksPage = lazy(() => import("../pages/TasksPage/TasksPage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const LandingPage = lazy(() => import("../pages/Landing/Landing"));
const BoardLayout = lazy(() => import("../layouts/BoardLayout"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));
const ProtectedRoute = lazy(() => import("../layouts/ProtectedRoute"));
const GuestRoute = lazy(() => import("../layouts/GuestRoute"));
const Boards = lazy(() => import("../pages/Boards/Boards"));

const AppRoutes = () => {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                </Suspense>
            ),
            children: [
                {
                    index: true,
                    element: <Suspense fallback={<div>Loading...</div>}><LandingPage /></Suspense>,
                },
                {
                    path: 'createdboardsPage',
                    element: <Suspense fallback={<div>Loading...</div>}><Boards /></Suspense>
                },
                {
                    path: 'involvedboardsPage',
                    element: <Suspense fallback={<div>Loading...</div>}><Boards /></Suspense>
                },
                {
                    element: <Suspense fallback={<div>Loading...</div>}><BoardLayout /></Suspense>,
                    path: ":id",
                    children: [
                        {
                            path: "tasks",
                            element: <Suspense fallback={<div>Loading...</div>}><TasksPage /></Suspense>,
                        },
                        {
                            path: "leader-board",
                            element: <Suspense fallback={<div>Loading...</div>}><LeaderBoard /></Suspense>,
                        },
                        {
                            path: "dashboard",
                            element: <Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>,
                        },
                    ],
                },
            ],
        },
        {
            element: <Suspense fallback={<div>Loading...</div>}><GuestRoute /></Suspense>,
            children: [
                {
                    index: true,
                    path: "/login",
                    element: <Suspense fallback={<div>Loading...</div>}><AuthenticationPage type="login" /></Suspense>,
                },
                {
                    path: "/register",
                    element: <Suspense fallback={<div>Loading...</div>}><AuthenticationPage type="register" /></Suspense>,
                },
                {
                    path: "/forget-password",
                    element: <Suspense fallback={<div>Loading...</div>}><AuthenticationPage type="forgetPassword" /></Suspense>,
                },
            ],
        },
    ]);

    return <RouterProvider router={routes} />;
};

export default AppRoutes;
