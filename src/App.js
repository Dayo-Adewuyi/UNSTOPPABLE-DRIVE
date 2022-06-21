import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import Example from "./Pages/Example";


export default function App() {
  
  return (
    <Router>
     
      
        <Routes>
         
          <Route exact path="/" element={<Home />}></Route>
         
          <Route exact path="/example" element={<Example />}></Route>
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
  );
  
}
