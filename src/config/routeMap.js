import React from "react";
import Loadable from "react-loadable";
import Loading from "components/Loading";
import Coupon from "pages/Coupon";
import ProductV2 from "pages/ProductV2";

const Styles = Loadable({
  loader: () => import("../pages/CategoryStyle/index"),
  loading: Loading,
});
const StyleByCategory = Loadable({
  loader: () => import("../pages/CategoryStyle/StyleByCategory"),
  loading: Loading,
});
const CreatedStyles = Loadable({
  loader: () => import("../pages/CreateStyles/index"),
  loading: Loading,
});
const DetaolsStyles = Loadable({
  loader: () => import("../pages/DetailsStyles/index"),
  loading: Loading,
});
const Category = Loadable({
  loader: () => import("../pages/Category/index"),
  loading: Loading,
});
const Products = Loadable({
  loader: () => import("../pages/Products/index"),
  loading: Loading,
});
const Settings = Loadable({
  loader: () => import("../pages/Settings/index"),
  loading: Loading,
});
const Events = Loadable({
  loader: () => import("../pages/Events/index"),
  loading: Loading,
});
const Sales = Loadable({
  loader: () => import("../pages/Sales/index"),
  loading: Loading,
});
const Users = Loadable({
  loader: () => import("../pages/Users/index"),
  loading: Loading,
});
const TextTemplate = Loadable({
  loader: () => import("../pages/TextTemplate/index"),
  loading: Loading,
});
const Order = Loadable({
  loader: () => import("../pages/Order/index"),
  loading: Loading,
});
const Payments = Loadable({
  loader: () => import("../pages/Payments/index"),
  loading: Loading,
});
const PageNotFound = Loadable({
  loader: () => import("../pages/PageNotFound/index"),
  loading: Loading,
});
//set up routers
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/category-styles",
    component: Styles,
  },
  {
    path: "/category-styles/:categoryId/styles",
    component: StyleByCategory,
  },
  {
    path: "/styles/created",
    component: CreatedStyles,
  },
  {
    path: "/styles/:id",
    component: DetaolsStyles,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/category/:id/products",
    component: ProductV2,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/events",
    component: Events,
  },
  {
    path: "/sales",
    component: Sales,
  },
  {
    path: "/users/orders",
    component: Order,
  },
  {
    path: "/users/:id/payments",
    component: Payments,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/text-template",
    component: TextTemplate,
  },
  {
    path: "/coupon",
    component: Coupon,
  },
  {
    path: "*",
    component: PageNotFound,
  },
];
