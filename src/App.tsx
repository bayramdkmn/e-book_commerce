import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="app">
      <h1 className="app-h1">
        <div style={{ marginLeft: 30, fontFamily: "Arial" }}>
          Alışveriş Sepeti Uygulaması
        </div>
        <img
          src="https://avatars3.githubusercontent.com/u/60869810?v=4"
          style={{ width: 30, marginRight: 30 }}
        />
      </h1>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
