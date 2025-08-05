import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CourseModal = ({
  id,
  subject,
  number,
  title,
  desc,
  enrollPrio,
  attrValueGroups,
  outcomes,
}) => {
  const [distrReqs, setDistrReqs] = useState("");

  // Load Distribution Requirements
  useEffect(() => {
    // Distribution Requirements
    const distrGroup = attrValueGroups?.find(
      (group) => group.attrDescr === "Distribution Requirements"
    );

    if (distrGroup) {
      setDistrReqs(distrGroup.crseAttrValues);
    }
  }, [attrValueGroups]);

  return (
    <Dialog>
      <DialogTrigger>
        <div key={id} className="course-box">
          <p className="text-xl font-semibold text-white truncate text-left">
            {subject} {number}
          </p>
          <p className="text-left text-sm text-slate-200 line-clamp-3">
            {title}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* Course Modal Title */}
          <DialogTitle>
            {subject} {number}: {title}
          </DialogTitle>

          <div className="flex flex-col gap-2">
            {/* Description */}
            {desc ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Course Description:
                </span>
                <p className="pl-5">{desc}</p>
              </DialogDescription>
            ) : (
              <DialogDescription>No Course Description</DialogDescription>
            )}
            {/* Enrollment */}
            {enrollPrio ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  {enrollPrio}
                </span>
              </DialogDescription>
            ) : null}
            {/* Distribution Requirements */}
            {distrReqs ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Distribution Requirements:
                </span>{" "}
                {distrReqs}
              </DialogDescription>
            ) : null}
            {/* Learning Outcomes */}
            {outcomes ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Learning Outcomes:
                </span>
                <ul className="list-disc text-sm text-zinc-600 pl-5">
                  {outcomes.map((outcome) => (
                    <li>{outcome}</li>
                  ))}
                </ul>
              </DialogDescription>
            ) : null}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
