/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

const Account = () => {

  const user = useSelector((state: any) => state.user.user);

  console.log(user)

  return (
    <div>
      Hi
    </div>
  );
};

export default Account;
