'use server'


export async function fetchMajorClasses(majorId: string) {
  const data = await fetch(`https://anteaterapi.com/v2/rest/programs/major?programId=${majorId}`);
  return data.json();
}

export async function fetchMinorClasses(minorId: string) {
  const data = await fetch(`https://anteaterapi.com/v2/rest/programs/minor?programId=${minorId}`);
  return data.json();
}

export async function fetchCourseData(courseId: string) {
  const data = await fetch(`https://anteaterapi.com/v2/rest/courses/${courseId}`);
  return data.json();
}


export async function fetchZotisticsData(courseName: string) {

  // split Coursename by department and course number
  let courseDepartment: string;
  let courseNumber: string;

  const lastDigitIndex = courseName.search(/\d[^\d]*$/);
  if (lastDigitIndex === -1) {
    throw new Error("Invalid course name format: No numbers found");
  }
  
  let firstDigitOfLastSequence = lastDigitIndex;
  while (
    firstDigitOfLastSequence > 0 && 
    /\d/.test(courseName[firstDigitOfLastSequence - 1])
  ) {
    firstDigitOfLastSequence--;
  }
  
  if (firstDigitOfLastSequence > 0) {
    courseDepartment = courseName.substring(0, firstDigitOfLastSequence).trim();
    courseNumber = courseName.substring(firstDigitOfLastSequence).trim();
  } else {
    throw new Error("Invalid course name format: Cannot separate department and number");
  }

  const years = [2022, 2023, 2024, 2025];
  const yearParams = years.map(year => `year[]=${year}`).join('&');
  const quarters = ["Fall", "Winter", "Spring", "Summer1", "Summer10wk", "Summer2"];
  const quarterParams = quarters.map(quarter => `quarter[]=${quarter}`).join('&');
  const url = `https://anteaterapi.com/v2/rest/grades/aggregateByOffering?${yearParams}&${quarterParams}&department=${courseDepartment}&courseNumber=${courseNumber}`;
  console.log(url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}
