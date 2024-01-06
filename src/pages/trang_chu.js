import Header from "../components/header";
import Footer from "../components/footer";
import Products from "../components/products";
import '../App.css';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';

import { useEffect, useState } from "react";

import axios from "axios";
import ListBanner from "./list_banner";


function Trangchu(props){
    const [dsLoaiSanPham, setDSLoaiSanPham]=useState([]);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/loai-san-pham');
                setDSLoaiSanPham(response.data.data);
            }catch(error){
                console.error("Lỗi khi lấy dữ liệu: ",error);
            }
        }
        fetchData();
    },[]);

    const listMember=dsLoaiSanPham.map((item)=>{
        return (
            <Products member={item}/>
        );
    });
   return(
    <>
    <Header/>
    <ListBanner/>
    <body id="body">
    <div className="products">
        {listMember}
    </div>
    </body>
    <Footer/>
    </>
   )
}

export default Trangchu;