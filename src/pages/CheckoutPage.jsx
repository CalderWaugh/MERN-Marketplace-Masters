import { useNavigate } from "react-router";
import "../styles/CheckoutPage.css";

export default function CheckoutPage({resetCart}) {
    const navigate = useNavigate();

    function onCompleteCheckout() {
        resetCart();
        navigate("/order_complete")
    }

  return (
    <div>
      <form className={"CheckoutPage form"} onSubmit={onCompleteCheckout}>
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
        <div className={"CheckoutPage form-section-button"}>
          <input className={"CheckoutPage form-submit"} type="submit" value="Buy Now" />
        </div>
      </form>
    </div>
  );
}
