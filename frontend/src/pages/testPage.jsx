import React from "react";

const TestPage = ({ message = "Something went wrong" }) => {
  return <div data-testid="message-container">{message}</div>;
};

export default TestPage;
