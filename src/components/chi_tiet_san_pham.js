import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
function CTSanPham(props)
{
    const soLuong=useRef()
    const chonMuaHandler=()=>{
        var sanPham={id:props.data.id,ten:props.data.ten,gia_ban:props.data.gia_ban,so_luong:parseInt(soLuong.current.value),
            loai_san_pham:props.data.loai_san_pham.ten}
        var cartItems =localStorage.getItem('cartItems');
        if(cartItems ==null)
        {
            cartItems= [sanPham]
        }
        else
        {
            cartItems=JSON.parse(cartItems);
            var i=0;
            for(;i<cartItems.length;i++)
            {
                if(cartItems[i].id ===sanPham.id)
                {
                    cartItems[i].so_luong+=sanPham.so_luong;
                    break;
                }
            }
            if(i === cartItems.length)
            {
                cartItems.push(sanPham);
            }
            
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Thêm sản phẩm vào giỏ hàng thành công!');
    }
    return(
        <>
        <Header/>
        <div className="chi-tiet">
        <img src={`http://127.0.0.1:8000/${props.data.img[0].ten}`} alt="hinh-anh" className="img-ct"/>
        <p>Tên sản phẩm: {props.data.ten}</p>
        <p>Giá bán: {props.data.gia_ban}</p>
        <p>Số lượng:<i> còn {props.data.so_luong}</i></p>
        <p>Tên loại sản phẩm: {props.data.loai_san_pham.ten}</p>
        <p className="quantity">
          Số lượng:
          <input type="number" className="form-control quantity" min="1" max={props.data.so_luong} ref={soLuong}/>
        </p>
        <NavLink to={`/thanh-toan`} onClick={chonMuaHandler} className="btn btn-primary">Mua ngay</NavLink>
        <button onClick={chonMuaHandler} className="btn btn-light">Thêm vào giỏ hàng</button>
        </div>
        <Footer/>
        </>
    )
}
export default CTSanPham;