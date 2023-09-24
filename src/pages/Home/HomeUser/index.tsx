import styled from 'styled-components'
import server from "@/server"
import home from "../../../assets/home.svg"
import menu from "../../../assets/menu.svg"
import { useState, useEffect } from 'react';


export const HomeUser = () => {
  if (localStorage.getItem("itemType") != "user") {
    return (
    <div>
      <p>Usuário não autenticado!</p>
    </div>
    )
  } else {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true); // Adicione o estado de carregamento
  const [parameters, setParameters] = useState([]); // Adicione o estado de carregamento

  useEffect(() => {
    if (loading) {
      server.get('/params/' + localStorage.getItem("userId"))
        .then((response: any) => {
          console.log(response);
          setParameters(response.data); // Defina o estado de carregamento como falso após o carregamento bem-sucedido
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setTimeout(() => window.location.href = "/Login", 2000)
          setLoading(false);
        });
    }
  }, [loading]);

  console.log(parameters)

  let jsonResult = {}

  async function handleFileUpload(event) {
    const file = event.target.files[0]; // Obtém o arquivo selecionado pelo usuário
    if (!file) {
      // Caso o usuário não tenha selecionado nenhum arquivo
      console.log("Nenhum arquivo selecionado.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async function (e) {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        const row = {
          userId: localStorage.getItem("userId"),
          ageMin: parseInt(data[0]),
          ageMax: parseInt(data[1]),
          salaryMin: parseInt(data[2]),
          salaryMax: parseInt(data[3]),
          financingType: data[4],
          financValMin: parseInt(data[5]),
          financValMax: parseInt(data[6]),
          client: data[7] === 'true', // Converte 'true' para true e outros valores para false
          fee: parseFloat(data[8]),
        };
        result.push(row);
      }

      // Imprime o JSON
      console.log(result);

      try {
        // Envia o JSON para o servidor
        const response = await server.post('/params/new', result);

        if (response.data.hasOwnProperty("error")) {
          return alert(response.data.error);
        }

        console.log(response.data);
      } catch (error) {
        console.error(error);
        // Trate erros de requisição aqui, se necessário
      }
    };

    reader.readAsText(file);
    //Aqui você pode adicionar mais lógica para processar ou enviar o arquivo para o servidor, se necessário

  };

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
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
              <ActButton style={{ borderBottom: "1px solid c4c4c4", borderRadius: "5px 5px 0 0" }} onClick={handleLogout}>Sair</ActButton>
              <ActButton style={{ borderRadius: "0 0 5px 5px" }} onClick={() => window.location.href = "/registerUpdate"}>Atualizar Dados</ActButton>
            </div> :
            ""
        }
      </header >
      <main style={{ flexDirection: "column", padding: "0 40px", display: "flex" }}>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <H3>Parametros</H3>
          <Upload htmlFor="arquivo_csv"> + Fazer Upload de Arquivo CSV </Upload>
        </div>
        <div style={{ display: "flex", margin: "0 auto", width: "980px", justifyContent: "space-between" }}>

          <P style={{ width: "15%", textAlign: "center" }}>Resultado</P>
          <P style={{ width: "82%", textAlign: "center" }}>Parâmetros/Condições</P>
        </div>
        <header style={{ display: "flex", gap: "5px", justifyContent: "center", marginBottom: "12px" }}>
          <ListHeaderEl>Taxa</ListHeaderEl>
          <ListHeaderEl>Idade</ListHeaderEl>
          <ListHeaderEl>Salário</ListHeaderEl>
          <ListHeaderEl>Financiamento</ListHeaderEl>
          <ListHeaderEl>Valor</ListHeaderEl>
          <ListHeaderEl>Correntista</ListHeaderEl>
          <ListHeaderEl>Ações</ListHeaderEl>

        </header>
        <div>
          {
            parameters.map(el => {
              console.log(el)
              return (
                <div style={{ display: "flex", flexDirection: "row", gap: "5px", justifyContent: "center", marginBottom: "12px" }}>
                  <CampoHighLigth>{`${el.fee}`}</CampoHighLigth>
                  <Campos>{`${el.ageMin} - ${el.ageMax}`}</Campos>
                  <Campos>{`${el.salaryMin} - ${el.salaryMax}`}</Campos>
                  <Campos>{`${el.financingType}`}</Campos>
                  <Campos>{`${el.financValMin} - ${el.financValMax}`}</Campos>
                  <Campos>{ el.client ? "Sim" : "Não" }</Campos>

                  <ButtonParam>Atualizar</ButtonParam>
                  <ButtonParam>Remover</ButtonParam>
                </div>
              )
            })
          }
        </div>

        <input style={{ display: "none" }} type="file" id="arquivo_csv" name="arquivo_csv" accept=".csv" onChange={handleFileUpload}></input>
      </main >
    </>
  );
  }
};


const Button = styled.button`
    border: none;
    background: #99EAE1;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const ButtonParam = styled.button`
color: #FFF;
font-size: 20px;
font-weight: 400;
padding: 5px 0;
background-color: #99EAE1;
border-radius: 5px;
text-align: center;
margin: 0;
width: 72px;
`;

const Upload = styled.label`
width: 141px;
height: 40px;
border-radius: 5px;
background: #99EAE1;
border: none;
color: white;
font-size: 16px;
padding: 10px;
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

const CampoHighLigth = styled.div`
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

const Campos = styled.div`
color: #FFF;
font-size: 20px;
font-weight: 400;
padding: 5px 0;
background-color: #DDDDDD;
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