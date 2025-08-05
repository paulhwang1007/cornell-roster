import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import FilterCheckbox from "./FilterCheckbox";

const CheckboxGroupAccordion = ({ id, title, options, selected, onChange }) => {
  return (
    <AccordionItem value={id} className="text-white">
      <AccordionTrigger className="hover:cursor-pointer">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          <div className="flex flex-col gap-3 p-2">
            {options.map((option) => (
              <FilterCheckbox
                type="checkbox"
                key={option.value}
                value={option.value}
                onChange={onChange}
                checked={selected.includes(option.value)}
                label={option.label}
                class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-white/20 border-slate-300 checked:bg-white checked:border-white"
              />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CheckboxGroupAccordion;
