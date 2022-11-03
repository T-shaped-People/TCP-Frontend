import React from "react";
import { useParams } from "react-router-dom";
import { TeamHeader, Sidebar, SecSideBar } from "../allFiles";
function Notice() {
  const param = useParams();
  console.log(param)
  return (
    <div>
      <TeamHeader />
      <Sidebar />
      <SecSideBar />
    </div>
  );
}

export default Notice;
