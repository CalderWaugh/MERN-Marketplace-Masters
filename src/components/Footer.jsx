import "../styles/Footer.css"

export default function Footer() {
  return (
    <>
      <div className={"Footer footer"}>
        <p className={"Footer text"}>&copy; {new Date().getFullYear()}, MERN Marketplace Masters</p>
      </div>
    </>
  );
}
