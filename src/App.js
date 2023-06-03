import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharactersTable from "./Components/CharactersTable";
import Details from "./Components/Details";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharactersTable />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
