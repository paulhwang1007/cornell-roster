import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "react-use";

const CourseListPage = () => {
  // Previous Inputs
  const { semester, subject } = useParams();
  // Courses + Loading
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  // Filters
  const [classLevels, setClassLevels] = useState([]);
  const [acadCareers, setAcadCareers] = useState([]);

  // || Debounce Search Term
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // ||  Build Fetch URL based on Filters + Fetch Classes:
  //     Roster and Subject from previous pages + Search Term
  const handleSearch = async () => {
    setLoading(true);
    setCourses([]);

    try {
      // || Build URL Params
      const params = new URLSearchParams();
      params.set("roster", semester);
      params.set("subject", subject);

      // Filters
      classLevels.forEach((classLevel) =>
        params.append("classLevels[]", classLevel)
      );

      acadCareers.forEach((acadCareer) =>
        params.append("acadCareer[]", acadCareer)
      );

      // Search Bar Term
      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm);
      }

      // Build Full URL w/ Params + Fetch
      const url = `https://classes.cornell.edu/api/2.0/search/classes.json?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setCourses(data.data.classes);
    } catch (error) {
      console.error("Error Fetching Courses: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Classes upon Page Load
  useEffect(() => {
    handleSearch();
  }, []);

  // Fetch Classes when Filters Change
  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  // || Handlers for Search Filters
  // Class Levels
  const handleClassLevelChange = (e) => {
    const classLevel = e.target.value;
    setClassLevels((prev) =>
      e.target.checked
        ? [...prev, classLevel]
        : prev.filter((l) => l !== classLevel)
    );
  };

  // Acad Careers
  const handleAcadCareerChange = (e) => {
    const acadCareer = e.target.value;
    setAcadCareers((prev) =>
      e.target.checked
        ? [...prev, acadCareer]
        : prev.filter((l) => l !== acadCareer)
    );
  };

  return (
    <div>
      <h1>Course List</h1>
      <h2>{semester}</h2>
      <h2>{subject}</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Class Level Filter */}
      <div>
        <label>
          <input
            type="checkbox"
            value="1000"
            onChange={handleClassLevelChange}
          />
          1000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="2000"
            onChange={handleClassLevelChange}
          />
          2000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="3000"
            onChange={handleClassLevelChange}
          />
          3000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="4000"
            onChange={handleClassLevelChange}
          />
          4000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="5000"
            onChange={handleClassLevelChange}
          />
          5000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="6000"
            onChange={handleClassLevelChange}
          />
          6000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="7000"
            onChange={handleClassLevelChange}
          />
          7000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="8000"
            onChange={handleClassLevelChange}
          />
          8000-level
        </label>
        <label>
          <input
            type="checkbox"
            value="9000"
            onChange={handleClassLevelChange}
          />
          9000-level
        </label>
      </div>

      {/* Acad Career Filter */}
      <div>
        <label>
          <input type="checkbox" value="UG" onChange={handleAcadCareerChange} />{" "}
          Undergraduate
        </label>

        <label>
          <input type="checkbox" value="GR" onChange={handleAcadCareerChange} />{" "}
          Graduate
        </label>

        <label>
          <input type="checkbox" value="GM" onChange={handleAcadCareerChange} />{" "}
          Graduate Management
        </label>

        <label>
          <input type="checkbox" value="LA" onChange={handleAcadCareerChange} />{" "}
          Law
        </label>

        <label>
          <input type="checkbox" value="VM" onChange={handleAcadCareerChange} />{" "}
          Veterinary Medicine
        </label>
      </div>
      <button onClick={handleSearch}>Apply Filters</button>

      {/* Load Courses */}
      {loading ? (
        <p className="text-gray-500">Loading Courses...</p>
      ) : (
        courses.map((course) => (
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
        ))
      )}
    </div>
  );
};

export default CourseListPage;
