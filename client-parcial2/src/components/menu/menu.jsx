/* eslint-disable react/prop-types */
import ButtonMenu from './buttomMenu/ButtonMenu';
import './menu.css'; // Asegúrate de definir estilos aquí
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = ({ buttons }) => {
  /* función para medir el espacio y contener los botones, según los que genere */
  const [containerHeight, setContainerHeight] = useState('auto');

  useEffect(() => {
    const calculateHeight = () => {
      const buttonHeight = 110; // Altura del botón en px
      const buttonMargin = 20; // Margen superior e inferior del botón en px
      const buttonsPerRow = 2; // Número de botones por fila

      const numRows = Math.ceil(buttons.length / buttonsPerRow);
      const totalHeight = numRows * (buttonHeight + buttonMargin);
      setContainerHeight(`${totalHeight}px`);
    };

    calculateHeight();
  }, [buttons]);

  const isSingleButton = buttons.length === 1; // Verificar si hay solo un botón

  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="menu-container" style={{ height: containerHeight }}>
      {buttons.map((button, index) => (
        <ButtonMenu
          key={index}
          icon={button.icon}
          name={button.name}
          path={button.path}
          isSingleButton={isSingleButton}
          isSelected={location.pathname === button.path} // Pasa la prop isSelected
          onClick={() => handleButtonClick(button.path)}
        />
      ))}
    </div>
  );
};

export default Menu;