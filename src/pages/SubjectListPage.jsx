import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SubjectListPage = () => {
  const { semester } = useParams();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch(
      `https://classes.cornell.edu/api/2.0/config/subjects.json?roster=${semester}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.data.subjects);
      })
      .catch((error) => {
        console.error("Error fetching rosters: ", error);
      });
  }, []);

  console.log(subjects);

  return (
    <div>
      <h1>Subject List Page</h1>
      <h2>{semester}</h2>
    </div>
  );
};

export default SubjectListPage;
