import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const ProfilePage = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <h1>ProfilePage</h1>

      <div>
        {session?.user?.name ? <h2>Hello {session.user.name}!</h2> : null}

       
      </div>
    </div>
  );
};

// import React from 'react'

// const ProfilePage = () => {
//   return (
//     <div>profile page</div>
//   )
// }

export default ProfilePage