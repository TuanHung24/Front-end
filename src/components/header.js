import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {faBell,faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";


function Header() {

  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');

  useEffect(() => {
    // Lấy thông tin từ localStorage sau khi component được render
    const storedHoTen = localStorage.getItem('token');
    const storedSoDienThoai = localStorage.getItem('so_dien_thoai');
    console.log(storedHoTen);
    if (storedHoTen && storedSoDienThoai) {
      setHoTen(storedHoTen);
      setSoDienThoai(storedSoDienThoai);
    }
  }, []);

  return (
    <>
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          </ul>
          
          {/* <div className="text-end">
            <NavLink to="/dang-nhap" type="button" className="btn btn-outline-light me-2">Login</NavLink>
            <NavLink to="/dang-ky" type="button" className="btn btn-warning">Sign-up</NavLink>
          </div> */}
        </div>
      </div>
    </header>
    <section className="w-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
         
          <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>

        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
           
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <NavLink to="/" className="nav-link active white">Trang chủ</NavLink>
            </li>
            <li>
              <NavLink to="/gioi-thieu" className="nav-link">Giới thiệu</NavLink>
            </li>
            <li>
              <NavLink to="/tu-van" className="nav-link">Tư vấn</NavLink>
            </li>
            </ul>
          </div>
        
          <form className="col-12 col-lg-auto mb-3 mb-lg-0">
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <div className="login-out">
              <FontAwesomeIcon icon={faUser} size="1x" className="ml-2"/>&nbsp;
              <NavLink to="/dang-nhap">Đăng nhập</NavLink>|
              <NavLink to="/dang-ky">Đăng ký</NavLink> 
          </div>   
          <div className="d-flex align-items-center">
          
            <NavLink className="text-reset me-3" to="/gio-hang">
              <FontAwesomeIcon icon={faCartShopping} size="2x" className="mr-4"/>
            </NavLink>
            <div className="dropdown">
              <NavLink className="text-reset me-3 dropdown-toggle hidden-arrow"  id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faBell} size="2x" className="ml-2"/>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <NavLink className="dropdown-item" to="#" >Some news</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">Another news</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                </li>
              </ul>
            </div> 
              
          </div>
          
        </div>
        
      </nav>
    </section>
    
    
    </>
    
  )
}
export default Header;
