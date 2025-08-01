import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuroraBackgroundDemo } from "../components/background";

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
  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedSemester) {
      navigate(`/${selectedSemester}`);
    }
  };

  return (
    <AuroraBackgroundDemo>
      <div className="text-white flex flex-col items-center gap-4">
        <h1>Home Page</h1>
        <label>Select a Roster:</label>
        <select value={selectedSemester} onChange={handleSemesterChange}>
          <option value="">Choose a Semester</option>
          {rosters
            .slice()
            .reverse()
            .map((roster) => (
              <option key={roster.slug} value={roster.slug}>
                {roster.descr}
              </option>
            ))}
        </select>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </AuroraBackgroundDemo>
  );
};

export default HomePage;
