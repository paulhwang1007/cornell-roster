import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "../utils/cn";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const CourseModal = ({
  id,
  subject,
  number,
  title,
  desc,
  enrollPrio,
  attrValueGroups,
  outcomes,
  enrollGroups,
  prereqs,
  coreqs,
  overlaps,
  fees,
  lastOffered,
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

            {/* Prereqs */}
            {prereqs ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Prerequisites:
                </span>
                <p className="pl-5">{prereqs}</p>
              </DialogDescription>
            ) : null}

            {/* Coreqs */}
            {coreqs ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Corequisites:
                </span>
                <p className="pl-5">{coreqs}</p>
              </DialogDescription>
            ) : null}

            {/* Forbidden Overlaps */}
            {overlaps ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Forbidden Overlaps:
                </span>
                <p className="pl-5">{overlaps}</p>
              </DialogDescription>
            ) : null}

            {/* Fees */}
            {fees ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Course Fees:
                </span>
                <p className="pl-5">{fees}</p>
              </DialogDescription>
            ) : null}

            {/* Enrollment */}
            {enrollPrio ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Enrollment Information:
                </span>
                <p className="pl-5">{enrollPrio}</p>
              </DialogDescription>
            ) : null}

            {/* Distribution Requirements */}
            {distrReqs ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Distribution Requirements:
                </span>{" "}
                <p className="pl-5">{distrReqs}</p>
              </DialogDescription>
            ) : null}

            {/* Last Terms Offered */}
            {lastOffered ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Last 4 Terms Offered:
                </span>
                <p className="pl-5">{lastOffered}</p>
              </DialogDescription>
            ) : null}

            {/* Learning Outcomes */}
            {outcomes ? (
              <DialogDescription>
                <span className="mt-4 font-semibold text-zinc-800">
                  Learning Outcomes:
                </span>
                <ul className="list-disc text-base text-zinc-600 pl-5">
                  {outcomes.map((outcome) => (
                    <li>{outcome}</li>
                  ))}
                </ul>
              </DialogDescription>
            ) : null}
          </div>
        </DialogHeader>
        <div>
          {enrollGroups?.map((enrollGroup, index) => (
            <div key={index}>
              {enrollGroup.unitsMinimum == enrollGroup.unitsMaximum ? (
                <p className="mt-4 font-semibold text-zinc-800">
                  Credits: {enrollGroup.unitsMaximum}
                </p>
              ) : (
                <p className="mt-4 font-semibold text-zinc-800">
                  Credits: {enrollGroup.unitsMinimum} -{" "}
                  {enrollGroup.unitsMaximum}
                </p>
              )}
              {enrollGroup.classSections?.map((classSection) => (
                <div
                  key={classSection.classNbr}
                  //   Temp style
                  className={cn(
                    "flex flex-col justify-between border-2 border-l-6 rounded-lg shadow-md m-2 py-2 px-3 min-h-28 h-fit",
                    classSection.openStatus === "O"
                      ? "border-green-500"
                      : "border-red-500"
                  )}
                >
                  <div className="flex font-semibold justify-between items-center">
                    {classSection.addConsent === "N" ? (
                      <p>
                        {classSection.ssrComponent} {classSection.section}
                      </p>
                    ) : (
                      <p>
                        {classSection.ssrComponent} {classSection.section}{" "}
                        <span className="font-medium">
                          - {classSection.addConsentDescr}
                        </span>
                      </p>
                    )}

                    {classSection.openStatus === "O" ? (
                      <div className="flex items-center gap-1">
                        <p>Open</p>
                        <FaCheckCircle className="text-green-500 w-5 h-5" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <p>Closed</p>
                        <IoIosCloseCircle className="text-red-500 w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Pattern, Time, Dates */}
                  {classSection.meetings?.map((meeting) => (
                    <div
                      key={meeting.classMtgNbr}
                      className="flex flex-wrap text-zinc-600"
                    >
                      <div className="flex justify-between w-full">
                        {meeting.pattern?.length > 0 ||
                        meeting.timeStart?.length > 0 ? (
                          <p>
                            {meeting.pattern}{" "}
                            <span className="text-zinc-300">|</span>{" "}
                            {meeting.timeStart} - {meeting.timeEnd}
                          </p>
                        ) : (
                          <p>TBD</p>
                        )}
                        <p>
                          {meeting.startDt} - {meeting.endDt}
                        </p>
                      </div>

                      {/* Instructors || Staff */}
                      <div className="flex w-full justify-between">
                        <div className="flex gap-1">
                          {meeting.instructors?.length > 0 ? (
                            meeting.instructors.map((instructor) => (
                              <div key={instructor.instrAssignSeq}>
                                <p>
                                  {instructor.firstName} {instructor.middleName}{" "}
                                  {instructor.lastName} ({instructor.netid})
                                </p>
                              </div>
                            ))
                          ) : (
                            <p>Staff</p>
                          )}
                        </div>
                        <p>
                          {enrollGroup.gradingBasisLong},{" "}
                          {classSection.instrModeDescr}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
