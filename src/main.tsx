import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/Store.tsx";
import { BrowserRouter } from "react-router-dom";

console.log("Initial Redux Store State:", store.getState()); // Store'un başlangıç durumunu logla

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
