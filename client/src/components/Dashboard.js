import React from "react";
import {Link} from 'react-router-dom';
const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
       <Link to="/survey/new">
       <a className="btn-floating btn-large red">
          <i className="large material-icons">+</i>
        </a>
       </Link> 
      </div>
    </div>
  );
};

export default Dashboard;
