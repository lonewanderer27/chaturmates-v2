export interface RealGroup {
  group_id: number,
  group_name: string,
  group_subjects: string[],
  year_level: number[],
  block: string,
  group_members: any[]
}

export interface RealGroupsRes {
  student_id: number,
  group_ids: number[],
  groups: RealGroup[]
}