import styled from 'styled-components';

import home from "../../../assets/home.svg"
import printer from "../../../assets/printer.svg"


export const HomeAdmin = () => {
  // Colocar dentro do laço de contrução dos Elementos da tabela
  const isActive = true;

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
          <p>Home Administrador</p>
        </div>
        <Button>Sair</Button>
      </header >
      <main>
        <PageTitle>Lista de usuários</PageTitle>
        <div>
          <header style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "12px" }}>
            <ListHeaderEl style={{ width: "150px" }}>Usuário</ListHeaderEl>
            <ListHeaderEl style={{ width: "400px" }}>Nome da instituição</ListHeaderEl>
            <ListHeaderEl style={{ width: "150px" }}>Situação</ListHeaderEl>
            <ListHeaderEl style={{ width: "150px" }}>Imprimir</ListHeaderEl>
          </header>
          <main>
            {/* Adicionar a chamada axios aqui, utilizar a div */}
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "12px" }}>
              {/* mudar os valores dos listMainEl pelos dados da api */}
              <ListMainEl style={{ width: "150px" }}>User1</ListMainEl>
              <ListMainEl style={{ width: "400px" }}>Instituition</ListMainEl>
              {
                isActive ?
                  <div style={{ width: "150px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", borderRadius: "5px", border: "1px solid #99EAE1", cursor: "pointer" }} >
                    <p style={{ width: "15px", height: "15px", background: "#99EAE1", borderRadius: "100%", margin: "0" }}></p>
                    <ElActive>Active</ElActive>
                  </div>
                  :
                  <div style={{ width: "150px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", borderRadius: "5px", border: "1px solid #F0F0F0", cursor: "pointer" }} >
                    <p style={{ width: "15px", height: "15px", background: "#F0F0F0", borderRadius: "100%", margin: "0" }}></p>
                    <ElDisabled>Disabled</ElDisabled>
                  </div>
              }
              <ListMainEl style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "150px", cursor: "pointer" }}>
                <img src={printer} alt="" />
              </ListMainEl>
            </div>
          </main>
        </div>
      </main>
    </>
  );
};


const Button = styled.button`
  width: 141px;
  height: 40px;
  border-radius: 5px;
  background: #99EAE1;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const PageTitle = styled.h3`
  color: #04022A;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal; 
  text-align: center;
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
`;

const ListMainEl = styled.p`
  color: #818094;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 5px;
  background: #F0F0F0;
  text-align: center;
  margin: 0;
  padding: 10px 0;
`;

const ElDisabled = styled.p`
   color: #F0F0F0;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    padding: 10px 0;
`


const ElActive = styled.p`
   color: #99EAE1;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    padding: 10px 0;
`