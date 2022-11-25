import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="header-section">
        <img src="/images/logo.svg" alt="Daily logo" />
        <span className="title">Live streaming / recording sample app</span>
      </div>
      <div className="header-section">
        <a
          className="new-tab-link"
          href="https://docs.daily.co/guides/products/live-streaming-recording"
          target="_blank"
          rel="noreferrer">
          <span>API docs</span>
          <img src="/images/newtab.svg" alt="New tab" />
        </a>
        {
          // TODO: Need to update this
        }
        <a className="github-link" href="need-to-update" target="_blank" rel="noreferrer">
          <img src="/images/github.svg" alt="Github" />
        </a>
      </div>
    </header>
  );
}
