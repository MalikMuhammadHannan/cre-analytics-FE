import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRouter({ element }) {
  const { isLogin } = useSelector((state) => state.authReducer);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}

export default ProtectedRouter;
