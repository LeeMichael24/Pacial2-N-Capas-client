import "./cardDetail.css";

function CardDetail({ title, date, time, presciption, onClick, isSelected }) {
  return (
    <div className="card-container" onClick={onClick}>
      <div className="contentCard">
        <h1>Cita #{title}</h1>
        <div className="down-container">
          <div className="dia-container">
            <h2>Fecha:</h2>
            <div className="text">{date}</div>
          </div>
          <div>
            <h2>Hora:</h2>
            <div className="text">{time}</div>
          </div>
          {isSelected && (
            <div>
              <h2>Prescripción:</h2>
              <div className="text">{presciption}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
