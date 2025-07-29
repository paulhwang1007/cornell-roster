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
  const [instructModes, setInstructModes] = useState([]);
  // Other Filters
  const [credits, setCredits] = useState([]);

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

      instructModes.forEach((instructMode) =>
        params.append("instructMode[]", instructMode)
      );

      // Search Bar Term
      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm);
      }

      // Build Full URL w/ Params and then Fetch
      const url = `https://classes.cornell.edu/api/2.0/search/classes.json?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      let fetchedCourses = data.data.classes || [];

      // Local filter for credits
      if (credits.length > 0) {
        fetchedCourses = fetchedCourses.filter((course) =>
          course.enrollGroups.some((group) => {
            const min = group.unitsMinimum;
            const max = group.unitsMaximum;

            return credits.some((credit) => {
              const numeric = parseFloat(credit);

              // 1. In-range match
              const isInRange = numeric >= min && numeric <= max;

              // 2. Starts-with match (e.g. 1.5 matches "1")
              const startsWithMatch = credits.some((c) =>
                String(min).startsWith(c)
              );

              return isInRange || startsWithMatch;
            });
          })
        );
      }

      setCourses(fetchedCourses);
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

  // Instruction Mode
  const handleInstructModeChange = (e) => {
    const instructMode = e.target.value;
    setInstructModes((prev) =>
      e.target.checked
        ? [...prev, instructMode]
        : prev.filter((l) => l !== instructMode)
    );
  };

  // || Other Filters
  // Credits
  const handleCreditChange = (e) => {
    const credits = e.target.value;

    setCredits((prev) =>
      e.target.checked
        ? [...prev, credits]
        : prev.filter((credit) => credit !== credits)
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
            value="AFS-AG"
            onChange={handleDistrReqChange}
          />
          AFS-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="ALC-AAP"
            onChange={handleDistrReqChange}
          />
          ALC-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="ALC-AS"
            onChange={handleDistrReqChange}
          />
          ALC-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="ALC-HA"
            onChange={handleDistrReqChange}
          />
          ALC-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="AWI-IL"
            onChange={handleDistrReqChange}
          />
          AWI-IL
        </label>

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

        <label>
          <input
            type="checkbox"
            value="BSC-AG"
            onChange={handleDistrReqChange}
          />
          BSC-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="CA-AG"
            onChange={handleDistrReqChange}
          />
          CA-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="CA-HE"
            onChange={handleDistrReqChange}
          />
          CA-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="CE-EN"
            onChange={handleDistrReqChange}
          />
          CE-EN
        </label>

        <label>
          <input
            type="checkbox"
            value="CHPH-AG"
            onChange={handleDistrReqChange}
          />
          CHPH-AG
        </label>

        <label>
          <input type="checkbox" value="D-AG" onChange={handleDistrReqChange} />
          D-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="DLG-AG"
            onChange={handleDistrReqChange}
          />
          DLG-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="DLS-AG"
            onChange={handleDistrReqChange}
          />
          DLS-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="EEE-AG"
            onChange={handleDistrReqChange}
          />
          EEE-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="ETH-AG"
            onChange={handleDistrReqChange}
          />
          ETH-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="ETM-AAP"
            onChange={handleDistrReqChange}
          />
          ETM-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="ETM-AS"
            onChange={handleDistrReqChange}
          />
          ETM-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="ETM-HA"
            onChange={handleDistrReqChange}
          />
          ETM-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="FL-AG"
            onChange={handleDistrReqChange}
          />
          FL-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="FLOPI-AS"
            onChange={handleDistrReqChange}
          />
          FLOPI-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="GLC-AAP"
            onChange={handleDistrReqChange}
          />
          GLC-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="GLC-AS"
            onChange={handleDistrReqChange}
          />
          GLC-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="GLC-HA"
            onChange={handleDistrReqChange}
          />
          GLC-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="HA-AG"
            onChange={handleDistrReqChange}
          />
          HA-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="HA-HE"
            onChange={handleDistrReqChange}
          />
          HA-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="HST-AAP"
            onChange={handleDistrReqChange}
          />
          HST-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="HST-AS"
            onChange={handleDistrReqChange}
          />
          HST-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="HST-HA"
            onChange={handleDistrReqChange}
          />
          HST-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="ICE-IL"
            onChange={handleDistrReqChange}
          />
          ICE-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="ICL-IL"
            onChange={handleDistrReqChange}
          />
          ICL-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="KCM-AG"
            onChange={handleDistrReqChange}
          />
          KCM-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="KCM-HE"
            onChange={handleDistrReqChange}
          />
          KCM-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="LA-AG"
            onChange={handleDistrReqChange}
          />
          LA-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="LAD-HE"
            onChange={handleDistrReqChange}
          />
          LAD-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="LH-IL"
            onChange={handleDistrReqChange}
          />
          LH-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="MQL-AG"
            onChange={handleDistrReqChange}
          />
          MQL-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="MQR-AAP"
            onChange={handleDistrReqChange}
          />
          MQR-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="MQR-HE"
            onChange={handleDistrReqChange}
          />
          MQR-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="OCE-IL"
            onChange={handleDistrReqChange}
          />
          OCE-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="OCL-IL"
            onChange={handleDistrReqChange}
          />
          OCL-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="OPHLS-AG"
            onChange={handleDistrReqChange}
          />
          OPHLS-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="ORL-AG"
            onChange={handleDistrReqChange}
          />
          ORL-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="PBS-HE"
            onChange={handleDistrReqChange}
          />
          PBS-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="PHS-AS"
            onChange={handleDistrReqChange}
          />
          PHS-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="PSC-AG"
            onChange={handleDistrReqChange}
          />
          PSC-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="QP-IL"
            onChange={handleDistrReqChange}
          />
          QP-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="SBA-AG"
            onChange={handleDistrReqChange}
          />
          SBA-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="SBA-HE"
            onChange={handleDistrReqChange}
          />
          SBA-HE
        </label>

        <label>
          <input
            type="checkbox"
            value="SCD-AAP"
            onChange={handleDistrReqChange}
          />
          SCD-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="SCD-AS"
            onChange={handleDistrReqChange}
          />
          SCD-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="SCD-HA"
            onChange={handleDistrReqChange}
          />
          SCD-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="SCH-AG"
            onChange={handleDistrReqChange}
          />
          SCH-AG
        </label>

        <label>
          <input
            type="checkbox"
            value="SCT-IL"
            onChange={handleDistrReqChange}
          />
          SCT-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="SDS-AAP"
            onChange={handleDistrReqChange}
          />
          SDS-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="SDS-AS"
            onChange={handleDistrReqChange}
          />
          SDS-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="SDS-HA"
            onChange={handleDistrReqChange}
          />
          SDS-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="SMR-AAP"
            onChange={handleDistrReqChange}
          />
          SMR-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="SMR-AS"
            onChange={handleDistrReqChange}
          />
          SMR-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="SMR-HA"
            onChange={handleDistrReqChange}
          />
          SMR-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="SOW-IL"
            onChange={handleDistrReqChange}
          />
          SOW-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="SSC-AAP"
            onChange={handleDistrReqChange}
          />
          SSC-AAP
        </label>

        <label>
          <input
            type="checkbox"
            value="SSC-AS"
            onChange={handleDistrReqChange}
          />
          SSC-AS
        </label>

        <label>
          <input
            type="checkbox"
            value="SSC-HA"
            onChange={handleDistrReqChange}
          />
          SSC-HA
        </label>

        <label>
          <input
            type="checkbox"
            value="STA-IL"
            onChange={handleDistrReqChange}
          />
          STA-IL
        </label>

        <label>
          <input
            type="checkbox"
            value="WRT-AG"
            onChange={handleDistrReqChange}
          />
          WRT-AG
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
            value="AFLANG"
            onChange={handleExplStudiesChange}
          />
          Africana Lang
        </label>

        <label>
          <input
            type="checkbox"
            value="EAAREA"
            onChange={handleExplStudiesChange}
          />
          East Asia Area
        </label>

        <label>
          <input
            type="checkbox"
            value="EALANG"
            onChange={handleExplStudiesChange}
          />
          East Asia Lang
        </label>

        <label>
          <input
            type="checkbox"
            value="CU-CEL"
            onChange={handleExplStudiesChange}
          />
          Engaged Learning
        </label>

        <label>
          <input
            type="checkbox"
            value="EUAREA"
            onChange={handleExplStudiesChange}
          />
          European Area
        </label>

        <label>
          <input
            type="checkbox"
            value="EULANG"
            onChange={handleExplStudiesChange}
          />
          European Lang
        </label>

        <label>
          <input
            type="checkbox"
            value="CU-ITL"
            onChange={handleExplStudiesChange}
          />
          International Ed
        </label>

        <label>
          <input
            type="checkbox"
            value="LAAREA"
            onChange={handleExplStudiesChange}
          />
          Latin American Area
        </label>

        <label>
          <input
            type="checkbox"
            value="LALANG"
            onChange={handleExplStudiesChange}
          />
          Latin American Lang
        </label>

        <label>
          <input
            type="checkbox"
            value="SEAREA"
            onChange={handleExplStudiesChange}
          />
          Southeast Asia Area
        </label>

        <label>
          <input
            type="checkbox"
            value="SELANG"
            onChange={handleExplStudiesChange}
          />
          Southeast Asian Lang
        </label>

        <label>
          <input
            type="checkbox"
            value="SAAREA"
            onChange={handleExplStudiesChange}
          />
          South Asia Area
        </label>

        <label>
          <input
            type="checkbox"
            value="SALANG"
            onChange={handleExplStudiesChange}
          />
          South Asian Lang
        </label>

        <label>
          <input
            type="checkbox"
            value="CU-SBY"
            onChange={handleExplStudiesChange}
          />
          Sustainability
        </label>

        <label>
          <input
            type="checkbox"
            value="CU-UGR"
            onChange={handleExplStudiesChange}
          />
          Undegraduate Research
        </label>
      </div>

      {/* Instruction Mode Filter */}
      <div>
        <label>
          <input
            type="checkbox"
            value="RE"
            onChange={handleInstructModeChange}
          />
          Directed Research
        </label>

        <label>
          <input
            type="checkbox"
            value="AD"
            onChange={handleInstructModeChange}
          />
          Distance Learning: Asynchronous
        </label>

        <label>
          <input
            type="checkbox"
            value="SD"
            onChange={handleInstructModeChange}
          />
          Distance Learning: Synchronous
        </label>

        <label>
          <input
            type="checkbox"
            value="HY"
            onChange={handleInstructModeChange}
          />
          Hybrid: Online + In-Person
        </label>

        <label>
          <input
            type="checkbox"
            value="IS"
            onChange={handleInstructModeChange}
          />
          Independent Studies
        </label>

        <label>
          <input
            type="checkbox"
            value="OL"
            onChange={handleInstructModeChange}
          />
          Online
        </label>
      </div>

      {/* Credits */}
      <div>
        <label>
          <input type="checkbox" value="0" onChange={handleCreditChange} />
          0-1 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="1"
            onChange={handleCreditChange}
            checked={credits.includes("1")}
          />
          1 credit
        </label>

        <label>
          <input
            type="checkbox"
            value="2"
            onChange={handleCreditChange}
            checked={credits.includes("2")}
          />
          2 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="3"
            onChange={handleCreditChange}
            checked={credits.includes("3")}
          />
          3 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="4"
            onChange={handleCreditChange}
            checked={credits.includes("4")}
          />
          4 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="5"
            onChange={handleCreditChange}
            checked={credits.includes("5")}
          />
          5 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="6"
            onChange={handleCreditChange}
            checked={credits.includes("6")}
          />
          6 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="7"
            onChange={handleCreditChange}
            checked={credits.includes("7")}
          />
          7 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="8"
            onChange={handleCreditChange}
            checked={credits.includes("8")}
          />
          8 credits
        </label>

        <label>
          <input
            type="checkbox"
            value="9"
            onChange={handleCreditChange}
            checked={credits.includes("9")}
          />
          9 credits
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
