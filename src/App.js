import { useState } from "react";
import "./App.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleClick() {
    if (input == "") {
      alert("Preencha os campos corretamente!");
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep({
        cep: "CEP: " + response.data.cep,
        logradouro: "Logradouro: " + response.data.logradouro,
        bairro: "Bairro: " + response.data.bairro,
        localidade:
          "Cidade: " + response.data.localidade + "/" + response.data.uf,
      });
      return;
    } catch {
      alert("Preencha os campos corretamente!");
      setInput("");
      return;
    }
  }
  return (
    <div className="App">
      <div className="container-consulta-geral">
        <div className="container-deco"></div>
        <div className="container-consulta">
          <span className="title-cep">
            <strong>Consultor de CEP</strong>
          </span>
          <input
            type="text"
            className="entrada-cep"
            placeholder="Digite o cep..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
          <div className="resultado-consulta">
            <span>{cep.cep}</span>
            <span>{cep.logradouro}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade}</span>
          </div>
          <input
            type="button"
            className="consultar-cep"
            value="Consultar"
            onClick={handleClick}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
