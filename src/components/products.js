
import SanPham from './product';
function Products(props)
{

    const listSanPhams=props.member.san_pham.map(function(item)
    {
        return (
                <SanPham member={item}/>

        );
    });
    return(
        <>
        {/* <h3 className='ten-loai-san-pham'>{props.member.ten}</h3> */}
        <div id='products'>{listSanPhams}</div>
        </>
    )
}

export default Products;