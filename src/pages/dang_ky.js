import { NavLink } from 'react-router-dom';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';

function DangKy() {
    return (<>
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-7">
                    <div className="card" >
                        <div className="card-body p-5">
                            <h2 className="text-uppercase text-center mb-5">Đăng ký tài khoản</h2>
                            <form method='POST'>
                                <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1cg">Họ tên:</label>
                                    <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                                    
                                    <div className="form-notch"><div className="form-notch-leading" ></div><div className="form-notch-middle" ></div><div className="form-notch-trailing"></div></div></div>

                                <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example3cg">Email:</label>
                                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                                    
                                    <div className="form-notch"><div className="form-notch-leading"></div><div className="form-notch-middle"></div><div className="form-notch-trailing"></div></div></div>

                                <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example4cg">Tên tài khoản:</label>
                                    <input type="text" id="form3Example4cg" className="form-control form-control-lg" />
                                    <div className="form-notch"><div className="form-notch-leading"></div><div className="form-notch-middle"></div><div className="form-notch-trailing"></div></div></div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example4cdg">Mật khẩu:</label>
                                    <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />                                  
                                    <div className="form-notch"><div className="form-notch-leading"></div><div className="form-notch-middle">
                                        </div><div className="form-notch-trailing"></div></div></div>

                                

                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Đăng ký</button>
                                </div>
                                <p className="text-center text-muted mt-5 mb-0">Bạn đã có tài khoản? <NavLink to="/dang-nhap" className="fw-bold text-body"><u>Đăng nhập</u></NavLink></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default DangKy;