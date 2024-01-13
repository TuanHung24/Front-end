import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
function ThanhToan() {
    const [cartItems,setCartItems]=useState([])
   
    const token = localStorage.getItem('token');
    const hoTen=useRef()
    const dienThoai=useRef()
    const diaChi=useRef()
    var tongTien=0;

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
    
    
    
    

    const thanhToanHander = () => {
        const userId = localStorage.getItem('id');
        // Lấy danh sách đơn hàng cũ từ localStorage
        const savedOrders = localStorage.getItem(`orderItems_${userId}`);
        let orders = savedOrders ? JSON.parse(savedOrders) : [];
    
        // Thêm các mục trong cartItems vào danh sách đơn hàng
        orders = [...orders, ...cartItems];
        
        // Lưu danh sách đơn hàng đã cập nhật vào localStorage
        localStorage.setItem(`orderItems_${userId}`, JSON.stringify(orders));
        
        // Xóa cartItems khỏi localStorage và cập nhật state
        localStorage.removeItem(`cartItems_${userId}`);
        setCartItems([]);
    }


    const testHandler = async () => {
        try {
            var jsonData = {
                hd: [
                    {
                        khach_hang: hoTen.current.value,
                        tong_tien: tongTien,
                        dia_chi: diaChi.current.value, 
                        dien_thoai: dienThoai.current.value,
                        phuong_thuc_tt: "Thanh toán khi nhận hàng"
                    }
                ],
                cthd: cartItems.map(item => ({
                    san_pham_id: item.id,
                    mau_sac_id:item.mau_sac_id,
                    dung_luong_id:item.dung_luong_id,
                    so_luong: item.so_luong,
                    gia_ban: item.gia_ban,
                    thanh_tien: item.thanh_tien
                }))
            };
    
            const response = await axios.post('http://127.0.0.1:8000/api/hoa-don', jsonData, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            
            alert(response.data.message);
            thanhToanHander();
            window.location.href = '/';
        } catch (error) {
            // Xử lý lỗi tại đây
            console.error("Có lỗi xảy ra:", error);
            alert("Có lỗi khi gửi dữ liệu!");
        }
    }
    console.log(cartItems)
    const thanhToanUI = () => {
        if (cartItems.length > 0) {
            return (
                <div className='thanhtoan'>
                    <h5>Thanh toán</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Màu sắc</th>
                                <th scope="col">Dung lượng</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                cartItems.map(function(item)
                                {
                                    item.thanh_tien=item.so_luong*item.gia_ban;
                                    tongTien+=item.thanh_tien;
                                    return(
                                <tr>
                                <td scope="row">{item.ten}</td>
                                <td>{item.mau_sac}</td>
                                <td>{item.dung_luong}</td>
                                <td>{item.gia_ban}</td>
                                <td>{item.so_luong}</td>
                                <td>{item.thanh_tien}</td>
                                <td className="cap-xoa"><button className="btn btn-danger" onClick={()=>xoaHandler(item.id)}>Xoá</button></td>
                                </tr>
                                
                                    )
                                        
                                })
                            }
                           
                        </tbody>
                        
                    </table>
                    <h6 className='thanh_tien'>Tổng tiền: {tongTien}đ</h6>
                </div>
            )
        }
    }
    return (
        <>
            <Header />
            {
                thanhToanUI()
            }
                <div className='thanhtoan'>
                        <div className="mb-3">
                            <h5>Thông tin người nhận hàng:</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label for="ho_ten" className="form-label">Họ tên:</label>
                                <input type="text" className="form-control" id="ho-ten" ref={hoTen} value={localStorage.getItem('ho_ten')} />
                            </div>
                        </div>

                        
                            
                        <div className="row">
                            <div className="col-md-6">
                                <label for="dien_thoai" className="form-label">Điện thoại:</label>
                                <input type="number" className="form-control" id="dien-thoai" ref={dienThoai} value={localStorage.getItem('dien_thoai')} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label for="dia_chi" className="form-label">Địa chỉ:</label>
                                <input type="text" className="form-control" id="dia-chi" ref={diaChi} />
                            </div>
                        </div>
                       
                        
                        <div className="col-md-6">
                            <span>Phương thức thanh toán:</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                            <label className="form-check-label" for="flexRadioDefault1">
                                COD
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                Chuyển khoản qua ngân hàng
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" for="flexRadioDefault3">
                                Chuyển khoản qua MoMo
                            </label>
                        </div>
                        <button className="btn btn-warning" onClick={testHandler}>Thanh toán</button>
                        </div>
            <Footer />
        </>
    )
}

export default ThanhToan;