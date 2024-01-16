import Header from "../components/header";
import Footer from "../components/footer";
import '../App.css';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';

import { useEffect, useState } from "react";

import axios from "axios";
import ListBanner from "./list_banner";
import { NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Product from "../components/product";


function Trangchu(){
    const [dsLoaiSanPham, setDSLoaiSanPham] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [dsSanPham, setDSSanPham] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseLoaiSP = await axios.get('http://127.0.0.1:8000/api/loai-san-pham');
                setDSLoaiSanPham(responseLoaiSP.data.data);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseSanPham = await axios.get('http://127.0.0.1:8000/api/san-pham');
                setDSSanPham(responseSanPham.data.data);
                
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        }
        fetchData();
    }, []);


    const handleLoaiSanPhamClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <>
            <Header/>
            <ListBanner/>
            <div>
            <ToastContainer />
            </div>
            <body id="body">
                <div className="products-type">
                    {
                        dsLoaiSanPham.map((item) => (
                        <>
                            <NavLink className="ten-loai" key={item.id} to={`/loai-san-pham/${item.id}`} onClick={() => handleLoaiSanPhamClick(item.id)}>
                                {item.ten}
                            </NavLink>
                            
                        </>
                        ))
                    }
                </div>
                <div id="list-product">
                {dsSanPham.map((item) => (
                    <Product key={item.id} member={item}/>
                ))}
                </div>
            </body>
            <Footer/>
        </>
    );
}

export default Trangchu;