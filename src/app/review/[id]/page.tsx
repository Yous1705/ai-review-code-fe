"use client";

import { useParams } from "next/navigation";
import { useReview } from "@/hooks/useReview";
import React, { useEffect, useState } from "react";
import ReviewSideBar from "@/component/ReviewSideBar";

function page() {
  const params = useParams();
  const id = params.id;

  const { reviewHistory, historyTitle, fetchReviewById } = useReview();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof id === "string") {
      fetchReviewById(id);
    }
  }, [id]);

  const toogleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ReviewSideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toogleSideBar={toogleSideBar}
        historyTitle={historyTitle}
      />

      <div>{reviewHistory?.language}</div>
      <div>{reviewHistory?.code}</div>
      <div>
        {reviewHistory?.issues.map((issue) => (
          <div key={issue.id}>
            <div>{issue.line}</div>
            <div>{issue.description}</div>
            <div>{issue.severity}</div>
            <div>{issue.suggestion}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
