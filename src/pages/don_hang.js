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

    const huyDonHandler = (index) => {
        // Xóa đơn hàng tại chỉ số index
        const updatedOrders = [...orderItems];
        updatedOrders.splice(index, 1);

        // Lưu danh sách đơn hàng đã cập nhật vào localStorage
        const userId = localStorage.getItem('id');
        localStorage.setItem(`orderItems_${userId}`, JSON.stringify(updatedOrders));

        // Cập nhật state để re-render giao diện
        setOrderItems(updatedOrders);
    };
    

    const gioHangUI = () => {
       if (orderItems.length > 0) {
            return orderItems.map((order, index) => (
                <div className="giohang" key={index}>
                    <h5><span>Hóa đơn đã đặt</span></h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Màu sắc</th>
                                <th scope="col">Dung lượng</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">Hủy đơn</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr key={order.id}>
                                <td>{order.ten}</td>
                                <td>{order.mau_sac}</td>
                                <td>{order.dung_luong}</td>
                                <td>{order.gia_ban}</td>
                                <td>{order.so_luong}</td>
                                <td>{order.gia_ban * order.so_luong}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => huyDonHandler(index)}>
                                        Hủy đơn
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ));
        }
        return <>
        <div className="giohang">
        <img src="./gio-hang/gio-hang-rong.jpg" className="img_gio_hang" alt="..."/>
        <p className="not_product">Chưa có đơn hàng nào được đặt</p>
        <NavLink to="/" type="button" className="btn btn-primary th-ng">Thêm sản phẩm ngay</NavLink>
        </div>
        </>

        
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