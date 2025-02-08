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

export interface MajorData {
    id: string;
    name: string;
    requirements: Requirement[];
}

export interface ApiResponse {
    ok: boolean;
    data: MajorData;
}