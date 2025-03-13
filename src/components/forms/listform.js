import {
  Card,
  CardContent,
  Typography,
  Grid2,
  Chip,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import deleteForm from "../../services/deleteForm";

const ListForms = ({ data }) => {
  const router = useRouter();

  const handleOpenEditPage = (id) => {
    router.push(`/forms/${id}`);
  };

  const handleDeleteForm = async (id) => {
    const deleteF = await deleteForm(id);
    if (deleteF) {
      router.reload();
    }
  };

  return (
    <>
      <Grid2 container spacing={2}>
        {data.length > 0 &&
          data.map((item) => {
            return (
              <Grid2 size={12} key={"FORMULARIO-" + item.id}>
                <Card elevation={5}>
                  <CardContent>
                    <Grid2 container>
                      <Grid2 size={9}>
                        <Typography
                          variant="h6"
                          sx={{ color: "text.secondary" }}
                        >
                          {item?.name}
                        </Typography>
                      </Grid2>
                      <Grid2 size={3}>
                        <Chip
                          label={
                            "N° Preguntas :" + item?.questions_responses?.length
                          }
                        />
                      </Grid2>
                      <Grid2
                        mt={2}
                        size={12}
                        container
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          color="terciary"
                          variant="contained"
                          onClick={() => {
                            handleOpenEditPage(item?.id);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          color="terciary"
                          variant="contained"
                          onClick={() => {
                            handleDeleteForm(item?.id);
                          }}
                        >
                          Eliminar
                        </Button>
                      </Grid2>
                    </Grid2>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
      </Grid2>
    </>
  );
};

export default ListForms;
