export interface Vacancy {
  title: any;
  location: any;
  employer: any;
  _id: string;
  titleDetails: {
    shortName: string;
  };
  locationDetails: {
    locality: string;
  };
  employerDetails: {
    shortName: string;
  };
  employmentType: string;
  salary: number;
  postedDate: string;
  responsibilities: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
} 