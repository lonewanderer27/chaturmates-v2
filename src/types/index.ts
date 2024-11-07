import { Database, Tables } from "./supabase";

export type FollowType = Database["public"]["Tables"]["student_followers"]["Row"];

export type StudentType = Database["public"]["Tables"]["students"]["Row"];

export type StudentRegType = Database['public']['Enums']['student_type']

export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];
export type SearchHistoryType = Database["public"]["Tables"]["search_history"]["Row"];

export type GroupType = Database["public"]["Tables"]["groups"]["Row"];
export type GroupMemberType = Database["public"]["Tables"]["group_members"]["Row"];

export type GroupChatUrlType = Database["public"]["Tables"]["group_chat_urls"]["Row"];
export type GroupPostType = Database["public"]["Tables"]["group_posts"]["Row"];
export type GroupCommentType = Database["public"]["Tables"]["group_comments"]["Row"];
export type GroupRuleType = Database["public"]["Tables"]["group_rules"]["Row"];

export type ThreadType = Database["public"]["Tables"]["threads"]["Row"];
export type ThreadMessageType = Database["public"]["Tables"]["threads_messages"]["Row"];

export type CollegeType = Database["public"]["Tables"]["colleges"]["Row"];
export type CourseType = Database["public"]["Tables"]["courses"]["Row"];
export type SubjectType = Database["public"]["Tables"]["subjects"]["Row"];
export type HobbyType = Database["public"]["Tables"]["hobbies"]["Row"];
export type HobbyCategoryType = Database["public"]["Tables"]["hobbies_category"]["Row"];
export type ClassType = Tables<"classes">;
export type CrowdSourcedProfType = Database["public"]["Tables"]["crowd_sourced_professors"]["Row"];
export type OtpCodeType = Tables<"otp_codes">;

export type SchoolType = Tables<"schools">;
export type AcademicYearType = Tables<"academic_years">;

export type RemoteConfigType = Database["public"]["Tables"]["remote_configs"]["Row"];