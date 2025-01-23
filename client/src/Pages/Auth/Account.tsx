/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state: any) => {
    console.log("State:", state);
    return state.user;
  });

  console.log("User Data:", user);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <p>Address: {user.address}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default Account;
