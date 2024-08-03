import axios, { AxiosResponse } from "axios";
import { CourseType, GroupMemberType, GroupType, ProfileType, StudentType } from "../types";

// @ts-ignore
export interface RecommendedStudentType extends StudentType {
  course: CourseType,
  profile: ProfileType
}

interface RecommendGroupMemberType extends GroupMemberType {
  profile: ProfileType,
  student: StudentType,
}

export interface RecommendGroupType extends GroupType {
  courseContent: CourseType,
  group_members: RecommendGroupMemberType[]
}

const recommend = axios.create({
  baseURL: import.meta.env.VITE_RECOMMEND_BACKEND,
});

const RecommendService = {
  async getStudents(profileId: string) {
    const res: AxiosResponse<{
      students: RecommendedStudentType[];
    }> = await recommend.get(`/students/pid/${profileId}`);

    return res.data;
  },
  async getGroups(profileId: string) {
    const res: AxiosResponse<{
      groups: RecommendGroupType[];
    }> = await recommend.get(`/groups/pid/${profileId}`)

    return res.data;
  },
};

export default RecommendService;
