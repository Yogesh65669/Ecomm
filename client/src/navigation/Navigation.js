import React from 'react'
import {BrowserRouter, Route, Routes}from "react-router-dom";
import ROUTES from './Route';
import OrderManagement from '../container/admin/order/OrderManagement';
function Navigation() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path={ROUTES.about.name} element={ROUTES.about.Component} />
        <Route path={ROUTES.contact.name} element={ROUTES.contact.Component} />
        <Route path={ROUTES.support.name} element={ROUTES.support.Component} />
        <Route path={ROUTES.login.name} element={ROUTES.login.Component} />
        <Route path={ROUTES.register.name} element={ROUTES.register.Component} />
        <Route path={ROUTES.home.name} element={ROUTES.home.Component} />
        <Route path={ROUTES.departmentAdmin.name} element={ROUTES.departmentAdmin.Component} />
        <Route path={ROUTES.universityAdmin.name} element={ROUTES.universityAdmin.Component} />
        <Route path={ROUTES.productAdmin.name} element={ROUTES.productAdmin.Component} />
        <Route path={ROUTES.departmentUser.name} element={ROUTES.departmentUser.Component} />
        <Route path={ROUTES.productUser.name} element={ROUTES.productUser.Component} />
        <Route path={ROUTES.productDetail.name} element={ROUTES.productDetail.Component} />
        <Route path={ROUTES.cart.name} element={ROUTES.cart.Component} />
        <Route path={ROUTES.summary.name} element={ROUTES.summary.Component} />
        <Route path={ROUTES.orderSuccess.name} element={ROUTES.orderSuccess.Component} />
        <Route path={ROUTES.userManagement.name} element={ROUTES.userManagement.Component} />
        <Route path={ROUTES.OrderManagement.name} element={ROUTES.OrderManagement.Component}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Navigation
