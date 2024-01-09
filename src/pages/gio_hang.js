import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function GioHang() {
      const [cartItems, setCartItems] =useState([])
      useEffect(()=>{
        const userId = localStorage.getItem('id');
        const items = localStorage.getItem(`cartItems_${userId}`);

        if (items !== null) {
            setCartItems(JSON.parse(items));
        }
    },[]);

    const xoaHandler=(id)=>{
        const userId = localStorage.getItem('id');
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedItems));
            return updatedItems;
        });
    }

    const gioHangUI = () => {
        if (cartItems.length > 0) {
            return (
                
                <div className="giohang">
                    <h5><span>Giỏ hàng</span></h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                cartItems.map(function(item)
                                {
                                    item.thanh_tien=item.gia_ban*item.so_luong;
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.ten}</td>
                                            <td>{item.gia_ban}</td>
                                            <td>{item.so_luong}</td>
                                            <td>{item.thanh_tien}</td>
                                            <td className="cap-xoa"><button onClick={() => xoaHandler(item.id)} className="btn btn-danger">Xoá</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div>
                        <NavLink className="btn btn-primary" id="thanh-toan" to="/thanh-toan">Thanh toán</NavLink>
                    </div>
                </div>
            )
        }
        return <>
        <div className="giohang">
        <img src="./gio-hang/gio-hang-rong.jpg" className="img_gio_hang" alt="..."/>
        <p className="not_product">Giỏ hàng chưa có sản phẩm nào</p>
        <NavLink to="/" type="button" className="btn btn-primary th-ng">Thêm sản phẩm ngay</NavLink>
        </div></>

        
    }
    return (
        <>
            <Header />
            {
                gioHangUI()
            }
            <Footer/>
        </>
    )
}
export default GioHang;