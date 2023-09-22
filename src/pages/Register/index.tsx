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

export const Register = () => {
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
