import { useParams } from "next/navigation";
import { useReview } from "@/hooks/useReview";
import React, { useEffect } from "react";

function page() {
  const params = useParams();
  const id = params.id;

  const [reviewHistory, fetchReviewById] = useReview();

  useEffect(() => {
    if (id) {
      fetchReviewById(id);
    }
  }, [id]);
  return <div>

    <div>
        {reviewHistory.}
    </div>
  </div>;
}

export default page;
