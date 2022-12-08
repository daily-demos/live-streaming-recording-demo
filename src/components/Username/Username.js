import './Username.css';
import { useParticipantProperty } from '@daily-co/daily-react';

export default function Username({ id }) {
  const username = useParticipantProperty(id, 'user_name');

  return <div className="username">{username || id}</div>;
}
