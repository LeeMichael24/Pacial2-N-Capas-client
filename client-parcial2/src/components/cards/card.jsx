import "./card.css";


const Card = () => {
    const Data = [
        { id: 1, title: '34', date: '04/20/24', time: '11:30', presciption: '2 pastilla cada 12h, por 5 días' },
        { id: 2, title: '48', date: '05/20/24', time: '14:30', presciption: '2 pastilla cada 12h, por 5 días' },
        { id: 3, title: '83', date: '02/20/24', time: '15:39', presciption: '2 pastilla cada 12h, por 5 días' },
        { id: 4, title: '89', date: '04/24/24', time: '16:00', presciption: '2 pastilla cada 12h, por 5 días' },
        { id: 5, title: '29', date: '04/24/24', time: '16:00', presciption: '2 pastilla cada 12h, por 5 días' },
    ];

  return (
    <div className="card-container">
        { Data.map((item) => {
            return (
             <>
                <h1>Cita #{item.title}</h1>
                <div className="down-container">
                    <div>
                        <h2>Fecha:</h2>
                        <div>{item.date}</div> 
                    </div>
                    <div>
                        <h2>Hora:</h2>
                        <div>{item.time}</div>
                    </div>
                    <div>
                        <h2>Prescipción:</h2>
                        <div>{item.presciption}</div>
                    </div>
                </div>
             </>
            );
        })}
    </div>
  )
}

export default Card