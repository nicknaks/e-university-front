import React, {FC} from 'react';
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar/Navbar";

const App: FC = () => {
    return (
        <>
            <Navbar/>
            <AppRouter/>
        </>
    );
};

export default App;