// import React from "react"
// import ReactDOM from "react-dom/client"
// import { BrowserRouter } from "react-router-dom"
// import "./index.css"
// import App from "./App"

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// )
import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.jsx"

import "./index.css"

import { BrowserRouter } from "react-router-dom"

import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#0f172a",
            color: "#fff",
          },
        }}
      />

    </BrowserRouter>

  </React.StrictMode>
)