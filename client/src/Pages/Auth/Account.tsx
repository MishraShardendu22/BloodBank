/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from "../../store/store";

const Account = () => {
  const user = useUserStore((state: any) => state.user); 
  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <div>
      <h1>Account Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Account;
