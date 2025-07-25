import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseListPage = () => {
  const { semester, subject } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(
      `https://classes.cornell.edu/api/2.0/search/classes.json?roster=FA25&subject=${subject}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data.classes);
      })
      .catch((error) => {
        console.error("Error fetching rosters: ", error);
      });
  }, []);

  console.log(courses);

  return (
    <div>
      <h1>Course List</h1>
      <h2>{semester}</h2>
      <h2>{subject}</h2>
      {courses.map((course) => (
        // Temporary Course Card Styling
        <div class="flex flex-col m-4 border-1 border-solid border-indigo-500">
          <p>
            {course.subject} {course.catalogNbr}
          </p>
          <p>{course.titleLong}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseListPage;
