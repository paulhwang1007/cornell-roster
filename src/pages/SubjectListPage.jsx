import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SubjectListPage = () => {
  // || States
  const { semester } = useParams();
  const [subjects, setSubjects] = useState([]);

  // || Fetch Subjects from provided Roster Semester
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

  return (
    <div>
      <h1>Subject List Page</h1>
      <ul>
        {subjects.map((subject) => (
          <li>
            <Link to={`/${semester}/${subject.value}`}>{subject.value}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectListPage;
