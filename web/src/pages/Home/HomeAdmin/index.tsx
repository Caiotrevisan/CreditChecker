import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Header } from "@/components/HomeHeader";

export const HomeAdmin = () => {
  return (
    <>
      <Header isAdmin />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Typography variant="h1" gutterBottom>
          Parâmetros
        </Typography>
      </Container>
    </>
  );
};
