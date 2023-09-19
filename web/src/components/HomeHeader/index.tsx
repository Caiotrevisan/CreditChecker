import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { HeaderButton } from "./HeaderButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
});
const StyledButton = styled(Button)({});
const HomeDetail = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
});

export const Header = ({ isAdmin }: { isAdmin?: boolean }) => {
  return (
    <StyledContainer>
      <HomeDetail>
        <HomeOutlinedIcon />
        <Typography>Home {`${isAdmin ? "Administrador" : ""}`}</Typography>
      </HomeDetail>
      {isAdmin ? <StyledButton>Sair</StyledButton> : <HeaderButton />}
    </StyledContainer>
  );
};
