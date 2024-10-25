import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Book } from "../data";
import "../App.css";
import { addBasket } from "../redux/addBasketSlice";
import { useState } from "react";

function Product(props: any) {
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const { bookList = [] } = props;

  const increaseQuantity = (id: number) => {
    setQuantities({
      ...quantities,
      [id]: (quantities[id] || 1) + 1,
    });
  };

  const decreaseQuantity = (id: number) => {
    setQuantities({
      ...quantities,
      [id]: quantities[id] > 1 ? quantities[id] - 1 : 1,
    });
  };

  return (
    <div>
      <h2 className="product-h2">
        <span style={{ marginLeft: 50 }}>Kitap Listesi</span>
        <Link style={{ marginRight: 70 }} to="/cart">
          Sepete Git
        </Link>
      </h2>
      {bookList.map((book: Book) => (
        <div className="book" key={book.id}>
          <img
            src={book.image}
            alt={book.name}
            style={{
              height: 400,
              width: 240,
              marginBottom: 10,
              marginLeft: 10,
              borderRadius: 20,
              marginRight: 40,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
          <div className="product-div">
            <h4> Kitap Adı: {book.name}</h4>
            <p>Yazar: {book.author}</p>
            <p>Fiyat: &#8378; {book.price}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => decreaseQuantity(book.id)}>-</button>
              <span>{quantities[book.id] || 1}</span>
              <button onClick={() => increaseQuantity(book.id)}>+</button>
            </div>
          </div>
          <button
            className="product-button"
            onClick={() =>
              props.addBasket({ ...book, quantity: quantities[book.id] || 1 })
            } // Burada quantity bilgisini geçiyoruz
          >
            Sepete Ekle
          </button>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    bookList: state.addBasket.bookList,
    cart: state.addBasket.cart,
  };
};

const mapActionsToProps = { addBasket };

export default connect(mapStateToProps, mapActionsToProps)(Product);
