import { FrappeProvider } from "frappe-react-sdk";
import { Routes, Route, useNavigate ,useLocation} from "react-router-dom";
import Login from "./pages/Login";
import Cookies from 'js-cookie';
import Home from "./pages/Home";
import Product from "./pages/Product";
import './App.css'
import { useEffect, useState } from "react";
import { ProductsProvider } from "./hooks/useProducts";
import { CartProvider } from "./hooks/useCart";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import { UserProvider } from "./hooks/useUser";
import { getToken,setToken } from "./utils/helper";
import BankInfoPage from "./pages/BankInfoPage";
import MyAccount from "./pages/MyAccount";
import ShippingAddress from "./pages/address/ShippingAddress";
import AddShippingAddress from "./pages/address/ShippingAddressAdd";
import EditShippingAddress from "./pages/address/ShippingAddressEdit";
import Welcome from "./pages/register/Welcome";
import Signup from "./pages/register/Signup";
import FillInfo from "./pages/register/FillInfo";
import Success from "./pages/register/Success";
import MyCoupon from "./pages/MyCoupon";
import MyOrder from "./pages/MyOrder";
import MyOrderDetails from "./pages/MyOrderDetails";
import MyID from "./pages/MyID";
import ProductCompare from "./pages/ProductCompare";
import EditProfile from "./pages/EditProfile";
import CategoryPage from "./pages/CategoryPage";
import ShopPage from "./pages/ShopPage";
import ShopPageFilter from "./pages/ShopPage-filter";
import ShopPageType from "./pages/ShopPage-type";
import Wishlist from "./pages/Wishlist";
import RewardPage from "./pages/RewardPage";
import Gifts from "./pages/Gifts";
import Phonverify from "./pages/Phoneverifcation";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogCategories from "./pages/admin/BlogCategories";
import BlogAdd from "./pages/admin/BlogAdd";
import RewardDetails from "./pages/RewardDetails";
import RewardCouponPage from "./pages/RewardCouponPage";
import RewardHomePage from "./pages/RewardHomePage";
import RewardHistory from "./pages/RewardHistory";
import { useFrappeGetCall } from 'frappe-react-sdk';


function App() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const phoneverify = new URLSearchParams(search).get("phoneverify");
  const username = new URLSearchParams(search).get("username");
  const [Userverify, SetUserverify] = useState(phoneverify);

  useEffect(() => {
    if(token){
      setToken(token)
      if(phoneverify == 'true'){
        Cookies.set('username', username);
        Cookies.set('phoneverify', true);
        navigate("/phonverify");
      }
      else{
        navigate("/");
      }
      
    }
    else{
      if(getToken() && Cookies.get('phoneverify')){
        navigate("/phonverify");
      }
    }
 
    if (!getToken()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <FrappeProvider url={"https://dev.zaviago.com"}
      enableSocket={false}
      tokenParams={{
        type: "token",
        useToken: true,
        token: getToken,
      }}
    >
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="products/:id" element={<Product />} />
              <Route path="product-compare/:id" element={<ProductCompare />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thankyou" element={<BankInfoPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-account" element={<MyAccount />}/>
              <Route path="/my-id" element={<MyID />}/>
              <Route path="/my-order" element={<MyOrder />}/>
              <Route path="/my-order-details/:id" element={<MyOrderDetails />}/>
              <Route path="/my-coupon" element={<MyCoupon />}/>
              <Route path="/welcome" element={<Welcome />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/fill-info" element={<FillInfo />}/>
              <Route path="/success" element={<Success />}/>
              <Route path="/shipping-address" element={<ShippingAddress />}/>
              <Route path="/shipping-address/add" element={<AddShippingAddress />}/>
              <Route path="/shipping-address/edit" element={<EditShippingAddress />}/>
              <Route path="/edit-profile" element={<EditProfile />}/>
              <Route path="/categories" element={<CategoryPage />}/>
              <Route path="/shop" element={<ShopPage />}/>
              <Route path="/shop/filter" element={<ShopPageFilter />}/>
              <Route path="/shop/type" element={<ShopPageType />}/>
              <Route path="/wishlist" element={<Wishlist />}/>
              <Route path="/reward" element={<RewardPage />}/>
              <Route path="/reward-details" element={<RewardDetails />}/>
              <Route path="/reward-coupon" element={<RewardCouponPage />}/>
              <Route path="/reward-home" element={<RewardHomePage />}/>
              <Route path="/gifts" element={<Gifts />}/>
              <Route path="/reward-history" element={<RewardHistory />}/>
              <Route path="/phonverify" element={<Phonverify />}/>

              <Route path="/blog-admin" element={<BlogAdmin />}/>
              <Route path="/blog-categories" element={<BlogCategories />} />
              <Route path="/blog-add" element={<BlogAdd />} />
            </Routes>
            <Cart />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </FrappeProvider>
  )
}

export default App
