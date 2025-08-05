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
}) => {
  const [distrReqs, setDistrReqs] = useState("");

  // Load Distribution Requirements
  useEffect(() => {
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
          <DialogTitle>
            {subject} {number}: {title}
          </DialogTitle>
          {desc ? (
            <DialogDescription>{desc}</DialogDescription>
          ) : (
            <DialogDescription>No Course Description</DialogDescription>
          )}
          {enrollPrio ? (
            <DialogDescription>{enrollPrio}</DialogDescription>
          ) : null}
          {distrReqs ? (
            <DialogDescription>
              Distribution Requirements: {distrReqs}
            </DialogDescription>
          ) : null}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
