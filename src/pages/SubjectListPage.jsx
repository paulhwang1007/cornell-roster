import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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

  // Horizontal Scrolling
  const slideLeft = (sliderId) => {
    const slider = document.getElementById(sliderId);
    if (slider) slider.scrollLeft -= 500;
  };

  const slideRight = (sliderId) => {
    const slider = document.getElementById(sliderId);
    if (slider) slider.scrollLeft += 500;
  };

  return (
    <div>
      <h1>Subjects for {semester}</h1>

      {Object.keys(subjectsByLetter)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <h2>{letter}</h2>

            <div className="relative flex items-center">
              <MdChevronLeft
                onClick={() => slideLeft(`slider-${letter}`)}
                size={40}
                className="opacity-50 cursor-pointer hover:opacity-100"
              />
              <div
                id={`slider-${letter}`}
                className="flex w-full h-full overflow-x-scroll scroll scroll-smooth scrollbar-hide overflow-hidden"
              >
                {subjectsByLetter[letter].map((subject) => (
                  <Link
                    to={`/${semester}/${subject.value}`}
                    key={subject.value}
                    className="border-1 border-solid border-indigo-500 flex flex-col flex-shrink-0 justify-between items-start h-48 w-[250px] mx-2 p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  >
                    <p className="card-header">{subject.value}</p>
                    <p className="text-left">{subject.descrformal}</p>
                  </Link>
                ))}
              </div>
              <MdChevronRight
                onClick={() => slideRight(`slider-${letter}`)}
                size={40}
                className="opacity-50 cursor-pointer hover:opacity-100"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SubjectListPage;
