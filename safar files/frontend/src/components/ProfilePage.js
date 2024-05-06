import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from './AuthProvider'; // Import the authentication 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfilePage = () => {
    const { user, userId, userEmail, userRole, userName } = useContext(AuthContext);

    // Render profile based on user type
    const renderProfile = () => {
        
        try { 
                return (
                    <div className="card-body">
                        <h4 className="card-title">Hello {userName}</h4>
                        <h6 className="card-title">ID: {userId}</h6>
                        <h6 className="card-title">Email: {userEmail}</h6>
                        <button className="btn btn-primary"></button>
                    </div>
                );

        } catch (error) {
            console.error("Error rendering driver profile:", error);
        }

        return null;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <FontAwesomeIcon icon={faUser} size="10x" className="m-3" />
                            </div>
                            <div className="col-md-8">
                                {renderProfile()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
