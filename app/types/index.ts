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
}

export interface GroupRequirement {
  label: string;
  requirementType: string;
  requirementCount: number;
  requirements: Requirement[];
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

export interface Course {
    id: string;
    name: string;
  }
  
export interface Quarter {
    id: string;
    courses: Course[];
  }
  
export interface Year {
    id: string;
    quarters: Quarter[];
  }