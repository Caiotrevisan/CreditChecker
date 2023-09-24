import styled from 'styled-components';
import server from "@/server";

import home from "../../../assets/home.svg"
import printer from "../../../assets/printer.svg"
import { useState, useEffect } from 'react';

export const HomeAdmin = () => {
  if (localStorage.getItem("itemType") != "admin") {
    return (
    <div>
      <p>Usuário não autenticado!</p>
    </div>
    )
  } else {
  // Colocar dentro do laço de contrução dos Elementos da tabela
  const isActive = true;
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true); // Adicione o estado de carregamento
  
  useEffect(() => {
    if (loading) {
      server.get('/user/getall')
        .then((response) => {
          console.log(response);
          setUsers(response.data);
          setLoading(false); // Defina o estado de carregamento como falso após o carregamento bem-sucedido
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Defina o estado de carregamento como falso em caso de erro
          // setTimeout(() => window.location.href = "/Login", 2000)
        });
    }
  }, [loading]); // Execute o efeito somente quando o estado de carregamento mudar

  async function changeActive(active: boolean, userId: string) {
    await server.post('/user/status', {
      id: userId,
      active
    })
      .then((response) => {
        console.log(response);
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
        // setTimeout(() => window.location.href = "/Login", 2000)
      })
  }
  
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
          <Button onClick={() => window.location.href = "/"}>Sair</Button>
        </header >
        <main>
          <PageTitle>Lista de usuários</PageTitle>
          <div>
            <header style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "12px" }}>
              <ListHeaderEl style={{ width: "150px" }}>Usuário</ListHeaderEl>
              <ListHeaderEl style={{ width: "400px" }}>Nome da instituição</ListHeaderEl>
              <ListHeaderEl style={{ width: "150px" }}>Situação</ListHeaderEl>
            </header>
            <main>
              {
                users.map(el => {
                  return (
                    <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "12px" }}>
                      <ListMainEl style={{ width: "150px" }}>{el.userName}</ListMainEl>
                      <ListMainEl style={{ width: "400px" }}>{el.institutionName}</ListMainEl>
                      {
                        el.active ?
                          <div onClick={() => changeActive(false, el.id)}
                            style={{ width: "150px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", borderRadius: "5px", border: "1px solid #99EAE1", cursor: "pointer" }} >
                            <p style={{ width: "15px", height: "15px", background: "#99EAE1", borderRadius: "100%", margin: "0" }}></p>
                            <ElActive>Active</ElActive>
                          </div>
                          :
                          <div onClick={() => changeActive(true, el.id)}
                            style={{ width: "150px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", borderRadius: "5px", border: "1px solid #F0F0F0", cursor: "pointer" }} >
                            <p style={{ width: "15px", height: "15px", background: "#F0F0F0", borderRadius: "100%", margin: "0" }}></p>
                            <ElDisabled>Disabled</ElDisabled>
                          </div>
                      }
                    </div>
                  )
                })
              }
            </main>
          </div>
        </main>
        {
          modal ?
            <div style={{ width: "300px", height: "200px", padding: "10px", position: "absolute", top: "0", right: "0", bottom: "0", left: "0", margin: "auto", textAlign: "center", background: "black", color: "white", display: "flex", justifyContent: "center" }} >
              <p>Deseja aceitar esse usuário</p>
              <Button>Confirmar</Button>
            </div> :
            ""
        }
      </>
    );
  }
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