export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "60vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "3px solid var(--rule)",
          borderTopColor: "var(--teal)",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ fontSize: 14, color: "var(--muted)" }}>Loading…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
