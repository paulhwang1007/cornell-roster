import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuroraBackgroundDemo } from "../components/background";
import RosterSelect from "../components/rosterSelect";

const HomePage = () => {
  // || States
  const [rosters, setRosters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const navigate = useNavigate();

  // || Fetch Rosters from API
  useEffect(() => {
    fetch("https://classes.cornell.edu/api/2.0/config/rosters.json")
      .then((response) => response.json())
      .then((data) => {
        setRosters(data.data.rosters);
      })
      .catch((error) => {
        console.error("Error fetching rosters: ", error);
      });
  }, []);

  // || Handle Changes
  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
  };

  const handleSubmit = () => {
    if (selectedSemester) {
      navigate(`/${selectedSemester}`);
    }
  };

  return (
    <AuroraBackgroundDemo className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center max-w-3xl space-y-5 z-10 flex flex-col items-center gap-4">
        <h1 className="h-fit text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300 text-transparent font-semibold">
          Search Cornell Classes
        </h1>
        <p className="text-gray-300 text-lg text-pretty">
          A streamlined and visually enhanced platform for browsing Cornell
          classes across any term.
        </p>

        <RosterSelect
          rosters={rosters}
          value={selectedSemester}
          onChange={handleSemesterChange}
        ></RosterSelect>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </AuroraBackgroundDemo>
  );
};

export default HomePage;
