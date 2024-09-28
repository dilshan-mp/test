import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-2xl flex flex-col flex-1 p-10 z-10">
      {children}
    </div>
  );
};

export default Container;
