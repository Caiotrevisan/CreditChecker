import styled from 'styled-components'
import server from "@/server"
import home from "../../../assets/home.svg"
import menu from "../../../assets/menu.svg"
import { useState } from 'react';

export const HomeUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  let jsonResult = {}

  async function handleFileUpload(event) {
    const file = event.target.files[0]; // Obtém o arquivo selecionado pelo usuário
    if (!file) {
      // Caso o usuário não tenha selecionado nenhum arquivo
      console.log("Nenhum arquivo selecionado.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = data[j];
        }
        result.push(row);
      }

      //Imprime o Json
      console.log(result);
      jsonResult = result;


    };

    reader.readAsText(file);

    //Aqui você pode adicionar mais lógica para processar ou enviar o arquivo para o servidor, se necessário

    const result2 = await server.post('/user/new', JSON.stringify(jsonResult)) 

    if (result2.data.hasOwnProperty("error")) {
      return alert(result2.data.error)
    }

    return console.log(result2.data)
  };



  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', padding: "20px 40px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
          gap: "8px",
          color: "#04022A"
        }}>
          <img src={home} />
          <p>Home User</p>
        </div>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <img src={menu} />
        </Button>
        {
          isOpen ?
            <div style={{
              display: "flex", flexDirection: "column", position: "absolute", right: "38px", top: "80px", borderRadius: "5px",
              background: "#FFF",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              gap: "8px", marginTop: "10px"
            }}>
              <ActButton style={{ borderBottom: "1px solid c4c4c4", borderRadius: "5px 5px 0 0" }} onClick={() => window.location.href = "/"}>Sair</ActButton>
              <ActButton style={{ borderRadius: "0 0 5px 5px" }} onClick={() => window.location.href = "/registerUpdate"}>Atualizar Dados</ActButton>
            </div> :
            ""
        }
      </header >
      <main style={{ flexDirection: "column", padding: "0 40px", display: "flex" }}>
        <H3>Parametros</H3>
        <div style={{ display: "flex", margin: "0 auto", width: "980px", justifyContent: "space-between" }}>
          <P style={{ width: "15%", textAlign: "center" }}>Resultado</P>
          <P style={{ width: "82%", textAlign: "center" }}>Parâmetros/Condições</P>
        </div>
        <header style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "12px" }}>
          <ListHeaderEl>Taxa</ListHeaderEl>
          <ListHeaderEl>Idade</ListHeaderEl>
          <ListHeaderEl>Salário</ListHeaderEl>
          <ListHeaderEl>Financiamento</ListHeaderEl>
          <ListHeaderEl>Valor</ListHeaderEl>
          <ListHeaderEl>Correntista</ListHeaderEl>
        </header>
        <label htmlFor="arquivo_csv" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "970px", height: "300px", margin: "0 auto", border: "3px dotted #99EAE1", color: "#99EAE1", borderRadius: "5px", cursor: "pointer" }} >
          +
        </label>
        <input style={{ display: "none" }} type="file" id="arquivo_csv" name="arquivo_csv" accept=".csv" onChange={handleFileUpload}></input>
      </main >
    </>
  );
};


const Button = styled.button`
    border: none;
    background: #99EAE1;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const H3 = styled.h3`
  color: var(--Black1, #04022A);
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const ListHeaderEl = styled.p`
  color: #FFF;
  font-size: 20px;
  font-weight: 400;
  padding: 5px 0;
  background-color: #99EAE1;
  border-radius: 5px;
  text-align: center;
  margin: 0;
  width: 150px;
`;

const P = styled.p`
  color:  #04022A;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 20px;
  border-bottom: 1px solid #E0E0E0;
`

const ActButton = styled.button`
    color: #818094;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background: #99EAE1;
    color: white;
  }
`