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
import { useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import server from "@/server";

export const RegisterUpdate = () => {
    if (localStorage.getItem("itemType") != "user") {
        return (
        <div>
          <p>Usuário não autenticado!</p>
        </div>
        );
    } else {
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

        if (data.get("senha")!.length < 5) {
            return alert("Preencha a senha de usuário!");
        };
          if (data.get("repSenha")!.length < 5) {
            return alert("Repita a senha de usuário!");
        };
        if (data.get("senha") != data.get("repSenha")) {
            return alert("As senhas não coincidem!");
        };

        try {
            const result = await server.patch('/user/update',
            {
                id: localStorage.getItem("userId"),
                password: data.get("senha")
            });
        console.log(result.data);
        alert(result.data);
        } catch (error) {
            console.error(error);
            alert("Erro ao efetuar atualizacao: " + error);
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
                        Atualizar Cadastro
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
                            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                                <Button variant="contained" size="large" type="submit">
                                    Confirmar
                                </Button>
                                <Link to="/HomeUser">
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
    }
};
