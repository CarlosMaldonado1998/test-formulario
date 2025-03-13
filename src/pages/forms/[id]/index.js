import AuthGuard from "../../../lib/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getFormById from "../../../services/useGetFormsById";
import EditForm from "../../../components/forms/actions/edit";

function HomeForm() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFormById(id);
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AuthGuard>
      <EditForm data={data} />
    </AuthGuard>
  );
}

export default HomeForm;
