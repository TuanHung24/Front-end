import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ThongTinCaNhan() {
    const navigate = useNavigate();
    const [hoTen, setHoTen] = useState(localStorage.getItem('ho_ten'));
    const [dienThoai, setDienThoai] = useState(localStorage.getItem('dien_thoai'));
    const [diaChi, setDiaChi] = useState(localStorage.getItem('dia_chi'));
    const Email = localStorage.getItem('email');
    const tenDangNhap = localStorage.getItem('ten_tai_khoan');

    const upDateInfo = async () => {
        if (!hoTen || !dienThoai || !diaChi) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        try {
            const duLieuGui = { email:Email,ho_ten: hoTen, so_dien_thoai: dienThoai, dia_chi: diaChi };
            const response = await axios.post('http://127.0.0.1:8000/api/update-info', duLieuGui);
            
            const dt = await response.data.data;

            localStorage.setItem('ho_ten', dt.ho_ten)
            localStorage.setItem('so_dien_thoai', dt.so_dien_thoai);
            localStorage.setItem('dia_chi', dt.dia_chi);

            alert(response.data.message);

            navigate('/info');
        } catch (error) {
            console.error('Lỗi:', error);
            alert("Có lỗi xảy ra khi cập nhật thông tin.");
        }
    };
    
    return (
        <>
            <Header />
            <div className='thong-tin'>
                <div className="mb-3">
                    <h5>Thông tin cá nhân:</h5>
                </div>
    
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={Email} readOnly />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="ten-tai-khoan" className="form-label">Tên tài khoản:</label>
                        <input type="text" className="form-control" id="ten-tai-khoan" value={tenDangNhap} readOnly />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="ho_ten" className="form-label">Họ tên:</label>
                        <input type="text" className="form-control" id="ho-ten" value={hoTen} onChange={(e) => setHoTen(e.target.value)} />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="dien_thoai" className="form-label">Điện thoại:</label>
                        <input type="number" className="form-control" id="dien-thoai" value={dienThoai} onChange={(e) => setDienThoai(e.target.value)} />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="dia_chi" className="form-label">Địa chỉ:</label>
                        <input type="text" className="form-control" id="dia-chi" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} />
                    </div>
                </div><br />
                <button className="btn btn-primary" onClick={upDateInfo}>Cập nhật thông tin</button>
            </div>
            <Footer />
        </>
    )
    }
export default ThongTinCaNhan;    