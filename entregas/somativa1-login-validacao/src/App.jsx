import { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      mensagem: "",
      status: "neutro",
    };

    this.mudaCampo = this.mudaCampo.bind(this);
    this.validarAcesso = this.validarAcesso.bind(this);
  }

  mudaCampo(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      mensagem: "",
      status: "neutro",
    });
  }

  validarAcesso() {
    const emailValido = "eduardo.lino@pucpr.br";
    const senhaValida = "123456";
    const { email, senha } = this.state;

    if (!email || !senha) {
      this.setState({
        mensagem: "Preencha e-mail e senha.",
        status: "erro",
      });
      return;
    }

    if (email === emailValido && senha === senhaValida) {
      this.setState({
        mensagem: "Acessado com sucesso!",
        status: "sucesso",
      });
      return;
    }

    this.setState({
      mensagem: "E-mail ou senha incorretos!",
      status: "erro",
    });
  }

  render() {
    const { email, senha, mensagem, status } = this.state;

    return (
      <section className="login-card">
        <h1>Login</h1>

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={this.mudaCampo}
        />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={this.mudaCampo}
        />

        <button type="button" onClick={this.validarAcesso}>
          Acessar
        </button>

        <p className={`mensagem ${status}`}>{mensagem}</p>
      </section>
    );
  }
}

export default function App() {
  return (
    <main className="page">
      <LoginForm />
    </main>
  );
}
