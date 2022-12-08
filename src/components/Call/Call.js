import React, { useState, useCallback } from 'react';
import {
  useParticipantIds,
  useScreenShare,
  useDailyEvent,
  DailyAudio,
} from '@daily-co/daily-react';

import './Call.css';
import Tile from '../Tile/Tile';
import UserMediaError from '../UserMediaError/UserMediaError';

export default function Call() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  /* This is for displaying remote participants: this includes other humans, but also screen shares. */
  const { screens, isSharingScreen } = useScreenShare();
  const participantIds = useParticipantIds();

  /* Calculating columns and rows based on the number of participants. 
     We don't want the number of columns should to exceed the number of rows. */
  const getRowsAndColums = () => {
    let columns = 1;
    const participants = participantIds.length;

    if (participants <= 2) {
      return {
        gridTemplateColumns: `repeat(${participants}, 1fr)`,
        gridTemplateRows: `repeat(1, 1fr)`,
      };
    }
    while (columns < participants / columns) {
      columns += 1;
    }

    const rows = Math.ceil(participants / columns);

    return {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
    };
  };

  console.log(isSharingScreen ? {} : getRowsAndColums());

  const renderCallScreen = () => (
    <div
      className={`${screens.length > 0 ? 'is-screenshare' : 'call'}`}
      style={isSharingScreen ? {} : getRowsAndColums()}>
      {/* Videos of remote participants and screen shares */}
      {participantIds.map((id) => (
        <Tile key={id} id={id} />
      ))}
      {screens.map((screen) => (
        <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
      ))}
      <DailyAudio />
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
