import { useLiveStreaming, useRecording } from '@daily-co/daily-react';
import React, { useState } from 'react';
import './LiveStreamingSetup.css';

export default function InviteParticipants({ toggleModal }) {
  const { startLiveStreaming, stopLiveStreaming, updateLiveStreaming, isLiveStreaming, errorMsg } =
    useLiveStreaming();
  const { startRecording, stopRecording, isRecording } = useRecording();

  const [provider, setProvider] = useState('twitch');

  const rtmpUrls = {
    youtube: 'rtmp://a.rtmp.youtube.com/live2/',
    facebook: 'rtmps://live-api-s.facebook/com:443/rtmp/',
    cloudflare: 'rtmps://live.cloudflare.com:443/live/',
    mux: 'rtmps://global-live.mux.com:443/app/',
    twitch: 'rtmp://ams02.contribute.live-video.net/app/',
    vimeo: 'rtmps://rtmp-global.cloud.vimeo.com:443/live/',
  };

  const changeProvider = (e) => {
    setProvider(e.target.value);
  };

  const getLayout = () => {
    const layoutType = document.getElementById('layout').value;
    switch (layoutType) {
      case 'portrait-vertical':
        return {
          preset: 'portrait',
          variant: 'vertical',
        };
      case 'portrait-inset':
        return {
          preset: 'portrait',
          variant: 'inset',
        };
      default:
        return {
          preset: layoutType,
        };
    }
  };

  const updateLayout = () => {
    if (!isLiveStreaming) {
      return;
    }
    updateLiveStreaming({
      layout: getLayout(),
    });
  };

  const toggleLiveStreaming = () => {
    if (isLiveStreaming) {
      stopLiveStreaming();
      stopRecording();
      return;
    }

    let rtmpUrl;
    if (provider === 'custom') {
      rtmpUrl = document.getElementById('rtmp-url').value;
    } else {
      rtmpUrl = rtmpUrls[provider] + document.getElementById('stream-key').value;
    }

    const layout = getLayout();

    if (document.getElementById('start-recording').checked) {
      startRecording({
        layout,
      });
    }
    startLiveStreaming({
      rtmpUrl,
      layout,
    });
  };

  return (
    <section className="start-live-streaming">
      <h2>Start live streaming</h2>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      {!isLiveStreaming && (
        <>
          <div className="form-group">
            <label htmlFor="provider">Provider</label>
            <select id="provider" defaultValue="twitch" onChange={changeProvider}>
              <option value="twitch">Twitch</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="mux">Mux</option>
              <option value="cloudflare">Cloudflare</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {provider === 'custom' ? (
            <div className="form-group">
              <label htmlFor="rtmp-url">RTMP url (including stream key)</label>
              <input id="rtmp-url" type="text" />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="stream-key">Stream key</label>
              <input id="stream-key" type="text" />
            </div>
          )}
        </>
      )}
      <div className="form-group">
        <label htmlFor="layout">Layout</label>
        <select id="layout" defaultValue="default">
          <option value="default">default</option>
          <option value="active-participant">Active participant</option>
          {/* <option value="single-participant">Single participant</option> */}
          <option value="portrait-vertical">Portrait (vertical)</option>
          <option value="portrait-inset">Portrait (inset)</option>
          {/* <option value="custom">Custom</option> */}
        </select>
        <p>
          See{' '}
          <a href="https://docs.daily.co/reference/daily-js/instance-methods/start-live-streaming#customize-your-video-layout">
            the documentation
          </a>{' '}
          for details on each layout type.
        </p>
      </div>
      {!isRecording && !isLiveStreaming && (
        <div className="form-group">
          <input id="start-recording" type="checkbox" />
          <label htmlFor="start-recording">Also start recording</label>
        </div>
      )}

      <div className="buttons">
        <button type="button" onClick={toggleLiveStreaming}>
          {isLiveStreaming ? 'Stop live streaming' : 'Start live streaming'}
        </button>
        {isLiveStreaming && (
          <button type="button" onClick={updateLayout}>
            Update layout
          </button>
        )}
        <button type="button" className="secondary" onClick={toggleModal}>
          Close window
        </button>
      </div>
    </section>
  );
}
