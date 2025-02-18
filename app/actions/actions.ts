'use server'

export async function fetchMajorClasses(majorId: string) {
  const data = await fetch(`https://anteaterapi.com/v2/rest/programs/major?programId=${majorId}`);
  return data.json();
}

export async function fetchCourseData(courseId: string) {
  const data = await fetch(`https://anteaterapi.com/v2/rest/courses/${courseId}`);
  return data.json();
}