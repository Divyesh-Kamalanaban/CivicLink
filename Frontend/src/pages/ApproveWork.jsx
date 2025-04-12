/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import useGetUnverifiedWorks from "../hooks/useGetUnverifiedWorks";
import WorkCard from "../components/WorkCard";

function ApproveWork() {
  const { loading, unverifiedWorks } = useGetUnverifiedWorks();
  console.log(unverifiedWorks);
  return (
    <div className="w-full p-4 flex flex-wrap items-start justify-start">
      {unverifiedWorks?.unverifiedWorks.map((work) => (
        <WorkCard work={work} />
      ))}
    </div>
  );
}

export default ApproveWork;
