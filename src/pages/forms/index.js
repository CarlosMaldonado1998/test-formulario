import ListForms from "../../components/forms/listform";
import AuthGuard from "../../lib/auth";
import { Grid2 } from "@mui/material";
import InformationForms from "../../components/forms/information";
import getForms from "../../services/useGetForms";
import { useState, useEffect } from "react";

function HomeForm() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getForms(); 
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []); 

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AuthGuard>
      <Grid2 container spacing={2} m={5}>
        <Grid2 size={12}>
          <InformationForms />
        </Grid2>
        <Grid2 size={10}>
          <ListForms data={data} />
        </Grid2>
      </Grid2>
    </AuthGuard>
  );
}

export default HomeForm;
