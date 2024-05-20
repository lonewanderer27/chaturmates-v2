import { StudentRegType } from ".";

export interface UpdateProfileInputs {
  fullName: string;
  description?: string;
  type: StudentRegType;
}