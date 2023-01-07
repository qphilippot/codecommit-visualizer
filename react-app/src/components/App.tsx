import React from 'react';
import logo from '../logo.svg';
import './App.css';

import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar
        currentRoute="route.name"
        width={280}
        ></Sidebar>

        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit 888<code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    </div>
  );
}

export default App;
