import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../css/cart.css";
import {
  addBasket,
  deleteFromCart,
  increaseBasket,
  removeFromCart,
} from "../redux/addBasketSlice";
import { useState, useEffect } from "react";

function Cart(props: any) {
  const [message, setMessage] = useState("");
  const [basketEmpty, setBasketEmpty] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Bu ürünü sepetten çıkarmak istediğinize emin misiniz?"
    );
    if (confirmed) {
      props.deleteFromCart(id);
      setMessage("Ürün başarıyla silindi!");
      setTimeout(() => setMessage("İşlem başarılı..."), 3000);
    }
  };

  const cartItems = Array.isArray(props.cart) ? props.cart : [];

  // Sepet toplam fiyatı
  const totalPrice = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setBasketEmpty(cartItems.length === 0);
  }, [cartItems]);

  return (
    <div className="app">
      <h2 className="baslik">
        <Link style={{ marginLeft: 50 }} to="/">
          Kitap Listesine Geri Dön
        </Link>
      </h2>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="cart-list-div">
          {cartItems.length > 0
            ? cartItems.map((book: any, index: number) => (
                <div className="book" key={`${book.id}-${index}`}>
                  <img
                    style={{
                      width: "25%",
                      height: "100%",
                      marginRight: 100,
                    }}
                    src={book.image}
                    alt={book.name}
                  />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h4>{book.name}</h4>
                    <p>Yazar: {book.author}</p>
                    <p>Adet Fiyatı: &#8378;{book.price}</p>
                    <p>Adet: {book.quantity}</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "5%",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "8%",
                          height: 20,
                          fontWeight: 600,
                          marginRight: 15,
                          fontSize: 13,
                        }}
                        onClick={() => props.removeFromCart(book.id)}
                      >
                        Azalt
                      </button>
                      <button
                        style={{
                          width: "8%",
                          height: 20,
                          fontWeight: 600,

                          fontSize: 13,
                        }}
                        onClick={() => props.increaseBasket(book.id)}
                      >
                        Arttır
                      </button>
                    </div>

                    <button
                      style={{ width: "18%", height: 25, marginTop: 15 }}
                      onClick={() => handleDelete(book.id)}
                    >
                      Sepetten Çıkar
                    </button>
                  </div>
                </div>
              ))
            : console.log("empty cart")}
        </div>

        <div className="basket-div">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 10,
              fontSize: 17,
              fontWeight: "bold",
              border: "2px solid gray",
              borderRadius: 3,
            }}
          >
            SEPET BİLGİSİ
          </div>

          {/* Sepet boş değilse toplam miktar ve fiyat bilgilerini göster */}
          {!basketEmpty ? (
            <div
              style={{
                paddingTop: 40,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontWeight: 400 }}>
                Toplam Ürün Sayısı:{" "}
                {cartItems.reduce(
                  (acc: number, item: any) => acc + item.quantity,
                  0
                )}
              </p>
              <p style={{ fontWeight: "bold" }}>
                Toplam Fiyat: &#8378;{totalPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Sepetinizde ürün yok
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    cart: state.addBasket.cart,
  };
};

const mapDispatchToProps = {
  removeFromCart,
  addBasket,
  deleteFromCart,
  increaseBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
