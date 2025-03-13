import {
  Typography,
  Grid2,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRouter } from "next/router";

const InformationForms = () => {
  const router = useRouter();

  const handleNewForm = () => {
    router.push("/forms/create");
  };
  return (
    <>
      <Grid2
        container
        p={2}
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <Grid2 size={8}>
          <Typography variant="h5">Listado de Formularios</Typography>
        </Grid2>
        <Grid2 size={4}>
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            onClick={handleNewForm}
          >
            Agregar Formulario
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

export default InformationForms;
