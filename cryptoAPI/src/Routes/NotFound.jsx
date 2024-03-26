import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>404 Page Not Found</h2>
      <p>We can't seem to find the page you're looking for.</p>
      <Link style={{ color: "white" }} to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;
