import { Paper, styled, Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Parameters {
  taxa: string;
  idade: number;
  salario: number;
  financiamento: string;
  valor: number;
  correntista: boolean;
}

export const ParametersTable = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Item>Teste</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Teste</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Teste</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Teste</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Teste</Item>
      </Grid>
    </Grid>
  );
};
