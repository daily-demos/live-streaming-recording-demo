import React, { useCallback, useState } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useLiveStreaming,
  useRecording,
} from '@daily-co/daily-react';

import InviteParticipants from '../InviteParticipants/InviteParticipants';
import LiveStreamingSetup from '../LiveStreamingSetup/LiveStreamingSetup';

import './Tray.css';
import {
  CameraOn,
  Leave,
  CameraOff,
  MicrophoneOff,
  MicrophoneOn,
  Screenshare,
  Invite,
  Recording,
  Stream,
  Circle,
} from './Icons';
import { isParticipant } from '../../utils';

export default function Tray({ leaveCall }) {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } = useScreenShare();

  const { isLiveStreaming } = useLiveStreaming();
  const { isRecording, startRecording, stopRecording } = useRecording();

  const [showInviteParticipants, setShowInviteParticipants] = useState(false);
  const [showLiveStreamingSetup, setShowLiveStreamingSetup] = useState(false);

  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () => (isSharingScreen ? stopScreenShare() : startScreenShare());

  const toggleInviteParticipants = () => {
    setShowInviteParticipants(!showInviteParticipants);
  };

  const toggleLiveStreaming = () => {
    setShowLiveStreamingSetup(!showLiveStreamingSetup);
  };

  const toggleRecording = () => (isRecording ? stopRecording() : startRecording());

  return (
    <div className="tray">
      {showInviteParticipants && <InviteParticipants toggleModal={toggleInviteParticipants} />}
      {showLiveStreamingSetup && <LiveStreamingSetup toggleModal={toggleLiveStreaming} />}

      <div className="tray-buttons-container">
        <div className="controls">
          <button onClick={toggleVideo} type="button">
            {mutedVideo ? <CameraOff /> : <CameraOn />}
            {mutedVideo ? 'Turn camera on' : 'Turn camera off'}
          </button>
          <button onClick={toggleAudio} type="button">
            {mutedAudio ? <MicrophoneOff /> : <MicrophoneOn />}
            {mutedAudio ? 'Unmute mic' : 'Mute mic'}
          </button>
        </div>
        <div className="actions">
          <button onClick={toggleScreenShare} type="button">
            <Screenshare />
            {isSharingScreen ? 'Stop sharing screen' : 'Share screen'}
          </button>

          {!isParticipant() && (
            <>
              <button onClick={toggleInviteParticipants} type="button">
                <Invite />
                Invite participants
              </button>
              <button onClick={toggleLiveStreaming} type="button">
                <Stream />
                {isLiveStreaming ? 'Stop live streaming' : 'Start live streaming'}
              </button>
              <button onClick={toggleRecording} type="button">
                {isRecording ? <Circle /> : <Recording />}
                {isRecording ? 'Stop recording' : 'Start recording'}
              </button>
            </>
          )}
        </div>
        <div className="leave">
          <button onClick={leaveCall} type="button">
            <Leave /> Leave call
          </button>
        </div>
      </div>
    </div>
  );
}
