import React from "react";

const RestrictedAccessPage = () => {
  return (
    <div className="container protected-page">
      <h3>Forbidden</h3>
      <p>You don't have permissions to access this page</p>
    </div>
  );
}

export default RestrictedAccessPage;
