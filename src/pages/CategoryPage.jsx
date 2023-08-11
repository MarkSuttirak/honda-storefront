import FooterMenu from "../components/FooterMenu"
import searchIcon from '../img/search-md-black.svg'
import { useCart } from '../hooks/useCart';
import { ShoppingBag01, ChevronRight } from "@untitled-ui/icons-react";
import { Link, useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useState } from "react";
import {
  SfButton,
  SfLink,
  SfIconShoppingCart,
  SfIconSell,
  SfIconPackage,
  SfIconRemove,
  SfIconAdd,
  SfIconWarehouse,
  SfIconSafetyCheck,
  SfIconShoppingCartCheckout,
  SfIconFavorite,
  SfIconArrowForward,
  SfScrollable
} from '@storefront-ui/react';
import ProductCard from '../components/ProductCard';
import TitleHeader from "../components/TitleHeader";

const CategoryPage = () => {
  const { cartCount, setIsOpen } = useCart()

  const { get, products } = useProducts();
  const min = 1;
  const max = 999;

  const [liked, setLiked] = useState(false)

  return (
    <>

      <TitleHeader link='/' title='รางวัล'/>
      <main className='relative top-[-10px] pb-[94px]'>
        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2"/>
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {(products ?? []).map((product) => (
              <ProductCard
                key={product.item_code}
                title={product.item_name}
                productId={product.name}
                itemCode={product.item_code}
                price={product.formatted_price}
                thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
            ))}
          </div>
        </div>

        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2"/>
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {(products ?? []).map((product) => (
              <ProductCard
                key={product.item_code}
                title={product.item_name}
                productId={product.name}
                itemCode={product.item_code}
                price={product.formatted_price}
                thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
            ))}
          </div>
        </div>

        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2"/>
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {(products ?? []).map((product) => (
              <ProductCard
                key={product.item_code}
                title={product.item_name}
                productId={product.name}
                itemCode={product.item_code}
                price={product.formatted_price}
                thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
            ))}
          </div>
        </div>
      </main>
      <FooterMenu active={1}/>
    </>
  )
}

export default CategoryPage