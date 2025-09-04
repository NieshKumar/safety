import React from "react";
import Link from "next/link";

const Splash = () => (
  <>
    <style>
      {`
        :root{
          --bg:#0b1220; --fg:#e9eef8; --muted:#a9b3c7;
          --primary:#3b82f6; --primary-600:#2563eb; --ring: rgba(59,130,246,.4);
        }
        *{box-sizing:border-box}
        html,body{height:100%}
        body{
          margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;
          background: radial-gradient(1200px 600px at 20% 10%, #13203b 0%, transparent 60%), var(--bg);
          color:var(--fg); display:flex; align-items:center; justify-content:center; padding:24px;
        }
        .wrap{max-width:960px; width:100%; text-align:center}
        .logo{
          width:52px; height:52px; border-radius:12px; margin:0 auto 14px;
          background: linear-gradient(135deg, var(--primary) 0%, #06b6d4 100%);
        }
        h1{font-size:clamp(2rem,4vw + .5rem,3rem); line-height:1.1; margin:.25rem 0 .5rem}
        p{color:var(--muted); margin:0 0 1.25rem; font-size:clamp(1rem,1.2vw + .5rem,1.15rem)}
        .cta{
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:700;
          background:var(--primary); color:white; box-shadow:0 8px 24px rgba(59,130,246,.25);
          transition:background .2s ease, transform .05s ease, box-shadow .2s ease;
        }
        .cta:hover{background:var(--primary-600)}
        .cta:active{transform:translateY(1px)}
        .cta:focus-visible{outline:0; box-shadow:0 0 0 4px var(--ring)}
        .sub{font-size:.95rem; color:var(--muted); margin-top:10px}
      `}
    </style>
    <main className="wrap" aria-label="Splash">
      <div className="logo" aria-hidden="true"></div>
      <h1>Smart Tourist Safety</h1>
      <p>Stay Safe, Travel Smart — AI, Blockchain, and Geo‑Fencing for secure journeys.</p>
       <Link href="/signUp" className="cta" aria-label="Get started by creating an account">
        Get Started
      </Link>
      <div className="sub">No account yet? Creating one takes less than 2 minutes.</div>
    </main>
  </>
);

export default Splash;
