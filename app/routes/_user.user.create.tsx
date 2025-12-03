import { redirect } from "react-router";
import Heading from "~/pages/User/components/heading";
import UserForm from "~/pages/User/view/form";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Response("Failed to create user", { status: res.status });
  }

  return redirect("/user");
}

export default function CreateUser() {
  return (
    <>
      <Heading headingType="create" />
      <UserForm />
    </>
  );
}
