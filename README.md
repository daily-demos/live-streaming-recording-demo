# Live streaming & Recording Sample App

This repository showcases some of Daily's live streaming and recording capabilites.

## Features

This app includes:

- Local recording (Chrome desktop only)
- RTMP live streaming with multiple participants
- Screen sharing
- Different layouts, and changing them during recording/live streaming

Even though it's possible with Daily, this app does not include:

- HLS live streaming
- Interactive live streaming
- Cloud recoding
- Custom layouts using Daily's Video Component System (VCS)

---

## Requirements

To use this demo, you will first need to [create a Daily account](https://dashboard.daily.co/signup). You will also need a Daily room URL, which you can get via two options in this demo:

- To create new Daily rooms directly through this demo's UI, you will need your Daily API key, which can be found on the [Developers](https://dashboard.daily.co/developers) page. This will be used in your environment variables. (Instructions below.)
- Alternatively, you can use existing Daily rooms in the demo by pasting the room URL into the input. The room URL should be in this format to be valid: `https://your-domain.daily.co/room-name`, with `daily-domain` changed to your domain, and `room-name` changed to the name of the existing room you would like to use.

---

## Running locally

To run this demo locally:

1. Install dependencies `npm install`
2. Start dev server `npm start`
3. Then open your browser and go to `http://localhost:3000`.

### Creating new rooms locally

To create new rooms via the app UI while testing locally, follow these additional steps:

- rename `example.env` to `.env`
- add your Daily API key (available in the Daily [dashboard](https://dashboard.daily.co/developers)) to `.env`
- add the value `local` to the `REACT_APP_ROOM_ENDPOINT` variable in `.env`

```dotenv
REACT_APP_DAILY_API_KEY=your-daily-api-key
REACT_APP_ROOM_ENDPOINT=local
```

- Restart your server, i.e. re-run `npm start`

OR...

## Deploy on Netlify

If you want access to the Daily REST API (using the proxy as specified in `netlify.toml`), you can deploy your own copy of this repo with one click via Netlify:

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/daily-demos/live-streaming-recording-sample-app)

Note: You'll need your [Daily API key](https://dashboard.daily.co/developers) handy for this step.

Visit the deployed domain provided by Netlify after completing this step to view the app.
