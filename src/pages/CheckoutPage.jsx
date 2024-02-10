import { useNavigate } from "react-router";
import "../styles/CheckoutPage.css";
import Product from "../components/Product";
import { useEffect } from "react";

export default function CheckoutPage({ cart, resetCart }) {
  const navigate = useNavigate();

  function onCompleteCheckout() {
    resetCart();
    navigate("/order_complete");
  }

  useEffect(() => {
    console.log(cart);
  }, []);

  return (
    <div className={"CheckoutPage page-container"}>
      <div className={"CheckoutPage content"}>
        <div className={"CheckoutPage cart-container"}>
          {cart.map((p, i) => (
            <Product key={i} product={p} />
          ))}
        </div>
        <form onSubmit={onCompleteCheckout}>
          <div className={"CheckoutPage form"}>
            <div className={"CheckoutPage form-section"}>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="cc">Credit Card # </label>
                <input id="cc" name="cc"></input>
              </div>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="cvc">CVC </label>
                <input id="cvc" name="cvc"></input>
              </div>
            </div>
          </div>
          <div className={"CheckoutPage form"}>
            <div className={"CheckoutPage form-section"}>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="fname">First Name: </label>
                <input id="fname" name="fname"></input>
              </div>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="lname">Last Name: </label>
                <input id="lname" name="lname"></input>
              </div>
            </div>
            <div className={"CheckoutPage form-section"}>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="email">Email: </label>
                <input id="email" name="email"></input>
              </div>
            </div>
            <div className={"CheckoutPage form-section"}>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="address">Address: </label>
                <input id="address" name="address"></input>
              </div>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="state">State: </label>
                <input id="state" name="state"></input>
              </div>
              <div className={"CheckoutPage form-item"}>
                <label htmlFor="zipcode">Zipcode: </label>
                <input id="zipcode" name="zipcode"></input>
              </div>
            </div>
          </div>
          <div className={"CheckoutPage form-section-button"}>
            <input
              className={"CheckoutPage form-submit"}
              type="submit"
              value="Buy Now"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
