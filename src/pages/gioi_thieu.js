import Header from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/banner";
function GioiThieu()
{
    return(
        <>
        <Header/>
        <Banner/>
        <p id="gioi_thieu">Một trang web chuyên về việc bán và cung cấp các sản phẩm điện thoại di động
            hàng đầu từ các nhà sản xuất uy tín trên thị trường. Chúng tôi cung cấp một loạt
            các sản phẩm điện thoại di động mới và cũ với nhiều mẫu mã, tính năng và phân khúc giá khác nhau
            để phù hợp với nhu cầu và ngân sách của mọi người.</p>
        <Footer/>
        </>
    )
}
export default GioiThieu;