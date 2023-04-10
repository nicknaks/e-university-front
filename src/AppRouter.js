import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Groups from "./pages/Groups";

const AppRouter = () => {
    const AllRoutes = [
        {path: "/", component: <Main/>},
        {path: "/groups", component: <Groups/>},
    ]
    return (
        <Routes>
            {
                AllRoutes.map((route, index) =>
                    <Route key={index} path={route.path} element={route.component}/>
                )
            }
        </Routes>);
};

export default AppRouter;