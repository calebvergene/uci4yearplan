'use server'

export async function fetchMajorClasses(majorId: string) {
  const data = await fetch(`https://anteaterapi.com/v2/rest/programs/major?programId=${majorId}`);
  return data.json();
}