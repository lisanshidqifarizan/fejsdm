import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;