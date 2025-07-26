import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "react-use";

const CourseListPage = () => {
  const { semester, subject } = useParams();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce Search Term
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Fetch Classes
  useEffect(() => {
    fetch(
      `https://classes.cornell.edu/api/2.0/search/classes.json?roster=${semester}&subject=${subject}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data.classes);
      })
      .catch((error) => {
        console.error("Error fetching rosters: ", error);
      });
  }, []);

  // Search through courses
  useEffect(() => {
    fetch(
      `https://classes.cornell.edu/api/2.0/search/classes.json?roster=${semester}&subject=${subject}&q=${encodeURIComponent(
        debouncedSearchTerm
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data.classes);
      })
      .catch((error) => {
        console.error("Error fetching rosters: ", error);
      });
  }, [debouncedSearchTerm]);

  return (
    <div>
      <h1>Course List</h1>
      <h2>{semester}</h2>
      <h2>{subject}</h2>

      <input
        type="text"
        placeholder="Search for a course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {courses.map((course) => (
        // Temporary Course Card Styling
        <div
          key={course.crseId}
          className="flex flex-col m-4 border-1 border-solid border-indigo-500"
        >
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
