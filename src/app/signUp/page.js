// src/app/signup/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email";
    if (form.password.length < 8) return "Password must be at least 8 characters";
    if (form.password !== form.confirm) return "Passwords do not match";
    if (!form.agree) return "Please accept the Terms";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Signup failed");
      }

      // Success → go to dashboard/home
      router.replace("/dashboard"); // or router.push("/dashboard")
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-wrap" aria-labelledby="signup-title">
      <div className="card">
        <div className="logo" aria-hidden="true" />
        <h1 id="signup-title">Create your account</h1>
        <p className="muted">Start with a free account. No credit card required.</p>

        <form onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              type="text"
              placeholder="Alex Traveler"
              autoComplete="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="alex@example.com"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="pwd">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={onChange}
                required
                minLength={8}
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className="field">
            <span>Confirm password</span>
            <input
              name="confirm"
              type={showPwd ? "text" : "password"}
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={onChange}
              required
              minLength={8}
            />
          </label>

          <label className="check">
            <input name="agree" type="checkbox" checked={form.agree} onChange={onChange} required />
            <span>I agree to the Terms and Privacy Policy</span>
          </label>

          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>

          {msg.text ? (
            <div role="status" className={`alert ${msg.type === "error" ? "danger" : "success"}`}>
              {msg.text}
            </div>
          ) : null}
        </form>

        <p className="muted small">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>

      <style jsx>{`

 /* Theme variables: default to light, override to dark, and honor system when data-theme=system */

:root {

--bg: #f3f6fc;

--fg: #0b1220;

--muted: #4b5566;

--primary: #2563eb;

--primary-600: #1d4ed8;

--ring: rgba(37, 99, 235, 0.35);

--card: #ffffff;

--line: #d0d7e2;

--error: #dc2626;

--ok: #16a34a;

}

[data-theme="dark"] {

--bg: #0b1220;

--fg: #e9eef8;

--muted: #a9b3c7;

--primary: #3b82f6;

--primary-600: #2563eb;

--ring: rgba(59, 130, 246, 0.4);

--card: #0f172a;

--line: #1f2b43;

--error: #ef4444;

--ok: #22c55e;

}



.auth-wrap {

min-height: 100dvh;

display: grid;

place-items: center;

background: radial-gradient(1200px 600px at 20% 10%, #13203b22 0%, transparent 60%), var(--bg);

padding: 24px;

color: var(--fg);

position: relative;

}



/* Toggle button fixed to top-right */

.theme-toggle {

position: fixed;

top: 14px;

right: 14px;

padding: 8px 10px;

border: 1px solid var(--line);

border-radius: 10px;

background: var(--card);

color: var(--fg);

cursor: pointer;

box-shadow: 0 10px 24px rgba(0,0,0,.12);

transition: background .2s ease, transform .05s ease, border-color .2s ease;

}

.theme-toggle:hover { border-color: var(--primary-600); }

.theme-toggle:active { transform: translateY(1px); }

.theme-toggle:focus-visible { outline: 0; box-shadow: 0 0 0 4px var(--ring); }

.icon { display: inline-block; font-size: 18px; }



.card {

width: 100%;

max-width: 460px;

background: var(--card);

border: 1px solid var(--line);

border-radius: 16px;

padding: 22px;

box-shadow: 0 10px 30px rgba(0,0,0,.18);

}

.logo {

width: 42px;

height: 42px;

border-radius: 10px;

margin-bottom: 10px;

background: linear-gradient(135deg, var(--primary) 0%, #06b6d4 100%);

}

h1 { margin: 4px 0 6px; font-size: 1.7rem; line-height: 1.2; }

.muted { color: var(--muted); margin: 0 0 14px; }

.small { font-size: .95rem; }



form { display: grid; gap: 14px; }

.field { display: grid; gap: 6px; }

.field > span { font-weight: 600; }



input[type="text"], input[type="email"], input[type="password"]{

width: fit;

padding: 12px 12px;

border-radius: 10px;

border: 2px solid grey;

background: color-mix(in oklab, var(--card) 90%, black 10%);

color: var(--fg);

outline: none;

transition: box-shadow .2s ease, border-color .2s ease, background .2s ease;

}

input::placeholder { color: color-mix(in oklab, var(--muted) 70%, transparent); }

input:focus-visible {

border-color: grey;

box-shadow: 0 0 0 4px var(--ring);

}



.pwd { position: relative; display: flex; align-items: center; }

.pwd input { flex: 1; padding-right: 70px; }

.toggle {

position: absolute;

right: 6px; top: 6px; bottom: 6px;

padding: 0 10px;

border-radius: 8px;

border: 1px solid var(--line);

background: color-mix(in oklab, var(--card) 90%, black 10%);

color: var(--fg);

cursor: pointer;

transition: border-color .2s ease, background .2s ease;

}

.toggle:hover { border-color: var(--primary-600); }

.check { display: flex; align-items: center; gap: 10px; font-size: .98rem; }



.primary {

appearance: none;

border: none;

border-radius: 10px;

padding: 12px 18px;

font-weight: 700;

background-color:#3b82f6 ;

color: #ededed;

box-shadow: 0 8px 24px color-mix(in oklab, var(--primary) 40%, transparent);

cursor: pointer;

transition: background .2s ease, transform .05s ease, box-shadow .2s ease;

}

.primary:hover { background-color:#2563eb; }

.primary:active { transform: translateY(1px); }

.primary:focus-visible{outline:0; box-shadow:0 0 0 4px var(--ring)}



.alert { margin-top: 8px; padding: 10px 12px; border-radius: 10px; font-weight: 600; }

.alert.danger { background: rgba(239, 68, 68, .15); border: 1px solid rgba(239, 68, 68, .35); color: #7f1d1d; }

.alert.success { background: rgba(34, 197, 94, .15); border: 1px solid rgba(34, 197, 94, .35); color: #064e3b; }

`}</style>
    </main>
  );
}
