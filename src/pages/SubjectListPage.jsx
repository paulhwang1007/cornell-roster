import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SubjectListPage = () => {
  // || States
  const { semester } = useParams();
  const [subjectsByLetter, setSubjectsByLetter] = useState({});

  // Initial Roster Subject Load
  useEffect(() => {
    fetch(
      `https://classes.cornell.edu/api/2.0/config/subjects.json?roster=${semester}`
    )
      .then((response) => response.json())
      .then((data) => {
        const subjects = data.data.subjects;

        // --- Sorts Subjects from A-Z ---
        subjects.sort((a, b) => a.value.localeCompare(b.value));

        // Key: Unique firstLetter
        // Value: Array with the Subjects that share the same firstLetter
        const grouped = {};
        subjects.forEach((subject) => {
          const firstLetter = subject.value[0].toUpperCase();
          if (!grouped[firstLetter]) {
            grouped[firstLetter] = []; // firstLetter: []
          }
          grouped[firstLetter].push(subject); // firstLetter: [subject1, subject2, ...]
        });

        // Sets subjectsByLetter = grouped
        setSubjectsByLetter(grouped);
      })
      .catch((error) => {
        console.error("Error fetching rosters: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Subjects for {semester}</h1>

      {Object.keys(subjectsByLetter)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <h2>{letter}</h2>

            <ul>
              {subjectsByLetter[letter].map((subject) => (
                <li key={subject.value}>
                  <Link to={`/${semester}/${subject.value}`}>
                    {subject.value}: {subject.descrformal}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default SubjectListPage;
