export function roomUrlFromPageUrl() {
  const match = window.location.search.match(/roomUrl=([^&]+)/i);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
}

export function roomNameFromRoomUrl(roomUrl) {
  const url = new URL(roomUrl);
  return url.pathname.substring(1);
}

export function isParticipant() {
  const match = window.location.search.match(/type=([^&]+)/i);
  return match?.[1] === 'participant';
}

export function pageUrlFromRoomUrl(roomUrl) {
  let url = window.location.href.split('?')[0];
  if (roomUrl) {
    url += `?roomUrl=${encodeURIComponent(roomUrl)}`;

    if (isParticipant()) {
      url += '&type=participant';
    }
  }

  return url;
}
