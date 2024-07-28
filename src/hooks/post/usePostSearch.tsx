import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GroupPostTypeWGroupInfo } from '../../types/group/Post';
import client from '../../client';
import { groupPostsResultsAtom } from '../../atoms/search';
import { useAtom } from 'jotai';

export default function usePostSearch() {
  const [groupPosts, setGroupPosts] = useAtom(groupPostsResultsAtom);
  const queryClient = useQueryClient();

  const fetchGroupPosts = async () => {
    const res = await client
      .from('group_posts')
      .select('*, groups(*)')
      .order('created_at', { ascending: false });
    setGroupPosts(res.data as GroupPostTypeWGroupInfo[]);
    return res.data as GroupPostTypeWGroupInfo[];
  };
  
  const searchGroupPosts = async (query: string) => {
    const res = await client
      .from('group_posts')
      .select('*, groups(*)')
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: true });
    return res.data as GroupPostTypeWGroupInfo[];
  };

  // Initial fetch
  const { data, isLoading, error } = useQuery<GroupPostTypeWGroupInfo[]>({
    queryKey: ['group_posts'],
    queryFn: fetchGroupPosts
  });

  const handlePostSearch = async (query: string) => {
    if (query.length === 0) {
      queryClient.invalidateQueries({
        queryKey: ['group_posts']
      });
    } else {
      const data = await searchGroupPosts(query);
      setGroupPosts(data ?? []);
    }
  };

  return {
    handlePostSearch,
    groupPosts: groupPosts ?? [],
    isLoading,
    error,
  };
}
