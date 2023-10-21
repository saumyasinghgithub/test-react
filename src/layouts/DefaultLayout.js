import React from "react";
import { Header } from "../components";

const DefaultLayout = ({ children }) => {  
  return (
    <div className="container-fluid"> 
    <Header /> 
    </div>
  );
};

export default DefaultLayout;