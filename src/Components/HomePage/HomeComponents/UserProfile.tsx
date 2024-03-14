import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user ? (
      <div className="profile-container">
      <div className="profile"> 
        <img src={user.picture} alt={user.name} />
        <section className="profile-info">
         {/*<p className="profile-email">{user.email}</p>*/}
        </section>
      </div>
      </div>
    ) : null
  );
}; 

export default Profile;