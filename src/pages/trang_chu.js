import Header from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/banner";
import Products from "../components/products";
import '../App.css';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';

import { useEffect, useState } from "react";


function Trangchu(props)
{
    const [dsLoaiSanPham, setDSLoaiSanPham]=useState([]);

    useEffect(()=>{
        async function getDatFromAPI()
        {
            var response = await fetch('http://127.0.0.1:8000/api/loai-san-pham');
            var json= await response.json();
            setDSLoaiSanPham(json.data);
        }
        getDatFromAPI();
        // fetch('http://127.0.0.1:8000/api/loai-san-pham')
        // .then(response=>response.json())
        // .then(json=>setDSLoaiSanPham(json.data))
        // .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    },[]);

    const listMember=dsLoaiSanPham.map(function(item)
    {
        return (
            <Products member={item}/>
        );
    });
   return(
    <>
    <Header/>
    <Banner/>
    <body>
    <div className="products">{listMember}</div>
    </body>
    <Footer/>
    </>
   )
}

export default Trangchu;