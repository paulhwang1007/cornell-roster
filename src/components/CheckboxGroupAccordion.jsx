import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const CheckboxGroupAccordion = ({ id, title, options, selected, onChange }) => {
  return (
    <AccordionItem value={id} className="text-white">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="block text-sm space-x-2">
              <input
                type="checkbox"
                value={option.value}
                onChange={onChange}
                checked={selected.includes(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CheckboxGroupAccordion;
