import { CollegeType, CourseType, GroupChatUrlType, GroupMemberType, GroupType, StudentType } from "../types";

import client from "../client";

export interface CreateGroupInputs {
  academic_year_id: number;
  avatar_url: string | null;
  course: number;
  cover_url: string | null;
  description: string | null;
  name: string;
  school: number;
  semester: number;
  vanity_id: string;
}

export interface GroupsResponse {
  getAll: {
    data: {
      groups: GroupResponse["get"]["data"]["group"][];
    };
    message: string;
    success: boolean;
    error: any;
  };
}

export interface ExpandedGroupMemberType extends GroupMemberType {
  students: StudentType
}

export interface GroupResponse {
  get: {
    data: {
      group: GroupType & {
        memberCount?: number;
        group_members: ExpandedGroupMemberType[];
      };
      chat_urls: GroupChatUrlType[];
      college?: CollegeType;
      course?: CourseType;
      members: {
        all: GroupMemberType[];
        approved: GroupMemberType[];
        pending: GroupMemberType[];
      };
      admins?: StudentType[];
      students: {
        all: StudentType[];
        approved: StudentType[];
        pending: StudentType[];
      };
    };
    message: string;
    success: boolean;
    error: any;
  };
  students: {
    getAll: {
      data: {
        group: GroupType;
        students: {
          all: StudentType[];
          approved: StudentType[];
          pending: StudentType[];
        };
      };
    };
  };
}

export async function getAllGroups(): Promise<GroupsResponse["getAll"]> {
  const groups = await client
    .from("groups")
    .select("*, group_members(*, students(*))")
    .eq("admin_uni_group", false);

  console.log("groups: ", groups.data);

  return Promise.resolve({
    data: {
      groups: groups.data!,
    },
    message: "Groups fetched successfully",
    error: null,
    success: true,
  });
}

export async function getGroupById(id: string): Promise<GroupResponse["get"]> {
  const group = await client
    .from("groups")
    .select("*, group_members(*, students(*))")
    .eq("id", id)
    .eq("admin_uni_group", false)
    .single();

  if (!group) {
    return Promise.reject("Group not found");
  }

  return await getGroupByVanityUrl(group.data!.vanity_id);
}

export async function getGroupByVanityUrl(
  vanity_id: string
): Promise<GroupResponse["get"]> {
  const group = await client
    .from("groups")
    .select("*, group_members(*)")
    .eq("vanity_id", vanity_id)
    .single();

  if (!group) {
    return Promise.reject("Group not found");
  }

  console.log("group: ", group.data);

  // fetch the college from the database
  const college = await client
    .from("colleges")
    .select("*")
    .eq("id", group.data?.college! ?? undefined)
    .single();

  // fetch the course from the database
  const course = await client
    .from("courses")
    .select("*")
    .eq("id", group.data?.course! ?? undefined)
    .single();

  // fetch the group members from the database
  const groupMembers = group.data!.group_members;

  // fetch the approved group members from the database
  const approvedGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id)
    .eq("approved", true);

  // fetch the pending group members from the database
  const pendingGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id)
    .eq("approved", false);

  // fetch the students based on the group members from the database
  const students = await client
    .from("students")
    .select("*")
    .in(
      "id",
      groupMembers!.map((groupMember) => groupMember.student_id)
    );

  // fetch the students based on the approved group members from the database
  const approvedStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      approvedGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the students based on the pending group members from the database
  const pendingStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      pendingGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the group chat urls from the database
  const groupChatUrls = await client
    .from("group_chat_urls")
    .select("*")
    .eq("group_id", group.data!.id);

  // fetch the group posts from the database
  const groupPosts = await client
    .from("group_posts")
    .select("*")
    .eq("group_id", group.data!.id);

  // fetch the admin ids of the group from the database
  const adminIds = await client
    .from("group_members")
    .select("*")
    .eq("is_admin", true)
    .eq("group_id", group.data!.id);

  // fetch the admin members of the group from the database
  const admins = await client
    .from("group_members")
    .select("*")
    .in(
      "id",
      adminIds.data!.map((adminId) => adminId.student_id)
    );

  // fetch the admin students of the group from the database
  const adminStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      admins.data!.map((admin) => admin.student_id)
    );

  console.log("approved members count: ", approvedStudents.data?.length);

  // return the group, members, admins, students, chat urls, and posts
  return Promise.resolve({
    data: {
      group: {
        ...group.data!,
        memberCount: approvedStudents.data?.length,
      },
      college: college.data ?? undefined,
      course: course.data ?? undefined,
      chat_urls: groupChatUrls.data!,
      posts: groupPosts.data!,
      members: {
        all: groupMembers!,
        approved: approvedGroupMembers.data!,
        pending: pendingGroupMembers.data!,
      },
      admins: adminStudents.data!,
      students: {
        all: students.data!,
        approved: approvedStudents.data!,
        pending: pendingStudents.data!,
      },
    },
    message: "Group fetched successfully",
    error: null,
    success: true,
  });
}
