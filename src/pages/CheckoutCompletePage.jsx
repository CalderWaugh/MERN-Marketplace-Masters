import "../styles/CheckoutComplete.css";

export default function CheckoutCompletePage() {
  return (
    <div className={"CheckoutComplete content"}>
      <div className={"CheckoutComplete header-container"}>
        <p>Order Placed</p>
      </div>
      <div>
        <a href="/">Exit</a>
      </div>
    </div>
  );
}
