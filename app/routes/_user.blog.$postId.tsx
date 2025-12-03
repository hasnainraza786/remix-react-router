import { useParams } from "react-router";

export default function BlogPostPage() {
  const { postId } = useParams();

  return (
    <div>
      <h3>Blog Post Page</h3>
      <p>
        You are viewing post ID: <strong>{postId}</strong>
      </p>
      <p>This is a dynamic route defined as `blog.$postId.tsx`.</p>
    </div>
  );
}
