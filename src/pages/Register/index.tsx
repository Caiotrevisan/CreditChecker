import gmailIcon from "@/assets/gmailImage.png";
import {
  Typography,
  TextField,
  Box,
  Container,
  Stack,
  Button,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import server from "@/server";

// axios.get('/report/' + user_id)
//             .then((response) => {
//                 setRes(response.data.body)
//                 setConfig(response.data.body.config)
//             })
//             .catch((error) => {
//                 setNoUser(true)
//                 setTimeout(() => window.location.href = "/Login", 2000)
//             })

// axios.post('/' + mode,
// data, {
// headers: { 'Content-Type': 'application/json' }
// })
// .then(function (response) {
//     console.log(response);
//     axios
//         .patch('/user/' + user_id, {
//             balanceValue: mode === "expanse" ? balance - (+value) : balance + (+value),
//             totalIncomes: totalIncomes,
//             totalExpanses: totalExpanses
//         })
//         .then((response) => {
//             console.log('Update successful:', response.data);
//             window.location.href = "/";
//         })
//         .catch((error) => {
//             console.error('Error updating data:', error);
//         });

// })
// .catch(function (error) {
//     console.log(error);
// });


// axios
// .patch('/user/' + user_id, {
//     balanceValue: removeConfirmItemMode === "income" ? balance - removeValueItem : balance + removeValueItem,
//     totalIncomes: totalIncomes,
//     totalExpanses: totalExpanses
// })
// .then((response) => {
//     window.location.href = "/";
// })
// .catch((error) => {
//     console.error('Error updating data:', error);
// });

export const Register = () => {
  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await server.post('/user/new',      
    {
              
      usuario: data.get("user"),        
      senha: data.get("password")      
    })
    console.log(result.data)
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <Box>
          <Typography variant="h4" component="h2">
            Cadastro
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl>
            <Stack
              spacing={1}
              sx={{
                my: 2,
                input: {
                  width: "60ch",
                  height: "1ch",
                },
              }}
            >
              <TextField
                id="nomeInst"
                name="Nome da instituição"
                placeholder="Nome da instituição"
              />
              <TextField
                id="tipoInst"
                name="Tipo da instituição"
                placeholder="Tipo da instituição"
              />
              <TextField
                id="usuario"
                name="Nome do usuário" 
                placeholder="Nome do usuário" 
              />
              <TextField
                id="senha"
                name="Senha"
                placeholder="Senha"
                type="password"
              />
              <TextField
                id="repSenha"
                name="Repetir senha"
                placeholder="Repetir senha"
                type="password"
              />
              <TextField
                id="cidade"
                name="Cidade"
                placeholder="Cidade"
              />
              <TextField
                id="uf"
                name="Estado"
                placeholder="Estado"
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                img: {
                  m: 1,
                },
              }}
            >
              <Typography variant="h6">Ou</Typography>
              <img style={{
                cursor: "pointer",
              }} src={gmailIcon} />
              <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" type="submit">
                    Confirmar
                  </Button>
                <Link to="/">
                  <Button
                    variant="outlined" size="large">
                    Voltar
                  </Button>
                </Link>
              </Stack>
            </Box>
          </FormControl>
        </Box >
      </Container >
    </>
  );
};
