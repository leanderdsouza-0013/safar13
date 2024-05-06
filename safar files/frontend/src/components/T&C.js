import React from "react";
import "./T&C.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions-container">
      <h2>Terms and Conditions</h2>
      <div className="section">
        <h3>IMPORTANT: ADHERE TO STATE GUIDELINES</h3>
        <p>
          Most states have released their own guidelines for inbound and
          outbound travellers vis-a-vis passes, permits, quarantine rules, and
          other requirements. Please go through the guidelines of your source
          and destination state carefully before planning your travel, for a
          hassle-free experience. View Passenger Guidelines
        </p>
      </div>
      <div className="section">
        <h3>TERMS OF SERVICE</h3>
        <h4>BUS</h4>
        <h4>ROLE OF SAFAR</h4>
        <p>
          Safar only provides a technology platform that connects intending
          travelers with bus operators. It doesn’t operate any bus or offer the
          service of transportation to the User. Safar also doesn’t act as an
          agent of any bus operator in the process of providing the
          above-mentioned technology platform services.
        </p>
        {/* Add more content for ROLE OF SAFAR */}
        <h4>LIMITATION OF LIABILITY OF SAFAR</h4>
        <p>
          In its role as a technology platform to enable transactions between
          the bus operators and the Users, Safar shall not be responsible for
          the operations of the bus operator including, but not limited to the
          following: Timely departure or arrival of the bus; The conduct of bus
          operator's employees, representatives, or agents; The condition of the
          bus, seats, etc., not being up to the customer's expectation or as per
          the description provided by the bus operator;
        </p>
        {/* Add more content for LIMITATION OF LIABILITY OF SAFAR */}
        <h4>RESPONSIBILITIES OF THE USERS</h4>
        <p>
          Users are advised to call the bus operator to find out the exact
          boarding point or any information which they may need for the purpose
          of boarding or travel in that trip. At the time of boarding the bus,
          Users shall furnish a copy of the ticket and any valid identity proof
          like Aadhar card, passport, PAN card, or voter identification card, or
          any other identity proof issued by a government authority.
        </p>
        {/* Add more content for RESPONSIBILITIES OF THE USERS */}
        <h4>CANCELLATION OF TICKET</h4>
        <p>
          Cancellation of tickets can be done either through the User’s login on
          the Safar website, or by calling the customer
          care number; Any cancellation is subject to such cancellation charges
          as mentioned on the ticket.
        </p>
        {/* Add more content for CANCELLATION OF TICKET */}
        <h4>RESCHEDULING OF TICKET</h4>
        <p>
          Rescheduling (i.e. change of date of travel) of the tickets can be
          done through the User’s login on the Safar website or mobile
          application, or by reaching out to the customer support team;
          Rescheduling is an option provided only by select bus operators. The
          policy for the same shall be available on the e-ticket.
        </p>
        {/* Add more content for RESCHEDULING OF TICKET */}
      </div>
      {/* Add more sections if needed */}
    </div>
  );
};

export default TermsAndConditions;
