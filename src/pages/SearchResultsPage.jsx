import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function SearchResultsPage() {
    const location = useLocation();
    const { pathname } = location;
    const [searchResult, setSearchResult] = useState({})

    async function getSearchResults() {
        let url = ""
        let search_param = pathname.split("/")[1]
        let res = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
        let search_res = await res.json()
        setSearchResult(search_res)
    }

    useEffect(() => {
        getSearchResults()
    }, [])

    return (
        <>
            <p>Search Results</p>
            {searchResult ? (
                <>
                    <div>{searchResult}</div>
                </>
            ) : (
                <>
                    <p>No result</p>
                </>
            )}
        </>
    )
}