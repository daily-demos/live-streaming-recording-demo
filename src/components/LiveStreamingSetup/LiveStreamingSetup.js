import {
  useLiveStreaming,
  useParticipant,
  useParticipantIds,
  useRecording,
} from '@daily-co/daily-react';
import React, { useState } from 'react';
import './LiveStreamingSetup.css';

function ParticipantOption({ participantId }) {
  const participant = useParticipant(participantId);
  return (
    <option value={participantId}>
      {participant.user_name || participantId}
    </option>
  );
}

export default function LiveStreamingSetup({
  toggleModal,
  isRecordingSupported,
}) {
  const {
    startLiveStreaming,
    stopLiveStreaming,
    updateLiveStreaming,
    isLiveStreaming,
    errorMsg,
  } = useLiveStreaming();
  const { startRecording, stopRecording, isRecording } = useRecording();

  const participantIds = useParticipantIds();

  const providers = {
    twitch: {
      name: 'Twitch',
      value: 'twitch',
      url: 'rtmp://ams02.contribute.live-video.net/app/',
    },
    facebook: {
      name: 'Facebook',
      value: 'facebook',
      url: 'rtmps://live-api-s.facebook/com:443/rtmp/',
    },
    youtube: {
      name: 'YouTube',
      value: 'youtube',
      url: 'rtmp://a.rtmp.youtube.com/live2/',
    },
    vimeo: {
      name: 'Vimeo',
      value: 'vimeo',
      url: 'rtmps://rtmp-global.cloud.vimeo.com:443/live/',
    },
    mux: {
      name: 'Mux',
      value: 'mux',
      url: 'rtmps://global-live.mux.com:443/app/',
    },
    cloudflare: {
      name: 'Cloudflare',
      value: 'cloudflare',
      url: 'rtmps://live.cloudflare.com:443/live/',
    },
    custom: {
      name: 'Custom',
      value: 'custom',
    },
  };
  const layouts = {
    default: {
      name: 'Default',
      value: 'default',
    },
    activeParticipant: {
      name: 'Active participant',
      value: 'active-participant',
    },
    singleParticipant: {
      name: 'Single participant',
      value: 'single-participant',
    },
    portraitVertical: {
      name: 'Portrait (vertical)',
      value: 'portrait-vertical',
    },
    portraitInset: {
      name: 'Portrait (inset)',
      value: 'portrait-inset',
    },
    custom: {
      name: 'Custom',
      value: 'custom',
    },
  };

  const [selectedProvider, setSelectedProvider] = useState(
    providers.twitch.value,
  );
  const [selectedLayout, setSelectedLayout] = useState(layouts.default.value);
  const [errorMessage, setErrorMessage] = useState(errorMsg);

  const changeProvider = (e) => {
    setSelectedProvider(e.target.value);
  };
  const changeLayout = (e) => {
    setSelectedLayout(e.target.value);
  };

  const getLayout = () => {
    const layoutType = document.getElementById('layout').value;
    switch (layoutType) {
      case layouts.portraitVertical.value:
        return {
          preset: 'portrait',
          variant: 'vertical',
        };
      case layouts.portraitInset.value:
        return {
          preset: 'portrait',
          variant: 'inset',
        };
      case layouts.singleParticipant.value:
        return {
          preset: layouts.singleParticipant.value,
          sessionId: document.getElementById('single-participant').value,
        };
      case layouts.custom.value:
        try {
          return {
            preset: layouts.custom.value,
            composition_params: JSON.parse(
              document.getElementById('custom').value,
            ),
          };
        } catch (e) {
          setErrorMessage('Make sure the custom layout is a valid JSON object');
          return false;
        }
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
    const layout = getLayout();
    if (!layout) {
      return;
    }

    updateLiveStreaming({
      layout,
    });
  };

  const toggleLiveStreaming = () => {
    if (isLiveStreaming) {
      stopLiveStreaming();
      stopRecording();
      return;
    }

    let rtmpUrl;
    if (selectedProvider === providers.custom.value) {
      rtmpUrl = document.getElementById('rtmp-url').value;
    } else {
      rtmpUrl =
        providers[selectedProvider].url +
        document.getElementById('stream-key').value;
    }

    const layout = getLayout();
    if (!layout) {
      return;
    }
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

      {errorMessage && <p className="error-msg">{errorMessage}</p>}

      {!isLiveStreaming && (
        <>
          <div className="form-group">
            <label htmlFor="provider">Provider</label>
            <select
              id="provider"
              defaultValue="twitch"
              onChange={changeProvider}>
              {Object.values(providers).map(({ name, value }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {selectedProvider === providers.custom.value ? (
            <div className="form-group">
              <label htmlFor="rtmp-url">RTMP URL (including stream key)</label>
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
        <select id="layout" defaultValue="default" onChange={changeLayout}>
          {Object.values(layouts).map(({ name, value }) => (
            <option value={value} key={value}>
              {name}
            </option>
          ))}
        </select>
        <p>
          See{' '}
          <a href="https://docs.daily.co/reference/daily-js/instance-methods/start-live-streaming#customize-your-video-layout">
            the documentation
          </a>{' '}
          for details on each layout type.
        </p>
      </div>
      {selectedLayout === layouts.singleParticipant.value && (
        <div className="form-group">
          <label htmlFor="single-participant">Participant to focus on</label>

          <select id="single-participant">
            {participantIds.map((id) => (
              <ParticipantOption participantId={id} />
            ))}
          </select>
        </div>
      )}
      {selectedLayout === layouts.custom.value && (
        <div className="form-group">
          <label htmlFor="custom">Custom VCS layout</label>
          <p>
            To use this, head over to the{' '}
            <a
              href="https://www.daily.co/tools/vcs-simulator/daily_baseline.html"
              target="_blank"
              rel="noreferrer">
              VCS simulator
            </a>
            , and use the API builder on the side. Copy the object within the{' '}
            <code>composition_params</code> and paste it in the textarea below.
          </p>

          <textarea id="custom" />
        </div>
      )}
      {isRecordingSupported && !isRecording && !isLiveStreaming && (
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
