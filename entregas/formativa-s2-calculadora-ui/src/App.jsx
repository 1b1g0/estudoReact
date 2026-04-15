const buttons = [
  ["AC", "+/-", "%", "/"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

function CalcButton({ label, wide, tone = "default" }) {
  return (
    <button className={`calc-btn ${tone} ${wide ? "wide" : ""}`} type="button">
      {label}
    </button>
  );
}

function Display({ value }) {
  return <div className="display">{value}</div>;
}

export default function App() {
  return (
    <main className="page">
      <section className="calculator">
        <Display value="0" />
        {buttons.map((row, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {row.map((label) => {
              const tone =
                label === "AC" || label === "+/-" || label === "%"
                  ? "light"
                  : label === "/" || label === "x" || label === "-" || label === "+" || label === "="
                    ? "accent"
                    : "default";
              return (
                <CalcButton
                  key={label}
                  label={label}
                  tone={tone}
                  wide={label === "0"}
                />
              );
            })}
          </div>
        ))}
      </section>
    </main>
  );
}
