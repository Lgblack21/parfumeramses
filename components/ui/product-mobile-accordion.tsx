"use client";

import { useState } from "react";

type Section = {
  title: string;
  items: string[];
};

export function ProductMobileAccordion({ sections }: { sections: Section[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-3 sm:hidden">
      {sections.map((section, index) => {
        const open = openIndex === index;
        return (
          <div key={section.title} className="border-t border-black/15">
            <button
              className="flex w-full items-center justify-between py-4 text-left"
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="font-serif text-2xl">{section.title}</span>
              <span className="text-xl">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <ul className="space-y-2 pb-4 text-sm leading-7 text-black/75">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
