import { GroupPostType, GroupType } from "../../types";

import client from "../../client";
import { groupPostsResultsAtom } from "../../atoms/search";
import { useAtom } from "jotai";
import { useEffect } from "react";

export type GroupPostTypeWGroup = {
  content: string | null;
  created_at: string;
  group_id: number;
  id: number;
  image_url: string | null;
  member_id: number;
  pinned: boolean;
  student_id: number;
  title: string | null;
  groups: GroupType;
};

export default function usePostSearch() {
  const [groupPosts, setGroupPosts] = useAtom(groupPostsResultsAtom);

  async function getAll() {
    const res = await client
      .from("group_posts")
      .select("*, groups(*)")
      .order("created_at", { ascending: false });
    console.log("groupPosts response:", res);
    setGroupPosts(res.data as GroupPostTypeWGroup[]);
  }

  const handlePostSearch = async (query: string) => {
    if (query.length === 0) {
      getAll();
      return;
    } else {
      const res = await client
        .from("group_posts")
        .select("*, groups(*)")
        .ilike("content", `%${query}%`)
        .order("created_at", { ascending: true });
      setGroupPosts(res.data as GroupPostTypeWGroup[]);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    handlePostSearch,
    groupPosts,
  };
}
