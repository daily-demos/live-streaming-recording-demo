import React from 'react';
import './InviteParticipants.css';

export default function InviteParticipants({ toggleModal }) {
  return (
    <section className="invite-participants">
      <h2>Invite participants</h2>
      <p>Share the following url to invite participants to your call:</p>
      <p className="url">
        <textarea>{`${window.location.href}&type=participant`}</textarea>
      </p>
      <button type="button" className="close" onClick={toggleModal}>
        Close
      </button>
    </section>
  );
}
