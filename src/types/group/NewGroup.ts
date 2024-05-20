export interface NewGroupInputs {
  step1: {
    name: string;
    description: string;
  };
  step2: {
    avatar_url?: string;
    cover_url?: string;
    vanity_id: string;
  };
  step3: {
    school: number;
    course: number;
    college: number;
    semester: number;
    academic_year_id: number;
  };
}
