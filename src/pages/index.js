import AuthGuard from "../lib/auth";

function PrivatePage() {
  return (
    <AuthGuard>
    </AuthGuard>
  );
}

export default PrivatePage;
