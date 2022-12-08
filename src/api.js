async function createToken(roomName, isOwner = true) {
  console.log(`Getting token for room '${roomName}' as owner: ${isOwner}`);

  const options = {
    properties: {
      room_name: roomName,
      is_owner: isOwner,
    },
  };

  const isLocal =
    process.env.REACT_APP_ROOM_ENDPOINT && process.env.REACT_APP_ROOM_ENDPOINT === 'local';
  const endpoint = isLocal
    ? 'https://api.daily.co/v1/meeting-tokens'
    : `${window.location.origin}/api/meeting-tokens`;

  /*
    No need to send the headers with the request when using the proxy option:
    netlify.toml takes care of that for us.
  */
  const headers = isLocal && {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_DAILY_API_KEY}`,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(options),
    ...headers,
  });

  return response.json();
}

async function createRoom() {
  /*
    We'll add a 30-min expiry (exp) so rooms won't linger too long on your account.
    See other available options at https://docs.daily.co/reference#create-room
  */
  const exp = Math.round(Date.now() / 1000) + 60 * 30;
  const options = {
    properties: {
      exp,
      enable_recording: 'local',
    },
  };

  const isLocal =
    process.env.REACT_APP_ROOM_ENDPOINT && process.env.REACT_APP_ROOM_ENDPOINT === 'local';
  const endpoint = isLocal
    ? 'https://api.daily.co/v1/rooms/'
    : `${window.location.origin}/api/rooms`;

  /*
    No need to send the headers with the request when using the proxy option:
    netlify.toml takes care of that for us.
  */
  const headers = isLocal && {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_DAILY_API_KEY}`,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(options),
    ...headers,
  });

  return response.json();
}

export default { createRoom, createToken };
