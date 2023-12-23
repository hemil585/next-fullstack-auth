import React from "react";

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

const UserProfilePage = ({ params }: UserProfilePageProps) => {
  return (
    <div>
      <h1>Profile page</h1>
      <p>No. {params.id}</p>
    </div>
  );
};

export default UserProfilePage;
