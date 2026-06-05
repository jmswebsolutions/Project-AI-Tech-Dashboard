export function Home() {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem"
      }}
    >
      <h1>AI & Tech Dashboard</h1>

      <input
        type="text"
        placeholder="Search AI news..."
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px"
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        <div style={{ padding: "20px", border: "1px solid #334155" }}>
          News Card 1
        </div>

        <div style={{ padding: "20px", border: "1px solid #334155" }}>
          News Card 2
        </div>

        <div style={{ padding: "20px", border: "1px solid #334155" }}>
          News Card 3
        </div>
      </div>
    </main>
  );
}