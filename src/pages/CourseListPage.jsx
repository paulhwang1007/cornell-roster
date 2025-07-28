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
  const [acadCareers, setAcadCareers] = useState([]);
  const [acadGroups, setAcadGroups] = useState([]);
  const [classLevels, setClassLevels] = useState([]);
  const [distrReqs, setDistrReqs] = useState([]);
  const [distrReqType, setDistrReqType] = useState("any");
  const [explStudies, setExplStudies] = useState([]);
  const [explStudiesType, setExplStudiesType] = useState("any");

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
      acadCareers.forEach((acadCareer) =>
        params.append("acadCareer[]", acadCareer)
      );

      acadGroups.forEach((acadGroup) =>
        params.append("acadGroup[]", acadGroup)
      );

      classLevels.forEach((classLevel) =>
        params.append("classLevels[]", classLevel)
      );

      params.append("distrReqs-type", distrReqType);
      distrReqs.forEach((distrReq) => params.append("distrReqs[]", distrReq));

      params.append("explStudies-type", explStudiesType);
      explStudies.forEach((explStudy) =>
        params.append("explStudies[]", explStudy)
      );

      // Search Bar Term
      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm);
      }

      // Build Full URL w/ Params and then Fetch
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

  // Fetch Classes when Search Term Changes after debounce
  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  // || Handlers for Search Filters
  // Acad Careers
  const handleAcadCareerChange = (e) => {
    const acadCareer = e.target.value;
    setAcadCareers((prev) =>
      e.target.checked
        ? [...prev, acadCareer]
        : prev.filter((l) => l !== acadCareer)
    );
  };

  // Acad Groups
  const handleAcadGroupChange = (e) => {
    const acadGroup = e.target.value;
    setAcadGroups((prev) =>
      e.target.checked
        ? [...prev, acadGroup]
        : prev.filter((l) => l !== acadGroup)
    );
  };

  // Class Levels
  const handleClassLevelChange = (e) => {
    const classLevel = e.target.value;
    setClassLevels((prev) =>
      e.target.checked
        ? [...prev, classLevel]
        : prev.filter((l) => l !== classLevel)
    );
  };

  // Distribution Requirements
  const handleDistrReqChange = (e) => {
    const distrReq = e.target.value;
    setDistrReqs((prev) =>
      e.target.checked
        ? [...prev, distrReq]
        : prev.filter((l) => l !== distrReq)
    );
  };

  const handleDistrReqTypeChange = (e) => {
    const distrReqType = e.target.value;
    setDistrReqType((prev) => (prev === distrReqType ? "" : distrReqType));
  };

  // Exploratory Studies
  const handleExplStudiesChange = (e) => {
    const explStudy = e.target.value;
    setExplStudies((prev) =>
      e.target.checked
        ? [...prev, explStudy]
        : prev.filter((l) => l !== explStudy)
    );
  };

  const handleExplStudiesTypeChange = (e) => {
    const explStudiesType = e.target.value;
    setExplStudiesType((prev) =>
      prev === explStudiesType ? "" : explStudiesType
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

      {/* Acad Group Filter 
      TODO: Take out of CourseList and put into SubjectList */}
      <div>
        <label>
          <input type="checkbox" value="AG" onChange={handleAcadGroupChange} />
          Agricultural and Life Sciences
        </label>

        <label>
          <input type="checkbox" value="AR" onChange={handleAcadGroupChange} />
          Architecture, Art, and Planning
        </label>

        <label>
          <input type="checkbox" value="AS" onChange={handleAcadGroupChange} />
          Arts and Sciences
        </label>

        <label>
          <input type="checkbox" value="AT" onChange={handleAcadGroupChange} />
          Athletics
        </label>

        <label>
          <input type="checkbox" value="BU" onChange={handleAcadGroupChange} />
          Business
        </label>

        <label>
          <input type="checkbox" value="CT" onChange={handleAcadGroupChange} />
          Cornell Tech
        </label>

        <label>
          <input type="checkbox" value="CU" onChange={handleAcadGroupChange} />
          Cornell University
        </label>

        <label>
          <input type="checkbox" value="EN" onChange={handleAcadGroupChange} />
          Engineering
        </label>

        <label>
          <input type="checkbox" value="GR" onChange={handleAcadGroupChange} />
          Graduate
        </label>

        <label>
          <input type="checkbox" value="HE" onChange={handleAcadGroupChange} />
          Human Ecology
        </label>

        <label>
          <input type="checkbox" value="IL" onChange={handleAcadGroupChange} />
          Industrial and Labor Relations
        </label>

        <label>
          <input type="checkbox" value="LA" onChange={handleAcadGroupChange} />
          Law
        </label>

        <label>
          <input type="checkbox" value="PP" onChange={handleAcadGroupChange} />
          Public Policy
        </label>

        <label>
          <input type="checkbox" value="OT" onChange={handleAcadGroupChange} />
          Reserve Officer Training
        </label>

        <label>
          <input type="checkbox" value="VM" onChange={handleAcadGroupChange} />
          Veterinary Medicine
        </label>
      </div>

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

      {/* Distribution Requirement Type */}
      <div>
        <label>
          <input
            type="checkbox"
            value="any"
            checked={distrReqType === "any"}
            onChange={handleDistrReqTypeChange}
          />
          Any
        </label>
        <label>
          <input
            type="checkbox"
            value="all"
            checked={distrReqType === "all"}
            onChange={handleDistrReqTypeChange}
          />
          All
        </label>
      </div>
      {/* Distribution Requirement Filter */}
      <div>
        <label>
          <input
            type="checkbox"
            value="BIO-AG"
            onChange={handleDistrReqChange}
          />
          BIO-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="BIO-AS"
            onChange={handleDistrReqChange}
          />
          BIO-AS
        </label>
      </div>

      {/* Exploratory Studies Type */}
      <div>
        <label>
          <input
            type="checkbox"
            value="any"
            checked={explStudiesType === "any"}
            onChange={handleExplStudiesTypeChange}
          />
          Any
        </label>
        <label>
          <input
            type="checkbox"
            value="all"
            checked={explStudiesType === "all"}
            onChange={handleExplStudiesTypeChange}
          />
          All
        </label>
      </div>
      {/* Exploratory Studies Filter */}
      <div>
        <label>
          <input
            type="checkbox"
            value="AFAREA"
            onChange={handleExplStudiesChange}
          />
          Africana Area
        </label>
        <label>
          <input
            type="checkbox"
            value="CU-CEL"
            onChange={handleExplStudiesChange}
          />
          Engaged Learning
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
