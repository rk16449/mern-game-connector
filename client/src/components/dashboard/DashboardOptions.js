import React from "react";
import { Link } from "react-router-dom";

/**
 * This component controls the options on the dashboard, no data required to be passed in
 * This component has links to either edit the profile or add a favourite game
 *
 * Usage:
 * ```html
 * <Dashboard>
 *  <DashboardOptions />
 * </Dashboard>
 * ```
 */
export const DashboardOptions = () => {
  return (
    <div class="dash-buttons">
      <Link to="/edit-profile" class="btn btn-light">
        <i class="fas fa-user-edit text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-games" class="btn btn-light">
        <i class="fas fa-dragon text-primary"></i> Add Favourite Games
      </Link>
    </div>
  );
};

export default DashboardOptions;
