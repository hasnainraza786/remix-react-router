import { redirect, useLoaderData } from 'react-router';

import Heading from '~/pages/User/components/heading';
import UserForm from '~/pages/User/view/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: { params: any }) {
  const res = await fetch(`https://dummyjson.com/users/${params.id}`);
  const user = await res.json();
  return user;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request, params }: { request: Request; params: any }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const res = await fetch(`https://dummyjson.com/users/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Response('Failed to update user', { status: res.status });
  }

  return redirect('/user');
}

export default function EditUser() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useLoaderData() as any;

  return (
    <>
      <Heading headingType="edit" />
      <UserForm initialValues={user} />
    </>
  );
}
