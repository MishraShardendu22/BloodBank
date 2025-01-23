/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    console.log('User data in Account component:', user); // Log the user data
  }, [user]);

  return (
    <div>
      Hi {user?.name || 'Loading...'} {/* Show user name or a loading message */}
    </div>
  );
};

export default Account;
