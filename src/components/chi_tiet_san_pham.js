import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
function CTSanPham(props)
{
    const soLuong=useRef()
    const [Count,setCount]=useState(1);

    const [tonKho, setTonKho] = useState(0);
    const [selectedDungLuong, setSelectedDungLuong] = useState(null);
    const [selectedMauSac, setSelectedMauSac] = useState(null);

    useEffect(() => {
        
        if (props.data.chi_tiet_san_pham.length > 0) {
            const defaultDungLuong = props.data.chi_tiet_san_pham[0].dung_luong.ten;
            const defaultMauSac = props.data.chi_tiet_san_pham[0].mau_sac.ten;
            const defaultTonKho = props.data.chi_tiet_san_pham[0].so_luong;
            setSelectedDungLuong(defaultDungLuong);
            setSelectedMauSac(defaultMauSac);
            setTonKho(defaultTonKho);
        }
    }, [props.data.chi_tiet_san_pham]);


    const handleMauSacClick = (mauSac) => {
        setSelectedMauSac(mauSac);
    
        const chiTietSanPhamSelected = props.data.chi_tiet_san_pham
            .find(item => item.dung_luong.ten === selectedDungLuong && item.mau_sac.ten === mauSac);
    
        if (chiTietSanPhamSelected) {
            setTonKho(chiTietSanPhamSelected.so_luong);
            setCount(1); 
        }
    };

    const chonMuaHandler=()=>{
        
        const chiTietSanPhamSelected = props.data.chi_tiet_san_pham.find(item =>
            item.dung_luong.ten === selectedDungLuong && item.mau_sac.ten === selectedMauSac);
    
        if (!chiTietSanPhamSelected) {
            alert('Không tìm thấy chi tiết sản phẩm!');
            return;
        }
    
        var sanPham = {
            id: chiTietSanPhamSelected.id,
            ten: props.data.ten,
            gia_ban: chiTietSanPhamSelected.gia_ban,
            so_luong: parseInt(soLuong.current.value),
            dung_luong: chiTietSanPhamSelected.dung_luong.ten,
            dung_luong_id: chiTietSanPhamSelected.dung_luong.id,
            mau_sac: chiTietSanPhamSelected.mau_sac.ten,
            mau_sac_id: chiTietSanPhamSelected.mau_sac.id,
        };
        
        const userId = localStorage.getItem('id');
        
        var cartItems = localStorage.getItem(`cartItems_${userId}`);
        
        if(cartItems === null)
        {
            cartItems= [sanPham]
        }
        else
        {
            cartItems=JSON.parse(cartItems);
            var i=0;
            
            for(;i<cartItems.length;i++)
            {
                if(cartItems[i].id === sanPham.id )
                {
                    cartItems[i].so_luong+=sanPham.so_luong;
                    break;
                }
                else{
                    alert('Vui lòng nhập số lượng!');
                    break;
                }
            }
            if(i === cartItems.length)
            {
                cartItems.push(sanPham);
            }
            
        }
        
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
        alert('Thêm sản phẩm vào giỏ hàng thành công!');
    }

    const HandelCong = () => {
        if (Count < tonKho) {
            setCount(Count + 1);
        }
    };
    const HandelTru = () => {
        if (Count > 1) {
            setCount(Count - 1);
        }
    };
    
    

    const getUniqueDungLuongs = (chiTietSanPham) => {
        const unique = new Map();
        return chiTietSanPham.filter(item => {
            const isUnique = !unique.has(item.dung_luong.ten);
            unique.set(item.dung_luong.ten, true);
            return isUnique;
        });
    };

    const handleDungLuongClick = (dungLuong) => {
        setSelectedDungLuong(dungLuong);
    
        // Tìm các màu sắc có sẵn cho dung lượng được chọn
        const mauSacCoSan = props.data.chi_tiet_san_pham
            .filter(item => item.dung_luong.ten === dungLuong)
            .map(item => item.mau_sac.ten);
    
        // Nếu có màu sắc có sẵn, chọn màu sắc đầu tiên
        if (mauSacCoSan.length > 0) {
            setSelectedMauSac(mauSacCoSan[0]);
        } else {
            setSelectedMauSac(null);
        }
    
        // Cập nhật tonKho và Count
        const chiTietSanPhamSelected = props.data.chi_tiet_san_pham
            .find(item => item.dung_luong.ten === dungLuong && item.mau_sac.ten === mauSacCoSan[0]);
    
        if (chiTietSanPhamSelected) {
            setTonKho(chiTietSanPhamSelected.so_luong);
            setCount(1);
        }
    };
    return(
        
        <>
       
        <Header/>
        <div className="chi-tiet">
                <img src={`http://127.0.0.1:8000/${props.data.img[0].img_url}`} alt="hinh-anh" className="img-ct" />
                <p>Tên sản phẩm: {props.data.ten}</p>

                {getUniqueDungLuongs(props.data.chi_tiet_san_pham).map((item) => (
                    <span
                        key={item.dung_luong.id}
                        className={`dung_luong ${selectedDungLuong === item.dung_luong.ten ? 'selected' : ''}`}
                        onClick={() => handleDungLuongClick(item.dung_luong.ten)}
                    >
                        {item.dung_luong.ten + "GB" || ''}
                    </span>
                ))}
                <br/><br/>

                {props.data.chi_tiet_san_pham
                    .filter(item => item.dung_luong.ten === selectedDungLuong)
                    .map((item) => (
                        <span
                            key={item.id}
                            className={`mau_sac ${selectedMauSac === item.mau_sac.ten ? 'selected' : ''}`}
                            onClick={() => handleMauSacClick(item.mau_sac.ten)}
                        >
                            {item.mau_sac.ten || ''}
                        </span>
                    ))}
                <br/><br/>
                <p>Giá bán: {props.data.chi_tiet_san_pham
                    .find(item => item.dung_luong.ten === selectedDungLuong)?.gia_ban}</p>
                <p>Số lượng:<i> còn {tonKho}</i></p>
                <p>Tên loại sản phẩm: {props.data.loai_san_pham.ten}</p>
                
                <p className="quantity">
                    Số lượng:
                    <button className="tru-so-luong" onClick={HandelTru}>-</button>
                    <input type="number" className="input-so-luong" value={Count} ref={soLuong} readOnly/>
                    <button className="cong-so-luong" onClick={HandelCong}>+</button>
                </p>
                
                <NavLink to={`/thanh-toan`} onClick={chonMuaHandler} className="btn btn-danger mua-ngay">Mua ngay</NavLink>
                <button onClick={chonMuaHandler} className="btn btn-primary them-vao-gio">Thêm vào giỏ hàng</button>
            </div>
        <Footer/>
        </>
    )
}
export default CTSanPham;