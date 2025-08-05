import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const SubjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <h2 className="w-fit text-3xl font-extrabold text-white px-4 py-2" />
      <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

      <div className="relative flex items-center">
        <MdChevronLeft
          onClick={() => slideLeft(`slider-${letter}`)}
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100 text-white"
        />
        <div className="flex w-full h-full py-[1rem] overflow-x-scroll scroll scroll-smooth scrollbar-hide overflow-hidden">
          <div className="subject-box" />
          <div className="subject-box" />
          <div className="subject-box" />
          <div className="subject-box" />
          <div className="subject-box" />
          <div className="subject-box" />
        </div>
        <MdChevronRight
          onClick={() => slideRight(`slider-${letter}`)}
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100 text-white"
        />
      </div>
    </div>
  );
};

export default SubjectSkeleton;
