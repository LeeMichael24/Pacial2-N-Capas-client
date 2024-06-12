import { useNavigate } from 'react-router-dom';
import './ButtonMenu.css'; // Asegúrate de definir estilos aquí

// eslint-disable-next-line react/prop-types
const ButtonMenu = ({ icon, name, path, isSelected, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className={`button-menu ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      {icon}
      <span className="button-name">{name}</span>
    </div>
  );
};

export default ButtonMenu;