import { AcademicYearType, FollowType, GroupType, SchoolType, StudentType } from "../types";

import { GroupResponse } from "./groups";
import client from "../client";

export interface StudentsResponse {
  getAll: {
    data: StudentResponse['get']['data'][],
    error: any;
    success: boolean;
    message: string;
  }
}

export interface StudentResponse {
  get: {
    data: {
      student: StudentType;
      groups: GroupResponse['get']['data']['group'][];
      followers: StudentType[];
      following: StudentType[];
      school: SchoolType;
      academic_year: AcademicYearType;
    };
    error: any;
    success: boolean;
    message: string;
  };
  getByProfileId: {
    data: {
      student: StudentType;
      groups: GroupType[];
      followers: StudentType[];
      following: StudentType[];
    };
    error: any;
    success: boolean;
    message: string;
  };
  groups: {
    getAll: {
      data: {
        student: StudentType;
        groups: GroupResponse['get']['data']['group'][];
      };
      error: any;
      success: boolean;
      message: string;
    };
    create: {
      data: {
        group: GroupType;
      };
      error: any;
      success: boolean;
      message: string;
    };
  };
  followers: {
    getAll: {
      data: {
        student: StudentType;
        followers: StudentType[];
      };
      error: any;
      message: string;
      success: boolean;
    };
    follow: {
      data: {
        student: StudentType;
      };
      error: any;
      message: string;
      success: boolean;
    };
  };
  following: {
    getAll: {
      data: {
        student: StudentType;
        following: StudentType[];
      };
      error: any;
      message: string;
      success: boolean;
    },
    follow: {
      data: {
        student: FollowType;
      };
      error: any;
      message: string;
      success: boolean;
    }
    unfollow: {
      error: any;
      message: string;
      success: boolean;
    }
  };
  otp: {
    generate: {
      data: {
        code: string;
      }
      message: string;
      success: boolean;
      error: any;
    }
  }
}


export async function getAllStudents() {
  const response = await client
      .from("students")
      .select("*")
      .order("avatar_url", {nullsFirst: false})
  return Promise.resolve({
    data: {
      students: response.data!,
    },
    message: "Students fetched successfully",
    error: null,
    success: true,
  });
}

export async function getStudentById(
    id: string
): Promise<StudentResponse["get"]> {
  console.log("student id: ", id);

  // verify if the student exists
  const student = await client
      .from("students")
      .select("*, schools(*), academic_years(*)")
      .eq("id", id)
      .single();

  // if student is not found, reject the promise
  if (!student) {
    return Promise.reject("Student not found");
  }

  // fetch the follower ids of the student from the database
  const followerIds = await client
      .from("student_followers")
      .select("*")
      .eq("following_id", id);

  // fetch the followers of the student from the database
  const followers = await client
      .from("students")
      .select("*")
      .in(
          "id",
          followerIds.data!.map((followerId) => followerId.follower_id)
      );

  // fetch the following ids of the student from the database
  const followingIds = await client
      .from("student_followers")
      .select("*")
      .eq("follower_id", id);

  // fetch the following of the student from the database
  const following = await client
      .from("students")
      .select("*")
      .in(
          "id",
          followingIds.data!.map((followingId) => followingId.following_id)
      );

  // fetch the group ids of the student from the database
  const group_ids = await client
      .from("group_members")
      .select("*")
      .eq("student_id", id);

  // fetch the groups of the student from the database
  const groups = await client
      .from("groups")
      .select("*, group_members!group_members_group_id_fkey(*)")
      .in(
          "id",
          group_ids.data!.map((group_id) => group_id.group_id)
      );

  // return the student, followers, following, and groups
  // @ts-ignore
  return Promise.resolve({
    data: {
      student: student.data!,
      academic_year: student.data!.academic_years,
      followers: followers.data!,
      following: following.data!,
      groups: groups.data!,
      school: student.data!.schools,
    },
    message: "Student found",
    success: true,
    error: null,
  });
}
