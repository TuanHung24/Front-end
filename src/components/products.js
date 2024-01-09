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
        <div className="products">
            {listSanPhams}
        </div>
        </>
    )
}

export default Products;