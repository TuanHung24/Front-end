import { NavLink } from "react-router-dom";

function Product(props)
{
    return(
        <>
        <NavLink to={`/san-pham/${props.member.id}`} className="xem">
        <div className="product">
        <img src={`http://127.0.0.1:8000/${props.member.img[0].ten}`} className="img"/>
        
        <h6 className="name">{props.member.ten}</h6>
        {/* <div class="discount">
                    <p class="price-old black">34.990.000₫</p>
                        <span class="percent">-2%</span>
        </div> */}
        <strong className="price">{props.member.gia_ban}₫</strong>
        </div>
       </NavLink>
        
        
        </>
    )
}

export default Product;