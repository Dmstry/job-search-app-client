export interface Vacancy {
  _id: string;
  titleDetails: {
    shortName: string;
    name: string;
  };
  locationDetails: {
    locality: string;
    region: string;
    district: string;
  };
  employerDetails: {
    shortName: string;
    name: string;
  };
  employmentType: string;
  salary: number;
  postedDate: string;
  responsibilities: string;
  schedule: string;
  educationRequirements: string;
  hasHigherEducation: boolean;
  educationDegree: string | null;
  hasExperience: boolean;
  experience: string | null;
  contactDetails: {
    phone: string;
    phoneHR?: string;
    email?: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
} 