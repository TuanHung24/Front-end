import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
function CTSanPham(props)
{
    const soLuong=useRef()
    const [Count,setCount]=useState(1);


    

    const chonMuaHandler=()=>{
        
        var sanPham={id:props.data.id,ten:props.data.ten,gia_ban:props.data.chi_tiet_san_pham[0].gia_ban,so_luong:parseInt(soLuong.current.value),
            loai_san_pham:props.data.loai_san_pham.ten};
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
                if(cartItems[i].id ===sanPham.id )
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
    const HandelCong=()=>{
        if(Count<props.data.chi_tiet_san_pham[0].so_luong){
            setCount(Count+1);
        }
            
        else{
            setCount(props.data.chi_tiet_san_pham[0].so_luong);
        }
    }
    const HandelTru=()=>{
        if(Count===1 || Count<1)
        {
            setCount(1);
        }
        else
        {
            setCount(Count-1);
        }
        
    }
    

    const getUniqueDungLuongs = (chiTietSanPham) => {
        const unique = new Map();
        return chiTietSanPham.filter(item => {
            const isUnique = !unique.has(item.dung_luong.ten);
            unique.set(item.dung_luong.ten, true);
            return isUnique;
        });
    };
    return(
        
        <>
       
        <Header/>
        <div className="chi-tiet">
        <img src={`http://127.0.0.1:8000/${props.data.img[0].img_url}`} alt="hinh-anh" className="img-ct"/>
        <p>Tên sản phẩm: {props.data.ten}</p>

        {props.data.chi_tiet_san_pham && getUniqueDungLuongs(props.data.chi_tiet_san_pham).map((item) => (
                            <span className="dung_luong">
                                {item.dung_luong.ten || ''}
                            </span>
                            ))}

        <p>Giá bán: {props.data.chi_tiet_san_pham[0].gia_ban}</p>
        <p>Số lượng:<i> còn {props.data.chi_tiet_san_pham[0].so_luong}</i></p>
        <p>Tên loại sản phẩm: {props.data.loai_san_pham.ten}</p>
        
        <p className="quantity">
          Số lượng:
          <button className="tru-so-luong" onClick={HandelTru}>-</button>
          <input type="number" className="form-control quantity" value={Count} ref={soLuong} readOnly/>
          <button className="cong-so-luong" onClick={HandelCong}>+</button>
        </p>
        
        <NavLink to={`/thanh-toan`} onClick={chonMuaHandler} className="btn btn-primary">Mua ngay</NavLink>
        <button onClick={chonMuaHandler} className="btn btn-light">Thêm vào giỏ hàng</button>
        </div>
        <Footer/>
        </>
    )
}
export default CTSanPham;