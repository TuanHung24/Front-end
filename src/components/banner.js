function Banner()
{
    return (
        <div id="carouselExampleControls" classNameName="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="avtBanner/banner1.jpg" className="d-block w-50" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="avtBanner/banner1.jpg" className="d-block w-50" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="avtBanner/banner3.jpg" className="d-block w-50" alt="..."/>
    </div>
    <img src="avtBanner/banner-gg.png" className="banner" alt="..."/><br/>
    <img src="avtBanner/banner-oppo.png" className="banner1" alt="..."/>
  </div>
  {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button> */}
  
</div>
    )
}

export default Banner;