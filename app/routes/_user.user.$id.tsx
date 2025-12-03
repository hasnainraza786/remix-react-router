import Heading from "~/pages/User/components/heading";
import UserDetail from "~/pages/User/view/detail";

export async function loader({ params }: { params: { id: string } }) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${params.id}`);
    if (!res.ok) throw new Error("Failed to fetch user data");
    const user = await res.json();
    return user;
  } catch (error) {
    throw new Response("User not found", { status: 404 });
  }
}
export default function UserDetailPage() {
  return (
    <>
      <Heading showEditButton headingType="detail" />
      <UserDetail />
    </>
  );
}
