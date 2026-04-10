const Style = () => {
  return (
    <style jsx global>{`
      :root {
        --p-bg: #faf9f7;
        --p-bg-warm: #f5f3ef;
        --p-surface: #ffffff;
        --p-border: #e8e5e0;
        --p-border-l: #f0ede8;
        --p-text: #37352f;
        --p-text2: #6b6b6b;
        --p-text3: #9b9a97;
        --p-accent: #2eaadc;
        --p-accent-s: #d3e5ef;
        --p-shadow-m: 0 4px 12px rgba(0,0,0,.06);
        --p-shadow-l: 0 12px 40px rgba(0,0,0,.12);
        --p-rl: 12px;
      }
      .dark {
        --p-bg: #191919;
        --p-bg-warm: #1e1e1e;
        --p-surface: #252525;
        --p-border: #333;
        --p-border-l: #2a2a2a;
        --p-text: #e0e0e0;
        --p-text2: #999;
        --p-text3: #666;
        --p-accent-s: #1a3a4a;
        --p-shadow-m: 0 4px 12px rgba(0,0,0,.3);
        --p-shadow-l: 0 12px 40px rgba(0,0,0,.5);
      }
      .portal-theme {
        background: var(--p-bg);
        color: var(--p-text);
        min-height: 100vh;
      }
      .portal-theme::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 9999;
      }
      .portal-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(250,249,247,.85);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid var(--p-border-l);
      }
      .dark .portal-header {
        background: rgba(25,25,25,.85);
      }
      .portal-search-box {
        display: flex;
        align-items: center;
        background: var(--p-surface);
        border: 1px solid var(--p-border);
        border-radius: var(--p-rl);
        padding: 4px;
        box-shadow: var(--p-shadow-m);
        transition: all .25s;
      }
      .portal-search-box:focus-within {
        border-color: var(--p-accent);
        box-shadow: var(--p-shadow-m), 0 0 0 3px var(--p-accent-s);
      }
      .portal-card {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 16px;
        background: var(--p-surface);
        border: 1px solid var(--p-border-l);
        border-radius: var(--p-rl);
        transition: all .25s;
        cursor: pointer;
        text-decoration: none !important;
        color: inherit !important;
      }
      .portal-card:hover {
        border-color: #d0cdc8;
        box-shadow: var(--p-shadow-m);
        transform: translateY(-2px);
      }
      .dark .portal-card:hover {
        border-color: #444;
      }
      .portal-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 12px;
      }
      @keyframes pFadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .p-anim {
        animation: pFadeUp .5s ease both;
      }
      @media (max-width: 768px) {
        .portal-card-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  )
}
export default Style
