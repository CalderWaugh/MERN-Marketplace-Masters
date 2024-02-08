import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchResultsPage() {
    const location = useLocation();
    const { pathname } = location;
    const [searchResult, setSearchResult] = useState({id: 1, name: "Umbrella V1"})

    async function getSearchResults() {
        let url = "http://localhost:3000"
        let search_param = pathname.split("/")[2]
        let data = {product: search_param}
        let res = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        let search_res = await res.json()
        setSearchResult(search_res)
    }

    useEffect(() => {
        // getSearchResults()
    }, [])

    return (
        <>
            <p>Search Results</p>
            {searchResult ? (
                <>
                    <div>{searchResult.name}</div>
                </>
            ) : (
                <>
                    <p>No result</p>
                </>
            )}
        </>
    )
}