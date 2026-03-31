"use client";

export default function Home() {
  return (
    <>
      {/* Nebula background blobs */}
      <div className="nebula-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="font-display text-5xl font-bold mb-4 text-glow"
              style={{ color: "var(--star-white)" }}
            >
              Akaaljot Singh Mathoda
            </h1>
            <p
              className="font-mono text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Portfolio coming to life — one commit at a time...
            </p>
          </div>
        </main>
      </div>
    </>
  );
}