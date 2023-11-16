import gmailIcon from "@/assets/gmailImage.png";
import {
  Typography,
  TextField,
  Box,
  Container,
  Stack,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import server from "@/server";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("nomeInst")!.length < 2) {
      return alert("Preencha o nome da instituição!");
    };
    if (data.get("tipoInst")!.length < 4) {
      return alert("Preencha o tipo da instituição!");
    };
    if (data.get("usuario")!.length < 5) {
      return alert("Preencha o nome de usuário!");
    };
    if (data.get("senha")!.length < 5) {
      return alert("Preencha a senha de usuário!");
    }
    if (data.get("repSenha")!.length < 5) {
      return alert("Repita a senha de usuário!");
    }
    if (data.get("cidade")!.length < 5) {
      return alert("Preencha o nome da cidade!");
    }
    if (data.get("uf")!.length < 2) {
      return alert("Preencha o estado (UF)!");
    }
    if (data.get("senha") != data.get("repSenha")) {
      return alert("As senhas não coincidem!");
    };

    try {
      const result = await server.post('/user/new',      
      {
        institutionName: data.get("nomeInst"),
        institutionType: data.get("tipoInst"),
        userName: data.get("usuario"),
        password: data.get("senha"),
        city: data.get("cidade"),
        state: data.get("uf"),
      })

      if (result.data.hasOwnProperty("error")) {
        return alert(result.data.error)
      }
      
      console.log(result.data)
      alert("Cadastro efetuado com sucesso!")
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Erro ao efetuar cadastro: " + error);
      // Trate erros de requisição aqui, se necessário
    }
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
                name="nomeInst"
                placeholder="Nome da instituição"
              />
              <TextField
                name="tipoInst"
                placeholder="Tipo da instituição"
              />
              <TextField
                name="usuario"
                placeholder="Nome do usuário" 
              />
              <TextField
                name="senha"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="repSenha"
                placeholder="Repetir senha"
                type={showPassword ? "text" : "password"}
              />
              <TextField
                name="cidade"
                placeholder="Cidade"
              />
              <TextField
                name="uf"
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
