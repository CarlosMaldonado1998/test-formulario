import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Container,
  Button,
  Grid2,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../auth/actions/route";
import { useNotification } from "../../components/design/Notifications";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("Ingresa tu correo electrónico"),
  password: Yup.string()
    .required("Ingresa tu contraseña")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

const customStyle = {
  Container: {
    textAlign: "center",
    padding: "60px",
  },
  Paper: {
    backgroundColor: "rgba(255,255,255)",
    padding: "20px",
  },
  PaperBackground: { backgroundColor: "rgba(26,55,150)" },
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { showNotification } = useNotification();

  const onSubmit = async (data) => {
    const information = await login(data.email, data.password);
    if (information?.user) {
      handleShowNotification("Acceso exitoso", "success");
      router.push("/forms");
    }
    if (information?.error) {
      handleShowNotification(information?.error, "error");
    }
  };

  const handleShowNotification = (mesasage, variant) => {
    showNotification(mesasage, {
      variant: variant, // El tipo de notificación
    });
  };

  return (
    <>
      <div className="fondo">
        <Container maxWidth="lg" style={customStyle.Container}>
          <Grid2 pt={1}>
            <Paper elevation={16} style={customStyle.Paper}>
              <Grid2
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid2 m={1} size={8}>
                  <Typography py={2} variant="h4" align="center">
                    <strong>Inicio de Sesión</strong>
                  </Typography>
                  <Grid2 p={2}>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <Grid2>
                        <Grid2 item xs={12} sm={12}>
                          <TextField
                            id="email"
                            name="email"
                            label="Correo electrónico *"
                            fullWidth
                            margin="dense"
                            {...register("email")}
                            error={errors.email ? true : false}
                          />
                          <Typography variant="inherit" color="error">
                            {errors.email?.message}
                          </Typography>
                        </Grid2>
                        <Grid2 item xs={12} sm={12}>
                          <TextField
                            id="password"
                            name="password"
                            label="Contraseña *"
                            type="password"
                            fullWidth
                            margin="dense"
                            {...register("password")}
                            error={errors.password ? true : false}
                          />
                          <Typography variant="inherit" color="error">
                            {errors.password?.message}
                          </Typography>
                        </Grid2>
                      </Grid2>

                      <Box mt={3} alignItems={"center"}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Iniciar sesión
                        </Button>
                      </Box>
                    </form>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Paper>
          </Grid2>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
