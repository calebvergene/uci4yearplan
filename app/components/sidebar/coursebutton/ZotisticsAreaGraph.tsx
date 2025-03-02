"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CourseGrade } from "@/app/types"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface Props {
  courseName: string;
  data : CourseGrade[];
}

export function ZotisticsAreaGraph({courseName, data}:Props) {

  function aggregateGrades(data: CourseGrade[]) {
    // Initialize counters for all grade types
    const totals = {
      gradeACount: 0,
      gradeBCount: 0,
      gradeCCount: 0,
      gradeDCount: 0,
      gradeFCount: 0,
      gradePCount: 0,
      gradeNPCount: 0,
      gradeWCount: 0,
      totalStudents: 0,
      weightedGpaSum: 0,
      overallGpa: 0
    };
    
    // Sum up all the grade counts across all courses
    data.forEach(course => {
      totals.gradeACount += course.gradeACount || 0;
      totals.gradeBCount += course.gradeBCount || 0;
      totals.gradeCCount += course.gradeCCount || 0;
      totals.gradeDCount += course.gradeDCount || 0;
      totals.gradeFCount += course.gradeFCount || 0;
      totals.gradePCount += course.gradePCount || 0;
      totals.gradeNPCount += course.gradeNPCount || 0;
      totals.gradeWCount += course.gradeWCount || 0;
      
      // Calculate students with GPA impact (excluding P/NP and W)
      const studentsWithGpa = 
        course.gradeACount + 
        course.gradeBCount + 
        course.gradeCCount + 
        course.gradeDCount + 
        course.gradeFCount;
      
      // Add to weighted GPA sum (course GPA * number of students with grades)
      if (studentsWithGpa > 0 && course.averageGPA) {
        totals.weightedGpaSum += course.averageGPA * studentsWithGpa;
      }
    });
    
    // Calculate the total number of students with standard letter grades (A-F)
    const studentsWithLetterGrades = 
      totals.gradeACount + 
      totals.gradeBCount + 
      totals.gradeCCount + 
      totals.gradeDCount + 
      totals.gradeFCount;
    
    // Calculate total students (including P/NP and W)
    totals.totalStudents = 
      studentsWithLetterGrades + 
      totals.gradePCount + 
      totals.gradeNPCount + 
      totals.gradeWCount;
    
    // Calculate overall GPA
    if (studentsWithLetterGrades > 0) {
      // Method 1: Calculate from the weighted sum
      totals.overallGpa = totals.weightedGpaSum / studentsWithLetterGrades;
      
      // Method 2: Alternative calculation directly from grades
      const directGpaSum = 
        (totals.gradeACount * 4.0) + 
        (totals.gradeBCount * 3.0) + 
        (totals.gradeCCount * 2.0) + 
        (totals.gradeDCount * 1.0) + 
        (totals.gradeFCount * 0.0);
      
      totals.overallGpa = directGpaSum / studentsWithLetterGrades;
    }
    
  const totalGradeCount = totals.gradeACount + totals.gradeBCount + totals.gradeCCount + 
                          totals.gradeDCount + totals.gradeFCount + totals.gradePCount + 
                          totals.gradeNPCount + totals.gradeWCount;
  
  // Format output as an array of objects with percentages
  const formattedOutput = [
    { letter: "A", percentage: parseFloat(((totals.gradeACount / totalGradeCount) * 100).toFixed(1)) },
    { letter: "B", percentage: parseFloat(((totals.gradeBCount / totalGradeCount) * 100).toFixed(1)) },
    { letter: "C", percentage: parseFloat(((totals.gradeCCount / totalGradeCount) * 100).toFixed(1)) },
    { letter: "D", percentage: parseFloat(((totals.gradeDCount / totalGradeCount) * 100).toFixed(1)) },
    { letter: "F", percentage: parseFloat(((totals.gradeFCount / totalGradeCount) * 100).toFixed(1)) },
    { letter: "P", percentage: parseFloat(((totals.gradePCount / totalGradeCount) * 100).toFixed(1)) },
    { letter: "NP", percentage: parseFloat(((totals.gradeNPCount / totalGradeCount) * 100).toFixed(1)) },
  ];

  return {
    overallGpa: totals.overallGpa,
    aggregateGradesData: formattedOutput
  };
  }

  const result = aggregateGrades(data);

  return (
    <div>
      <div className="flex justify-center text-sm mt-3">
        <p>Average GPA: {result.overallGpa.toFixed(2)}</p>
      </div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={result.aggregateGradesData} margin={{top: 20}}>
          <CartesianGrid vertical={false} stroke="#d0d0d0" strokeOpacity={0.08} />
            <XAxis
              dataKey="letter"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="percentage" fill="#11B981" radius={4} >
            <LabelList
                position="top"
                offset={12}
                className="text-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
    </div>
  )
}
