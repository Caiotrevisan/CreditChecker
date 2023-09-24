import styled from 'styled-components';
import server from "@/server";

import home from "../../../assets/home.svg"
import printer from "../../../assets/printer.svg"
import { useState } from 'react';

export const HomeAdmin = () => {
  // Colocar dentro do laço de contrução dos Elementos da tabela
  const isActive = true;

  const users = [
    {
      "city": "sao Paulo",
      "password": "12345",
      "active": false,
      "institutionName": "banco SA",
      "institutionType": "banco",
      "userName": "teste",
      "itemType": "user",
      "id": "833a528b-4e68-411e-995b-d7201e618aab",
      "state": "SP"
    },
    {
      "city": "Sampa",
      "password": "12345",
      "active": true,
      "institutionName": "Teste",
      "institutionType": "Banco",
      "userName": "teste1",
      "itemType": "user",
      "id": "8dd2c249-a076-4f83-94a1-f3e3c44a54ea",
      "state": "SP"
    },
    {
      "city": "12345",
      "password": "12345",
      "active": false,
      "institutionName": "12345",
      "institutionType": "12345",
      "userName": "12345",
      "itemType": "user",
      "id": "162cb2ac-dfd7-4835-96b9-cb719b395ffa",
      "state": "12345"
    },
    {
      "city": "Sampa",
      "password": "12345",
      "active": false,
      "institutionName": "Teste",
      "institutionType": "Banco",
      "userName": "teste2",
      "itemType": "user",
      "id": "038a052b-3ef6-4552-96d5-608fb5ee4f16",
      "state": "SP"
    }
  ]

  const [modal, setModal] = useState(false)
  // const [users, setUsers] = useState()

  // server.get('/user/getall')
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // setTimeout(() => window.location.href = "/Login", 2000)
  //   })


  function changeActive(active: any, userId: string) {
    server.post('/user/status', {
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
                        <div onClick={() => changeActive(true, el.id)}
                          style={{ width: "150px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", borderRadius: "5px", border: "1px solid #99EAE1", cursor: "pointer" }} >
                          <p style={{ width: "15px", height: "15px", background: "#99EAE1", borderRadius: "100%", margin: "0" }}></p>
                          <ElActive>Active</ElActive>
                        </div>
                        :
                        <div onClick={() => changeActive(false, el.id)}
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