import { GroupPostType } from "../../types";
import client from "../../client";
import { groupPostsResultsAtom } from "../../atoms/search";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function usePostSearch() {
  const [groupPosts, setGroupPosts] = useAtom(groupPostsResultsAtom);

  async function getAll() {
    const res = await client
      .from("group_posts")
      .select("*, groups(*)")
      .order("created_at", { ascending: false });
    console.log("groupPosts response:", res);
    setGroupPosts(res.data as GroupPostType[]);
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
      setGroupPosts(res.data as GroupPostType[]);
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
