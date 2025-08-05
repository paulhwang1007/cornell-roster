import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AuroraBackgroundSubjects } from "../components/backgroundSubjects";
import SubjectSkeleton from "../components/SubjectSkeleton";

const SubjectListPage = () => {
  const { semester } = useParams();

  const [subjectsByLetter, setSubjectsByLetter] = useState({});
  const [loading, setLoading] = useState(true);

  // --- Fetch + Process Subjects ---
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://classes.cornell.edu/api/2.0/config/subjects.json?roster=${semester}`
      );
      const data = await response.json();
      const subjects = data.data.subjects;

      // Sort A-Z
      subjects.sort((a, b) => a.value.localeCompare(b.value));

      // Group by first letter
      const grouped = {};
      subjects.forEach((subject) => {
        const firstLetter = subject.value[0].toUpperCase();
        if (!grouped[firstLetter]) grouped[firstLetter] = [];
        grouped[firstLetter].push(subject);
      });

      setSubjectsByLetter(grouped);
    } catch (error) {
      console.error("Error fetching subjects: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [semester]);

  // --- Horizontal Scrolling ---
  const slideLeft = (sliderId) => {
    const slider = document.getElementById(sliderId);
    if (slider) slider.scrollLeft -= 500;
  };

  const slideRight = (sliderId) => {
    const slider = document.getElementById(sliderId);
    if (slider) slider.scrollLeft += 500;
  };

  return (
    <AuroraBackgroundSubjects>
      <div className="w-full max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Subjects for {semester}
        </h1>
        <Link to={"/"}>
          <button className="mt-4 md:mt-0 bg-white text-black px-4 py-2 rounded-md shadow hover:bg-zinc-200 hover:cursor-pointer">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Subjects Grid */}
      <div className="flex flex-col gap-4 px-24">
        {loading ? (
          <>
            <SubjectSkeleton />
            <SubjectSkeleton />
            <SubjectSkeleton />
            <SubjectSkeleton />
          </>
        ) : (
          Object.keys(subjectsByLetter)
            .sort()
            .map((letter) => (
              <div key={letter}>
                <h2 className="w-fit text-3xl font-extrabold text-white px-4 py-2">
                  {letter}
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div className="relative flex items-center">
                  <MdChevronLeft
                    onClick={() => slideLeft(`slider-${letter}`)}
                    size={40}
                    className="opacity-50 cursor-pointer hover:opacity-100 text-white"
                  />
                  <div
                    id={`slider-${letter}`}
                    className="flex w-full h-full py-[1rem] overflow-x-scroll scroll scroll-smooth scrollbar-hide overflow-hidden"
                  >
                    {subjectsByLetter[letter].map((subject) => (
                      <Link
                        to={`/${semester}/${subject.value}`}
                        key={subject.value}
                        className="flex flex-col flex-shrink-0 w-[250px] h-36 bg-white/15 backdrop-blur-md border border-white/30 rounded-lg shadow-md p-4 mx-1 hover:scale-[1.03] hover:shadow-lg transition-transform duration-200 justify-between"
                      >
                        <p className="text-xl font-semibold text-white truncate">
                          {subject.value}
                        </p>
                        <p className="text-left text-sm text-slate-200 line-clamp-3">
                          {subject.descrformal}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <MdChevronRight
                    onClick={() => slideRight(`slider-${letter}`)}
                    size={40}
                    className="opacity-50 cursor-pointer hover:opacity-100 text-white"
                  />
                </div>
              </div>
            ))
        )}
      </div>
    </AuroraBackgroundSubjects>
  );
};

export default SubjectListPage;
