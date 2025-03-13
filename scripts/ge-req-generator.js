const fs = require('fs');
const path = require('path');

function makeRequest(url) {
    try {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data.data.requirements);
                return data.data.requirements;
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
                process.exit(1);   
            });
    } catch (error) {
        console.error('Error in makeRequest:', error);
        process.exit(1);
    }
}

function flattenStructure(data) {
    return data.map(groupGroup => {
        // Check if this is a "Select 1 of the following" category
        if (groupGroup.label === "Select 1 of the following") {
            // Identify if this is category VI or VIII based on the requirements
            let categoryPrefix = null;
            let categoryName = null;
            
            // Look through requirements to determine which category this is
            for (const req of groupGroup.requirements) {
                if (req.label.startsWith("VI.")) {
                    categoryPrefix = "VI";
                    categoryName = "VI. Language Other Than English";
                    break;
                } else if (req.label.startsWith("VIII.")) {
                    categoryPrefix = "VIII";
                    categoryName = "VIII. International/Global Issues";
                    break;
                }
            }
            
            if (categoryPrefix && categoryName) {
                // Get all non-marker direct requirements
                let flatRequirements = [];
                
                // For Category VI: Get the direct course requirement
                if (categoryPrefix === "VI") {
                    const courseReq = groupGroup.requirements.find(req => 
                        req.requirementType === "Course" && req.label.includes("Language Other Than English")
                    );
                    
                    if (courseReq) {
                        // Create a new requirement with a more consistent label
                        flatRequirements.push({
                            "label": "1 course category VI",
                            "requirementType": "Course",
                            "courseCount": courseReq.courseCount,
                            "courses": courseReq.courses
                        });
                    }
                }
                // For Category VIII: Find the group requirement and extract its contents
                else if (categoryPrefix === "VIII") {
                    const groupReq = groupGroup.requirements.find(req => 
                        req.requirementType === "Group" && req.label.includes("International/Global Issues")
                    );
                    
                    if (groupReq && groupReq.requirements) {
                        // Use the requirements from the nested group directly
                        flatRequirements = groupReq.requirements;
                    }
                }
                
                // Create the new flattened category
                return {
                    "label": categoryName,
                    "requirementType": "Group",
                    "requirementCount": 1,
                    "requirements": flatRequirements
                };
            }
        }
        
        return groupGroup;
    });
}

function filterOutMarkers(data) {
    // First flatten the nested structure
    const flattenedData = flattenStructure(data);
    
    // Then filter out marker requirements
    return flattenedData.map(groupGroup => {
      return {
        ...groupGroup,
        requirements: groupGroup.requirements
          .filter(req => req.requirementType !== "Marker")
          .map(req => {
            if (req.requirementType === "Group" && 'requirements' in req) {
              return {
                ...req,
                requirements: req.requirements.filter(
                  subReq => subReq.requirementType !== "Marker"
                )
              };
            }
            return req;
          })
      };
    });
}

async function generateData() {
    let result = await makeRequest('https://anteaterapi.com/v2/rest/programs/ugradRequirements?id=GE');
    result = filterOutMarkers(result);
    const outputContent = `// Auto-generated file from API GE data
// Generated on ${new Date().toISOString()}


export const geReqsData = ${JSON.stringify(result, null, 2)};
`;

    const outputDir = path.join(__dirname, 'generated');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the file
    fs.writeFileSync(path.join(outputDir, 'geData.ts'), outputContent);
    console.log('Generated course data file at src/generated/geData.ts');
}

// Run the function
generateData().catch(error => {
    console.error('Failed to generate data:', error);
    process.exit(1);
});