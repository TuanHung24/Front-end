import Header from "../components/header";
import Footer from "../components/footer";
import '../App.css';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';

import { useEffect, useState } from "react";
import axios from "axios";
import ListBanner from "./list_banner";
import { ToastContainer } from 'react-toastify';
import Product from "../components/product";
import PaginationProduct from "../components/pagination_product";

function Trangchu() {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    const [dsLoaiSanPham, setDSLoaiSanPham] = useState([]);
    const [dsSanPham, setDSSanPham] = useState([]);
    const [priceRange, setPriceRange] = useState("");
    const [selectedProductTypeId, setSelectedProductTypeId] = useState("");

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

    const handlePriceChange = (event) => {
        setPriceRange(event.target.value);
    };

    const handleProductTypeChange = (event) => {
        setSelectedProductTypeId(event.target.value);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = dsSanPham.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <Header />
            <ListBanner />
            <div>
                <ToastContainer />
            </div>

            <body id="body">

                <div className="price-filter">
                    <span>Chọn mốc giá:</span>{' '}
                    <select value={priceRange} onChange={handlePriceChange} className="select-price">
                        <option value="">Tất cả</option>
                        <option value="0-2999999">Dưới 3 triệu</option>
                        <option value="3000000-5000000">Từ 3 triệu - 5 triệu</option>
                        <option value="5000000-7000000">Từ 5 triệu - 7 triệu</option>
                        <option value="7000000-10000000">Từ 7 triệu - 10 triệu</option>
                        <option value="10000001-60000000">Trên 10 triệu</option>
                    </select>
                    {' '}
                    <span>Chọn loại sản phẩm:</span>{' '}
                    <select value={selectedProductTypeId} onChange={handleProductTypeChange} className="select-price">
                        <option value="">Tất cả</option>
                        {dsLoaiSanPham.map((loaiSP) => (
                            <option key={loaiSP.id} value={loaiSP.id}>{loaiSP.ten}</option>
                        ))}
                    </select>
                </div>

                <div id="list-product">
                    {currentProducts
                        .filter((item) => {
                            
                            if (priceRange) {
                                const [minPrice, maxPrice] = priceRange.split("-").map(Number);
                                if (!(item.chi_tiet_san_pham[0].gia_ban >= minPrice && item.chi_tiet_san_pham[0].gia_ban <= maxPrice)) {
                                    return false;
                                }
                            }

                            if (selectedProductTypeId && item.loai_san_pham.id?.toString() !== selectedProductTypeId) {
                                return false;
                            }

                            return true;
                        })
                        .map((item) => (
                            <Product key={item.id} member={item} />
                        ))
                        
                    }
                </div>
               <PaginationProduct
                    currentPage={currentPage}
                    productsPerPage={productsPerPage}
                    totalProducts={dsSanPham.length}
                    paginate={setCurrentPage}
                />
            </body>
            <Footer />
        </>
    );
}

export default Trangchu;
