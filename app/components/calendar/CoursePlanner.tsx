"use client";

import { Year } from "../../types/index";
import YearCard from "./YearCard";

const CoursePlanner = ({ years }: { years: Year[] }) => {

  return (
      <div className="p-4 h-[90vh] overflow-y-scroll">
        {years.map((year: Year) => (
          <YearCard key={year.id} year={year}/>
        ))}
      </div>
  );
};

export default CoursePlanner;