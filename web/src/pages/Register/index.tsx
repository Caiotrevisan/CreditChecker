import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import gmailIcon from "@/assets/gmailImage.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Header } from "@/components/HomeHeader";
//const Item = styled(TextField)(({ theme }) => ({
/*backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,*/
//}));

export const Register = () => {
  return (
    <>
      <Header isAdmin={false} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box>
          <Typography variant="h1" gutterBottom>
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
          <Stack direction="column" spacing="0.5">
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">Ou</Typography>
          <img src={gmailIcon} />
          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
