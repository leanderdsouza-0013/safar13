import React, { useState } from "react";
import DashAddAdmin from "./DashAddAdmin";
import AdminDetails from "./AdminDetails";
import DashManageOperator from "./DashManageOperator";

const AdminDashboard = () => {
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showManageOperator, setShowManageOperator] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#D5F5E3",
        padding: "20px"
      }}
    >
      <div className="container mt-4" style={{ minHeight: "80vh" }}>
        <h2>Admin Dashboard</h2>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowAddAdmin(!showAddAdmin)}
            >
              Add Admin
            </button>
            {showAddAdmin && (
              <>
                <DashAddAdmin />
                <AdminDetails />
              </>
            )}
          </div>

          <div >
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowManageOperator(!showManageOperator)}
            >
              Manage Operator
            </button>
            {showManageOperator && <DashManageOperator />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
