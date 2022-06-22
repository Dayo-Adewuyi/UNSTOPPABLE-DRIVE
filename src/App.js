import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import Example from "./Pages/Example";
import Shared from "./Pages/Example"
import { ConnectProvider } from "./context/ConnectContext";


export default function App() {
  
  return (
    <ConnectProvider>
    <Router>
     
      
        <Routes>
         
          <Route exact path="/" element={<Home />}></Route>
         
          <Route exact path="/example" element={<Example />}></Route>

          <Route exact path="/shared" element={<Shared />}></Route>
          {/*
          template
          <Route
            exact
            path="/Election-Booth"
            element={<ElectionBooth />}
          ></Route>
          <Route
            exact
            path="/MyElection"
            element={<MyElection />}
          ></Route> */}
        
        </Routes>
     
    </Router>
    </ConnectProvider>
  );
  
}
