import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ShippingScreen from "../screens/ShippingScreen";
import AdminRoute from "../components/Guards/AdminRoute";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import UserListScreen from "../screens/admin/UserListScreen";
import UserEditScreen from "../screens/admin/UserEditScreen";
import PrivateRoute from "../components/Guards/PrivateRoute";
import OrderListScreen from "../screens/admin/OrderListScreen";
import ProductListScreen from "../screens/admin/ProductListScreen";
import ProductEditScreen from "../screens/admin/ProductEditScreen";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/search/:keyword' element={<HomeScreen />} />
      <Route  path='/page/:pageNumber' element={<HomeScreen />} />
      <Route  path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

// add private route to shipping screen
export default routes;
