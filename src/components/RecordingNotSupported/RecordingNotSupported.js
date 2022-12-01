import React from 'react';
import './RecordingNotSupported.css';

export default function RecordingNotSupported({ toggleModal }) {
  return (
    <section className="not-supported">
      <h2>Local recording is not supported</h2>
      <p>
        Local recording is only supported in the desktop version of Google Chrome. We do offer{' '}
        <a href="https://docs.daily.co/guides/products/live-streaming-recording/recording-calls-with-the-daily-api#cloud">
          cloud recording
        </a>{' '}
        which is available on all browsers.
      </p>
      <button type="button" className="secondary" onClick={toggleModal}>
        Close
      </button>
    </section>
  );
}
