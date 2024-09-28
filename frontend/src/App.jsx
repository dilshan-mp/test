import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";

function App() {
  return (
    <BrowserRouter>
      <main
        className={`dark text-foreground bg-background flex flex-col min-h-[100vh] h-full`}
      >
        <Layout />
      </main>
    </BrowserRouter>
  );
}

export default App;
