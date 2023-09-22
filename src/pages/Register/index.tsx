import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3333';


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
  axios.post('/user/new',
    {

    }, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

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
                name="Nome da instituição"
                placeholder="Nome da instituição"
              />
              <TextField
                name="Tipo da instituição"
                placeholder="Tipo da instituição"
              />
              <TextField name="Nome do usuário" placeholder="Nome do usuário" />
              <TextField
                name="Nome da instituição"
                placeholder="Nome da instituição"
              />
              <TextField name="Senha" placeholder="Senha" type="password" />
              <TextField
                name="Repetir senha"
                placeholder="repetir senha"
                type="password"
              />
              <TextField name="Cidade" placeholder="Cidade" />
              <TextField name="Estado" placeholder="Estado" />
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
                <Link to="/">
                  <Button variant="contained" size="large">
                    Confirmar
                  </Button>
                </Link>
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
