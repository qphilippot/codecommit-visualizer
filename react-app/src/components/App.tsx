import React from 'react';

import './App.css';
import {RouterProvider} from 'react-router-dom';
import Sidebar from "./Sidebar/Sidebar";
import HomePage from '../pages/HomePage';
import PageNotFound from '../pages/PageNotFound';
import { Router } from '../routes/index.ts';

function App() {
    return (
        <RouterProvider router={Router}/>
    );
}

export default App;
