import AuthGuard from "../../lib/auth";
import { Grid2 } from "@mui/material";
import CreateForm from "../../components/forms/actions/create";

function PrivatePage() {
  return (
    <AuthGuard>
      <Grid2 container spacing={2} m={5}>
        <CreateForm />
      </Grid2>
    </AuthGuard>
  );
}

export default PrivatePage;
