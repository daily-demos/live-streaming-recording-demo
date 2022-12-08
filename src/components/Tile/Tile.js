import './Tile.css';
import { DailyVideo } from '@daily-co/daily-react';
import Username from '../Username/Username';

export default function Tile({ id, isScreenShare }) {
  return (
    <div className={isScreenShare ? 'tile-screenshare' : 'tile-video'}>
      <DailyVideo
        automirror
        sessionId={id}
        type={isScreenShare ? 'screenVideo' : 'video'}
        fit={isScreenShare ? 'contain' : 'cover'}
      />
      <Username id={id} />
    </div>
  );
}
