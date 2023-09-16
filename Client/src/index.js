import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import MoviePage from "./components/Movie/MoviePage";
import AdminHomePage from "./components/Admin/AdminHomePage";
import "./index.css";
import LikedMovies from "./components/Movie/LikedMovies";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import rootReducer from "./app/reducers/index.js";
import AlertNotification from "./shared/components/AlertNotification";
import HomePage from "./components/home/HomePage";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore(
  {
    reducer: persistedReducer,
  },
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/passwordReset",
    element: <ResetPassword />,
  },
  {
    path: "/movie/:movieName",
    element: <MoviePage />,
  },
  {
    path: "/favourites",
    element: <LikedMovies />,
  },
  {
    path: "/admin/home",
    element: <AdminHomePage />,
  },
]);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}></RouterProvider>
      <AlertNotification />
    </PersistGate>
  </Provider>
);
