import { Component } from "react";

class Contador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
    };

    this.adicionar = this.adicionar.bind(this);
    this.subtrair = this.subtrair.bind(this);
  }

  adicionar() {
    this.setState((prev) => ({ contador: prev.contador + 1 }));
  }

  subtrair() {
    this.setState((prev) => ({ contador: prev.contador - 1 }));
  }

  render() {
    return (
      <section className="card">
        <h1>Contador</h1>
        <p className="label">{this.state.contador}</p>
        <div className="actions">
          <button type="button" onClick={this.adicionar}>
            +1
          </button>
          <button type="button" onClick={this.subtrair}>
            -1
          </button>
        </div>
      </section>
    );
  }
}

export default function App() {
  return (
    <main className="page">
      <Contador />
    </main>
  );
}
