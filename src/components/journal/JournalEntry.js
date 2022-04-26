

const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
        <div className="journal__entry-picture"
            style={{
                backgroundSize: 'cover',
                backgroundImage: 'url(https://static.wikia.nocookie.net/marveldatabase/images/6/67/Stephen_Strange_%28Earth-199999%29_from_Spider-Man_No_Way_Home_Promo_001.jpg)'
            }} >
        </div>
        <div className="journal__entry-body">
            <p className="journal__entry-title pointer">Un nuevo dia</p>
            <p className="journal__entry-content pointer">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="journal__entry-date-box">
            <span>Lunes</span>
            <h4>28</h4>
        </div>
    </div>
  )
}

export default JournalEntry