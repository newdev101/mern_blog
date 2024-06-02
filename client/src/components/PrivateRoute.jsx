import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {

  const { currentUser } = useSelector((state )=> state.user);
  console.log("Current User:", currentUser);
  return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}

export default PrivateRoute