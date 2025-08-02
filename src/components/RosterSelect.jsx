import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RosterSelect = ({ rosters, value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[12rem] px-[0.75rem] py-[1.25rem] text-gray-300 text-base data-[placeholder]:text-gray-300 bg-black/30 hover:bg-black/50 rounded-md border border-gray-300 focus-visible:border-gray-300 focus-visible:ring-gray-300/50 hover:cursor-pointer">
        <SelectValue placeholder="Choose a Semester" />
      </SelectTrigger>
      <SelectContent
        className="bg-black/30"
        side="bottom"
        position="popper"
        sideOffset={4}
        avoidCollisions={false}
      >
        {rosters
          .slice()
          .reverse()
          .map((roster) => (
            <SelectItem
              className="text-gray-300 hover:cursor-pointer"
              key={roster.slug}
              value={roster.slug}
            >
              {roster.descr}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RosterSelect;
