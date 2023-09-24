import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Paper,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "@/assets/Logo-teste.png";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import server from "@/server";

export default function Login() {
  localStorage.clear();
  
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
    //console.log(data)
    const result = await server.post('/user/login',      
    {        
      userName: data.get("user"),
      password: data.get("password")
    });
    //console.log(result.data.itemType);
    validate(result.data);
  };

  function validate (value: any) {
    //console.log(value);
    if (value.error) { return alert(value.error) }
    if (value.active == true) {
      if (value.itemType == "admin") {
        localStorage.setItem("itemType", value.itemType);
        localStorage.setItem("userId", value.userId);
        console.log(localStorage)
        return window.location.href = "/HomeAdmin"
      } else if (value.itemType == "user") {
        localStorage.setItem("itemType", value.itemType);
        localStorage.setItem("userId", value.userId);
        console.log(localStorage)
        return window.location.href = "/HomeUser"
      }
    }
    return alert("Usuário inativo, entre em contato com o administrador.")
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "#C8BFE7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={Logo} />
          <Typography>Credit Checker</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          //backgroundColor: "#E6E6F0",
          backgroundImage: "url('/assets/Teste.png')",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h4" variant="h4">
            Acessar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuário"
              name="user"
              autoComplete="user"
              autoFocus
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
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
              id="password"
              autoComplete="current-password"
              variant="standard"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre me"
            />
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Box>
            
          </Box>
          <Grid container>
            <Grid item xs>
              <Link
                component={RouterLink}
                to="#"
                underline="hover"
                color="GrayText"
              >
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                to="/register"
                underline="hover"
                color="GrayText"
              >
                Ainda não tem conta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
