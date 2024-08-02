import { useAtom, useSetAtom } from 'jotai';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GroupsResponse } from '../../services/groups';
import client from '../../client';
import { groupsResultsAtom } from '../../atoms/search';

export default function useGroupSearch() {
  const [groupsResults, setGroupsResults] = useAtom(groupsResultsAtom);
  const queryClient = useQueryClient();

  const fetchGroups = async () => {
    const response = await client
      .from('groups')
      .select('*, group_members!group_members_group_id_fkey(*)')
      .eq('admin_uni_group', false)
      .eq("deleted", false)
      .order('created_at', { ascending: true });
    setGroupsResults(response.data as GroupsResponse['getAll']['data']['groups']);
    return response.data as GroupsResponse['getAll']['data']['groups'];
  };
  
  const searchGroups = async (query: string) => {
    const response = await client
      .from('groups')
      .select('*, group_members!group_members_group_id_fkey(*)')
      .ilike('name', `%${query}%`)
      .eq('admin_uni_group', false)
      .order('created_at', { ascending: true });
    return response.data as GroupsResponse['getAll']['data']['groups'];
  };

  // Initial fetch
  const { data, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  });

  const handleGroupSearch = async (query: string) => {
    if (query.length === 0) {
      queryClient.invalidateQueries({
        queryKey: ['groups'],
      });
    } else {
      const data = await searchGroups(query);
      setGroupsResults(data ?? []);
    }
  };

  return {
    handleGroupSearch,
    groupsResults: groupsResults ?? [],
    isLoading,
    error,
  };
}
