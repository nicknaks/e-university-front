import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {AllRoutes} from "./router";

const AppRouter: FC = () => {

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