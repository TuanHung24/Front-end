import { NavLink } from "react-router-dom";
import numeral from 'numeral';
function Product(props)
{
    if (!numeral.locales['vi-custom']) {
        numeral.register('locale', 'vi-custom', {
          delimiters: {
            thousands: '.',
            decimal: ',',
          },
          currency: {
            symbol: '',
          },
        });
      }
      numeral.locale('vi-custom');
      
      //const count=console.log(props.member.chi_tiet_san_pham[0].gia_ban);
      
        const so = parseFloat(props.member.chi_tiet_san_pham[0]?.gia_ban);
        const soDaDinhDang = numeral(so).format('0,0');
       
    
    return (
        <>
         {soDaDinhDang !== '0' && ( 
            <div className="product-container">
                <NavLink to={`/san-pham/${props.member.id}`} className="xem">                 
                    <div className="product">
                        <img src={`http://127.0.0.1:8000/${props.member.img[0]?.img_url}`} id="img-sp" /><br/>
                        <br/>
                        <span className="mo_ta">%{props.member.mo_ta}</span>
                        <h6 className="name">{props.member.ten}</h6>
                        <span className="dung_luong">{props.member.chi_tiet_san_pham[0]?.dung_luong.ten}<input type="hidden" className="size" value={props.member.chi_tiet_san_pham[0]?.dung_luong_id} /></span>
                        <strong className="price">{soDaDinhDang}₫</strong>
                    </div>
                </NavLink>
            </div>
        )}
        </>
    );
    
}

export default Product;