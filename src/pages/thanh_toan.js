import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from 'react';
function ThanhToan() {
    const [cartItems,setCartItems]=useState([])

    const hoTen=useRef()
    const dienThoai=useRef()
    const diaChi=useRef()

    useEffect(()=>{
        var items=localStorage.getItem('cartItems');
        if(items!=null)
        {
            setCartItems(JSON.parse(items));
        }
    },[]);

    const xoaHandler=(id)=>{
        console.log('Xoa',id);
        var items=cartItems.filter((item) => item.id !== id);
        setCartItems(items);
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    const testHandler= async()=>{
        var jsonData={
            hd:[
                {khach_hang:"Tuấn Hưng",phuong_thuc_tt:"thanh toán momo"}
            ]
        };
        const response=await fetch('http://127.0.0.1:8000/api/hoa-don',
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(jsonData)
        });
        var json=await response.json();
        alert(json.message);
    }

    const thanhToanUI = () => {
        if (cartItems.length > 0) {
            return (
                <div className='thanhtoan'>
                    <h1>Thanh toán</h1>
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
                                    item.thanh_tien=item.so_luong*item.gia_ban;
                                    return(
                                <tr>
                                <th scope="row">{item.ten}</th>
                                <td>{item.gia_ban}</td>
                                <td>{item.so_luong}</td>
                                <td>{item.thanh_tien}</td>
                                <td className="cap-xoa"><button className="btn btn-danger" onClick={()=>xoaHandler(item.id)}>Xoá</button><br /></td>
                                </tr>
                                    )
                            
                                })
                            
                            }
                        </tbody>
                    </table>
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
                        <div className="mb-3">
                            <span>Thông tin người nhập hàng:</span>
                        </div>
                        <div className="mb-3">
                            <label for="ho_ten" className="form-label">Họ tên:</label>
                            <input type="text" className="form-control" id="ho-ten" ref={hoTen}/>
                        </div>
                        <div className="mb-3" >
                            <label for="dien_thoai" className="form-label">Điện thoại:</label>
                            <input type="text" className="form-control" id="dien-thoai" ref={dienThoai} />
                        </div>
                        <div className="mb-3">
                            <label for="dia_chi" className="form-label">Địa chỉ:</label>
                            <input type="text" className="form-control" id="dia-chi" ref={diaChi}/>
                        </div>
                        <div className="mb-3">
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
                        <button className="btn btn-warning" onClick={()=>testHandler()}>Thanh toán</button>
                        
            <Footer />
        </>
    )
}

export default ThanhToan;