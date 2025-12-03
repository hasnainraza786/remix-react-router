import Heading from "~/pages/User/components/heading";
import UsersListing from "~/pages/User/view";

export default function Users() {
  return (
    <>
      <Heading showAddButton headingType="list" />
      <UsersListing />
    </>
  );
}
