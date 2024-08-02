import React from 'react'
import useAmIAMember from './useAmIAMember'
import client from '../../client';
import useSelfStudentLite from '../student/useSelfStudentLite';

const useToggleJoin = (groupVanityUrl: string, groupId: string) => {
  const { data:amimember, refetch } = useAmIAMember(groupVanityUrl);
  const { profile } = useSelfStudentLite();

  const toggleJoin = async () => {
    const res = await client
    .from("group_members")
    .insert({
      student_id: profile?.student[0].id!,
      profile_id: profile?.id!,
      group_id: Number(groupId!),
      group_vanity_id: groupVanityUrl!,
      is_admin: false,
      approved: false,
      creator: false,
    })
    
  }

  return {
    amimember,
    toggleJoin
  }
}

export default useToggleJoin