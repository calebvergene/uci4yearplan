export interface Major {
    id: string,
    name: string,
    type: string,
    division: string,
    specializations: string[],
}
export interface Requirement {
  label: string;
  requirementType: string;
  courseCount: number;
  courses: string[];
  requirements?: Requirement[];
}

export interface GroupRequirement {
  label: string;
  requirementType: string;
  requirementCount: number;
  requirements: Requirement[];
}

export interface GroupGroupRequirement {
  label: string;
  requirementType: string;
  requirementCount: number;
  requirements: (GroupRequirement | Requirement)[];
}

export interface MajorData {
    id: string;
    name: string;
    requirements: Requirement[];
}

export interface ApiResponse {
    ok: boolean;
    data: MajorData;
}
  
export interface Quarter {
    id: string;
    name?: string;
    courses: string[];
  }
  
export interface Year {
    id: string;
    yearNumber?: string;
    quarters: Quarter[];
  }



// Just for button

export interface Instructor {
  ucinetid: string;
  name: string;
  title: string;
  email: string;
  department: string;
  shortenedNames: string[];
}

export interface PrerequisiteCourse {
  id: string;
  title: string;
  department: string;
  courseNumber: string;
}

export interface PrerequisiteNode {
  prereqType: string;
  coreq: boolean;
  courseId: string;
  minGrade: string;
}

export interface PrerequisiteTree {
  AND?: PrerequisiteNode[];
  OR?: PrerequisiteNode[];
  NOT?: PrerequisiteNode[];
}

export interface CourseData {
  id: string;
  department: string;
  courseNumber: string;
  courseNumeric: number;
  school: string;
  title: string;
  courseLevel: string;
  minUnits: number;
  maxUnits: number;
  description: string;
  departmentName: string;
  instructors: Instructor[];
  prerequisiteTree: PrerequisiteTree;
  prerequisiteText: string;
  prerequisites: PrerequisiteCourse[];
  dependencies: PrerequisiteCourse[];
  repeatability: string;
  gradingOption: string;
  concurrent: string;
  sameAs: string;
  restriction: string;
  overlap: string;
  corequisites: string;
  geList: string[];
  geText: string;
  terms: string[];
}

export interface CourseResponse {
  ok: boolean;
  data: CourseData;
}

export interface CourseGrade {
  department: string;
  courseNumber: string;
  instructor: string;
  gradeACount: number;
  gradeBCount: number;
  gradeCCount: number;
  gradeDCount: number;
  gradeFCount: number;
  gradePCount: number;
  gradeNPCount: number;
  gradeWCount: number;
  averageGPA: number;
}

export interface CourseGradesResponse {
  ok: boolean;
  data: CourseGrade[];
}