const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper function to make API requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function generateData() {
  console.log('Fetching course data from API...');
  
  const courses = [];
  let nextCursor = null;
  let page = 1;
  let hasMoreData = true;
  
  // Fetch all courses using cursor pagination
  while (hasMoreData) {
    // Build the URL with cursor parameter if we have one
    let url = 'https://anteaterapi.com/v2/rest/coursesCursor';
    if (nextCursor) {
      url += `?cursor=${encodeURIComponent(nextCursor)}`;
    }
    console.log(url);
    
    console.log(`Fetching page ${page}...`);
    
    try {
      const response = await makeRequest(url);
      
      if (!response.ok) {
        console.error(`API returned error response:`, response);
        break; // Exit the loop but continue processing what we have
      }
      
      // Add the courses to our collection
      const newCourses = response.data.items;
      courses.push(...newCourses);
      
      // Update the cursor for the next page
      nextCursor = response.data.nextCursor;
      page++;
      
      console.log(`Retrieved ${newCourses.length} courses. Total: ${courses.length}`);
      
      // If no more pages or we got fewer courses than requested, we're done
      if (!nextCursor || newCourses.length === 0) {
        console.log('No more pages to fetch or reached the end.');
        hasMoreData = false;
      } else {
        // Optional: Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      hasMoreData = false; // Exit the loop but continue processing what we have
    }
  }
  
  console.log(`Finished fetching. Total courses: ${courses.length}`);
  
  // Process the data for search
  const courseSearchResults = [];
  const departmentMap = new Map();
  
  for (const course of courses) {
    // Add to course search data
    courseSearchResults.push({
      id: course.id,
      type: "COURSE",
      name: course.title,
      alias: null, // No aliases
      metadata: {
        department: course.department,
        number: course.courseNumber,
        units: course.minUnits === course.maxUnits ? 
          `${course.minUnits}` : 
          `${course.minUnits}-${course.maxUnits}`,
        school: course.school,
        level: course.courseLevel,
        description: course.description || "",
        geCategories: course.geList || []
      }
    });
    
    // Add to department data if not already present
    if (!departmentMap.has(course.department)) {
      departmentMap.set(course.department, {
        id: course.department,
        type: "DEPARTMENT",
        name: course.departmentName,
        alias: null, // No aliases
        school: course.school
      });
    }
  }
  
  // Convert department map to array
  const departmentSearchResults = Array.from(departmentMap.values());
  
  console.log(`Processed ${departmentSearchResults.length} departments and ${courseSearchResults.length} courses.`);
  
  // Create the output content
  const outputContent = `// Auto-generated file from API data
// Generated on ${new Date().toISOString()}
// Total courses: ${courseSearchResults.length}
// Total departments: ${departmentSearchResults.length}

export interface CourseSearchResult {
  id: string;
  type: "COURSE";
  name: string;
  alias: string | null;
  metadata: {
    department: string;
    number: string;
    units: string;
    school: string;
    level: string;
    description: string;
    geCategories: string[];
  };
}

export interface DepartmentSearchResult {
  id: string;
  type: "DEPARTMENT";
  name: string;
  alias: string | null;
  school: string;
}

export const departments: Array<DepartmentSearchResult> = ${JSON.stringify(departmentSearchResults, null, 2)};

export const courses: Array<CourseSearchResult> = ${JSON.stringify(courseSearchResults, null, 2)};
`;

  // Ensure the directory exists
  const outputDir = path.join(__dirname, 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the file
  fs.writeFileSync(path.join(outputDir, 'searchData.ts'), outputContent);
  console.log('Generated course data file at src/generated/searchData.ts');
}

// Run the function
generateData().catch(error => {
  console.error('Failed to generate data:', error);
  process.exit(1);
});