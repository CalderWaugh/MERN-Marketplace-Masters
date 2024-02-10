import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import "../styles/SearchResultsPage.css";

const prod_per_page = 30;

export default function SearchResultsPage() {
  const location = useLocation();
  const { pathname } = location;
  const [searchResults, setSearchResults] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const changePageNumber = (e) => {
    let new_page = e.target.value;
    setPageNumber(new_page);
  };

  const getDisplayedProducts = () => {
    let end = prod_per_page * pageNumber;
    let dp = searchResults.slice(prod_per_page * (pageNumber - 1), end);
    console.log(`dp ${dp}`);
    setDisplayedProducts(dp);
  };

  async function getSearchResults() {
    let url = "/api/product/search";
    let vars = pathname.split("/");
    let dur = vars[2];
    let size = vars[3];
    let data = { dur: dur, size: size, name: name };
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let search_res = await res.json();
    await setSearchResults(search_res);
    let max = Math.floor(searchResults.length / prod_per_page);
    await setMaxPage(max);
    console.log(maxPage);
    console.log(max);
    console.log(searchResults);
  }

  useEffect(() => {
    getSearchResults();
  }, []);

  useEffect(() => {
    getDisplayedProducts();
  }, [searchResults, pageNumber]);

  return (
    <>
      <div className={"SearchResultsPage products-container"}>
        <div className={"SearchResultsPage header"}>
          <h1>Search Results</h1>
        </div>
        {displayedProducts.map((r, i) => {
          return <Product key={i} product={r} />;
        })}
        <div className={"SearchResultsPage page-container"}>
          <input
            type="number"
            id="page-number"
            name="page-number"
            min="1"
            max={maxPage}
            value={pageNumber}
            onChange={changePageNumber}
          />
        </div>
      </div>
    </>
  );
}
