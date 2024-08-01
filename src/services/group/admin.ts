import client from "../../client";

export async function getAdminPosts(school_id: string) {
  // fetch the admin group
  const group = await client
    .from("groups")
    .select("*")
    .eq("school_id", school_id)
    .eq("admin_uni_group", true)
    .single();
  console.log("group", group);

  if (!group.data) {
    return Promise.reject("No admin groups found");
  }

  // fetch the group posts
  const posts = await client
    .from("group_posts")
    .select("*, group: group_id(*)")
    .eq("group_id", group.data!.id);

  return {
    group: group.data,
    group_posts: posts.data ?? []
  }
}
