import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const res = await axios.get("get-all-reviews");
        if (res.data.success) {
          const fetchedReviews = res.data.reviews;

          setReviews(fetchedReviews);
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "warning",
          Title: "There was a problem",
          text: "Try refreshing the page",
        });
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [reviewsRefreshKey]);

  return {
    reviews,
    reviewsLoading,
    reviewsRefreshKey: () => setReviewsRefreshKey((prev) => prev + 1),
  };
}

export default useReviews;
