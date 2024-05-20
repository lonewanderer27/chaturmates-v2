import client from "../../client";

export async function getAdminPosts(school_id: string) {
  const group = await client
    .from("groups")
    .select("*, group_posts(*)")
    .eq("admin_uni_group", true)
    .eq("school", school_id)
    .single()

  if (!group.data) {
    return Promise.reject("No admin groups found");
  }

  return group;
}
