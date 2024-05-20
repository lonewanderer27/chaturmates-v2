import client from "../../client";

export async function getGroupPostById(post_id: string) {
  const post = await client
    .from("group_posts")
    .select("*, groups(*)")
    .eq("id", post_id)
    .single();

  if (!post) {
    return Promise.reject("Group post not found");
  }

  return post;
}

export async function getGroupPostCommentsByPostId(post_id: string, ascending: boolean) {
  const comments = await client
    .from("group_comments")
    .select("*, students(*)")
    .eq("post_id", post_id)
    .order("created_at", { ascending: false })

  return comments;
}
