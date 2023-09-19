import { createTheme } from "@mui/material";

export default function Theme() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#99eae1",
        contrastText: "#fff",
      },
      secondary: {
        main: "#F0F0F0",
        contrastText: "#818094",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h4: {
            color: "#04022A",
            fontFamily: "Poppins",
            fontWeight: 600,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            textTransform: "capitalize",
            padding: "8px",
            width: "180px",
            fontWeight: 600,
          },
        },
      },
    },
  });

  return theme;
}
