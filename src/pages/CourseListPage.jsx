import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDebounce } from "react-use";
import { AuroraBackgroundSubjects } from "../components/backgroundSubjects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckboxGroupAccordion from "../components/CheckboxGroupAccordion";
import FilterCheckbox from "../components/FilterCheckbox";
import CourseSkeleton from "../components/CourseSkeleton";
import CourseModal from "../components/CourseModal";

const CourseListPage = () => {
  // || Inputs
  const { semester, subject } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // || Course Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const [acadCareers, setAcadCareers] = useState([]);
  const [classLevels, setClassLevels] = useState([]);
  const [distrReqs, setDistrReqs] = useState([]);
  const [distrReqType, setDistrReqType] = useState("any");
  const [instructModes, setInstructModes] = useState([]);
  const [credits, setCredits] = useState([]);
  const [days, setDays] = useState([]);
  const [daysType, setDaysType] = useState("includes");

  const filterOptions = {
    acadCareerOptions: [
      { label: "Undergraduate", value: "UG" },
      { label: "Graduate", value: "GR" },
      { label: "Graduate Management", value: "GM" },
      { label: "Law", value: "LA" },
      { label: "Veterinary Medicine", value: "VM" },
    ],
    classLevelOptions: [
      { label: "1000-level", value: "1000" },
      { label: "2000-level", value: "2000" },
      { label: "3000-level", value: "3000" },
      { label: "4000-level", value: "4000" },
      { label: "5000-level", value: "5000" },
      { label: "6000-level", value: "6000" },
      { label: "7000-level", value: "7000" },
      { label: "8000-level", value: "8000" },
      { label: "9000-level", value: "9000" },
    ],
    distrReqOptions: [
      { label: "AFS-AG", value: "AFS-AG" },
      { label: "ALC-AAP", value: "ALC-AAP" },
      { label: "ALC-AS", value: "ALC-AS" },
      { label: "ALC-HA", value: "ALC-HA" },
      { label: "AWI-IL", value: "AWI-IL" },
      { label: "BIO-AG", value: "BIO-AG" },
      { label: "BIO-AS", value: "BIO-AS" },
      { label: "BSC-AG", value: "BSC-AG" },
      { label: "CA-AG", value: "CA-AG" },
      { label: "CA-HE", value: "CA-HE" },
      { label: "CE-EN", value: "CE-EN" },
      { label: "CHPH-AG", value: "CHPH-AG" },
      { label: "D-AG", value: "D-AG" },
      { label: "DLG-AG", value: "DLG-AG" },
      { label: "DLS-AG", value: "DLS-AG" },
      { label: "EEE-AG", value: "EEE-AG" },
      { label: "ETH-AG", value: "ETH-AG" },
      { label: "ETM-AAP", value: "ETM-AAP" },
      { label: "ETM-AS", value: "ETM-AS" },
      { label: "ETM-HA", value: "ETM-HA" },
      { label: "FL-AG", value: "FL-AG" },
      { label: "FLOPI-AS", value: "FLOPI-AS" },
      { label: "GLC-AAP", value: "GLC-AAP" },
      { label: "GLC-AS", value: "GLC-AS" },
      { label: "GLC-HA", value: "GLC-HA" },
      { label: "HA-AG", value: "HA-AG" },
      { label: "HA-HE", value: "HA-HE" },
      { label: "HST-AAP", value: "HST-AAP" },
      { label: "HST-AS", value: "HST-AS" },
      { label: "HST-HA", value: "HST-HA" },
      { label: "ICE-IL", value: "ICE-IL" },
      { label: "ICL-IL", value: "ICL-IL" },
      { label: "KCM-AG", value: "KCM-AG" },
      { label: "KCM-HE", value: "KCM-HE" },
      { label: "LA-AG", value: "LA-AG" },
      { label: "LAD-HE", value: "LAD-HE" },
      { label: "LH-IL", value: "LH-IL" },
      { label: "MQL-AG", value: "MQL-AG" },
      { label: "MQR-AAP", value: "MQR-AAP" },
      { label: "MQR-HE", value: "MQR-HE" },
      { label: "OCE-IL", value: "OCE-IL" },
      { label: "OCL-IL", value: "OCL-IL" },
      { label: "OPHLS-AG", value: "OPHLS-AG" },
      { label: "ORL-AG", value: "ORL-AG" },
      { label: "PBS-HE", value: "PBS-HE" },
      { label: "PHS-AS", value: "PHS-AS" },
      { label: "PSC-AG", value: "PSC-AG" },
      { label: "QP-IL", value: "QP-IL" },
      { label: "SBA-AG", value: "SBA-AG" },
      { label: "SBA-HE", value: "SBA-HE" },
      { label: "SCD-AAP", value: "SCD-AAP" },
      { label: "SCD-AS", value: "SCD-AS" },
      { label: "SCD-HA", value: "SCD-HA" },
      { label: "SCH-AG", value: "SCH-AG" },
      { label: "SCT-IL", value: "SCT-IL" },
      { label: "SDS-AAP", value: "SDS-AAP" },
      { label: "SDS-AS", value: "SDS-AS" },
      { label: "SDS-HA", value: "SDS-HA" },
      { label: "SMR-AAP", value: "SMR-AAP" },
      { label: "SMR-AS", value: "SMR-AS" },
      { label: "SMR-HA", value: "SMR-HA" },
      { label: "SOW-IL", value: "SOW-IL" },
      { label: "SSC-AAP", value: "SSC-AAP" },
      { label: "SSC-AS", value: "SSC-AS" },
      { label: "SSC-HA", value: "SSC-HA" },
      { label: "STA-IL", value: "STA-IL" },
      { label: "WRT-AG", value: "WRT-AG" },
    ],
    instrModeOptions: [
      { label: "Directed Research", value: "RE" },
      { label: "Distance Learning: Asynchronous", value: "AD" },
      { label: "Distance Learning: Synchronous", value: "SD" },
      { label: "Hybrid: Online + In-Person", value: "HY" },
      { label: "Independent Studies", value: "IS" },
      { label: "Online", value: "OL" },
    ],
    creditOptions: [
      { label: "0-1 Credits", value: "0" },
      { label: "1 Credit", value: "1" },
      { label: "2 Credits", value: "2" },
      { label: "3 Credits", value: "3" },
      { label: "4 Credits", value: "4" },
      { label: "5 Credits", value: "5" },
      { label: "6 Credits", value: "6" },
      { label: "7 Credits", value: "7" },
      { label: "8 Credits", value: "8" },
      { label: "9 Credits", value: "9" },
    ],
    classDayOptions: [
      { label: "Monday", value: "M" },
      { label: "Tuesday", value: "T" },
      { label: "Wednesday", value: "W" },
      { label: "Thursday", value: "R" },
      { label: "Friday", value: "F" },
      { label: "Saturday", value: "S" },
      { label: "Sunday", value: "Su" },
    ],
  };

  // ||  Dynamically Build Fetch URL
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

      classLevels.forEach((classLevel) =>
        params.append("classLevels[]", classLevel)
      );

      params.append("distrReqs-type", distrReqType);
      distrReqs.forEach((distrReq) => params.append("distrReqs[]", distrReq));

      instructModes.forEach((instructMode) =>
        params.append("instructMode[]", instructMode)
      );

      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm);
      }

      // Build Full URL w/ Params
      const url = `https://classes.cornell.edu/api/2.0/search/classes.json?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      let fetchedCourses = data.data?.classes;

      // No Courses with the selected parameters
      if (!fetchedCourses) {
        console.warn("No courses fit the selected filters.");
        fetchedCourses = [];
      }

      // Local filter for Credits
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

      // Local Filter for Days of the Week
      if (days.length > 0) {
        const selectedSet = new Set(days);

        fetchedCourses = fetchedCourses.filter((course) => {
          // Extract all section-level sets of days
          const allSectionPatterns = course.enrollGroups.flatMap((group) =>
            group.classSections.map((section) => {
              const patterns = section.meetings.map((m) => m.pattern || "");
              return extractDays(patterns); // Set of days for this section
            })
          );

          if (daysType === "includes") {
            // Keep course if any section includes at least one selected day
            return allSectionPatterns.some((sectionDays) =>
              days.some((day) => sectionDays.has(day))
            );
          } else if (daysType === "only") {
            // Keep course if any section's day set exactly matches selected days
            return allSectionPatterns.some((sectionDays) => {
              if (sectionDays.size !== selectedSet.size) return false;

              for (let day of sectionDays) {
                if (!selectedSet.has(day)) return false;
              }
              return true;
            });
          }
          return true;
        });
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

  // Fetch Classes when Search Term debounces
  useEffect(() => {
    handleSearch();
  }, [
    debouncedSearchTerm,
    acadCareers,
    classLevels,
    distrReqs,
    distrReqType,
    instructModes,
    credits,
    days,
    daysType,
  ]);

  // || Handlers for Filters
  const clearFilters = async () => {
    setAcadCareers([]);
    setClassLevels([]);
    setDistrReqs([]);
    setDistrReqType("any");
    setInstructModes([]);
    setCredits([]);
    setDays([]);
    setDaysType("includes");

    setTimeout(() => {
      handleSearch();
    }, 0);
  };
  const createCheckboxHandler = (setter) => (e) => {
    const value = e.target.value;
    setter((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleAcadCareerChange = createCheckboxHandler(setAcadCareers);
  const handleClassLevelChange = createCheckboxHandler(setClassLevels);
  const handleDistrReqChange = createCheckboxHandler(setDistrReqs);
  const handleDistrReqTypeChange = (e) => {
    const distrReqType = e.target.value;
    setDistrReqType((prev) => (prev === distrReqType ? "" : distrReqType));
  };
  const handleInstructModeChange = createCheckboxHandler(setInstructModes);
  const handleCreditChange = createCheckboxHandler(setCredits);
  const handleDayChange = createCheckboxHandler(setDays);
  const extractDays = (patterns) => {
    const dayTokens = [];

    for (const pattern of patterns) {
      let i = 0;
      while (i < pattern.length) {
        if (pattern[i] === "S" && pattern[i + 1] === "u") {
          dayTokens.push("Su");
          i += 2;
        } else {
          dayTokens.push(pattern[i]);
          i += 1;
        }
      }
    }

    return new Set(dayTokens);
  };

  return (
    <AuroraBackgroundSubjects>
      <div className="w-full max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Courses for {subject} - {semester}
        </h1>
        <Link to={`/${semester}`}>
          <button className="mt-4 md:mt-0 bg-white text-black px-4 py-2 rounded-md shadow hover:bg-zinc-200 hover:cursor-pointer">
            Back to Subjects
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 min-h-screen">
        <div className="col-span-1 space-y-4 h-fit p-4 bg-black/30 hover:bg-black/50 rounded-md">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            className="w-full px-4 py-2 border rounded-md shadow-sm text-base text-white bg-black/25 hover:bg-black/50"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Accordion */}
          <Accordion type="single" collapsible>
            <CheckboxGroupAccordion
              id="acad-careers"
              title="Level of Study"
              options={filterOptions.acadCareerOptions}
              selected={acadCareers}
              onChange={handleAcadCareerChange}
            />

            <CheckboxGroupAccordion
              id="class-level"
              title="Class Level"
              options={filterOptions.classLevelOptions}
              selected={classLevels}
              onChange={handleClassLevelChange}
            />

            <AccordionItem value="distr-req" className="text-white">
              <AccordionTrigger>Distribution Requirement</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 px-2">
                <fieldset className="mt-2">
                  <legend className="font-semibold mb-1">
                    Distribution Requirement Type:
                  </legend>

                  <FilterCheckbox
                    value={"any"}
                    checked={distrReqType === "any"}
                    onChange={handleDistrReqTypeChange}
                    label={"Any Selected"}
                  />

                  <FilterCheckbox
                    value={"all"}
                    checked={distrReqType === "all"}
                    onChange={handleDistrReqTypeChange}
                    label={"All Selected"}
                  />
                </fieldset>

                <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div className="grid grid-cols-2 gap-1">
                  {filterOptions.distrReqOptions.map((option) => (
                    <FilterCheckbox
                      type="checkbox"
                      value={option.value}
                      onChange={handleDistrReqChange}
                      label={option.label}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <CheckboxGroupAccordion
              id="instr-mode"
              title="Instruction Mode"
              options={filterOptions.instrModeOptions}
              selected={instructModes}
              onChange={handleInstructModeChange}
            />

            <CheckboxGroupAccordion
              id="credits"
              title="Credits"
              options={filterOptions.creditOptions}
              selected={credits}
              onChange={handleCreditChange}
            />

            <AccordionItem value="class-days" className="text-white">
              <AccordionTrigger>Class Days</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 px-2">
                <div>
                  <fieldset className="mt-2">
                    <legend className="font-semibold mb-1">
                      Day Match Type:
                    </legend>

                    <FilterCheckbox
                      value="includes"
                      checked={daysType === "includes"}
                      onChange={(e) => setDaysType(e.target.value)}
                      label={"Includes Selected Days"}
                    />

                    <FilterCheckbox
                      value="only"
                      checked={daysType === "only"}
                      onChange={(e) => setDaysType(e.target.value)}
                      label={"Only Selected Days"}
                    />
                  </fieldset>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.classDayOptions.map((option) => (
                    <FilterCheckbox
                      type="checkbox"
                      value={option.value}
                      onChange={handleDayChange}
                      checked={days.includes(`${option.value}`)}
                      label={option.label}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="mt-4 md:mt-0 bg-white text-black px-4 py-2 rounded-md shadow hover:bg-zinc-200 hover:cursor-pointer"
          >
            Clear Filters
          </button>
        </div>

        {/* Courses */}
        <div className="col-span-1 md:col-span-3">
          {loading ? (
            <CourseSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseModal
                  id={course.crseId}
                  subject={course.subject}
                  number={course.catalogNbr}
                  title={course.titleLong}
                  desc={course.description}
                  enrollPrio={course.catalogEnrollmentPriority}
                  attrValueGroups={course.crseAttrValueGroups}
                  outcomes={course.catalogOutcomes}
                  enrollGroups={course.enrollGroups}
                  prereqs={course.catalogPrereq}
                  coreqs={course.catalogCoreq}
                  overlaps={course.catalogForbiddenOverlaps}
                  fees={course.catalogFees}
                  lastOffered={course.lastTermsOffered}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AuroraBackgroundSubjects>
  );
};

export default CourseListPage;
