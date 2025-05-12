export interface Resume {
    skills: Skill[];
    workExperience: WorkExperience[];
    education: Education[];
    errors: ParsingError[];
  }
  
  export interface Skill {
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    context?: string;
  }
  
  export interface WorkExperience {
    company: string;
    role: string;
    startDate: string; // YYYY-MM
    endDate: string | 'Present';
    description: string;
  }
  
  export interface Education {
    institution: string;
    degree: string;
    major: string;
    graduationYear: number;
  }
  
  export interface ParsingError {
    field: string;
    message: string;
  }