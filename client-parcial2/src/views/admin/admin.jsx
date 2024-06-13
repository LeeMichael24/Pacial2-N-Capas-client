import './admin.css'
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangeUserRole from './adminRole/changeUserRole';


function Admin() {

    const buttons = [
        { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
        { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
      ];




  return (
    <section className="PadreHomeAdmin">
      <Navbar />
      <ToastContainer />
      <div className="UserHome">
        <div className="left-container-user">
          <ChangeUserRole />
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  )
}

export default Admin