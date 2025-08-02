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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a Semester" />
      </SelectTrigger>
      <SelectContent>
        {rosters
          .slice()
          .reverse()
          .map((roster) => (
            <SelectItem key={roster.slug} value={roster.slug}>
              {roster.descr}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RosterSelect;
