import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [rosters, setRosters] = useState([]);

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

  console.log(rosters);

  return (
    <div>
      <h1>Home Page</h1>
      <label>Select a Roster:</label>
      <select name="rosters">
        {rosters
          .slice()
          .reverse()
          .map((roster) => (
            <option key={roster.slug} value={roster.slug}>
              {roster.descr}
            </option>
          ))}
      </select>
    </div>
  );
};

export default HomePage;
