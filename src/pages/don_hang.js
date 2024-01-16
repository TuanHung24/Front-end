import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function DonHang() {
      const [orderItems, setOrderItems] =useState([])

      useEffect(()=>{
        const userId = localStorage.getItem('id');
        const items = localStorage.getItem(`orderItems_${userId}`);

        if (items !== null) {
            setOrderItems(JSON.parse(items));
        }
    },[]);
   
    const huyDonHandler = (orderId) => {
        const userId = localStorage.getItem('id');
        let updatedOrders = orderItems.filter(order => order.orderId !== orderId);

        localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));
        setOrderItems(updatedOrders);
    };
   
   const gioHangUI = () => {
    if (orderItems.length > 0 ) {
        return orderItems.map((order, orderIndex) => (
            <div className="don_hang" key={orderIndex}>
                <h5><span>Hóa đơn đã đặt: {order.orderId}</span></h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Màu sắc</th>
                            <th scope="col">Dung lượng</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {order.items && order.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <td>{item.mau_sac}</td>
                                <td>{item.dung_luong}</td>
                                <td>{item.gia_ban}</td>
                                <td>{item.so_luong}</td>
                                <td>{item.gia_ban * item.so_luong}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => huyDonHandler(order.orderId)}>
                    Hủy đơn
                </button>
            </div>
        ));
    }
        return (
            <div className="giohang">
                <img src="./gio-hang/gio-hang-rong.jpg" className="img_gio_hang" alt="..."/>
                <p className="not_product">Chưa có đơn hàng nào được đặt</p>
                <NavLink to="/" type="button" className="btn btn-primary th-ng">Thêm sản phẩm ngay</NavLink>
            </div>
        );
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
export default DonHang;