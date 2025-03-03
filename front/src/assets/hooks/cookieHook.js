import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function useCookies() {
  const [cookies, setCookies] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [cookiesLoading, setCookiesLoading] = useState(false);

  useEffect(() => {
    const fetchCookies = async () => {
      setCookiesLoading(true);
      try {
        const res = await axios.get("get-all-cookies");
        if (res.data.success) {
          const fetchedCookies = res.data.cookies;
          
          setCookies(fetchedCookies);
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "warning",
          Title: "There was a problem",
          text: "Try refreshing the page",
        });
      } finally {
        setCookiesLoading(false);
      }
    };

    fetchCookies();
  }, [refreshKey]);

  return {
    cookies,
    cookiesLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useCookies;
