import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = React.lazy(() => import("./pages/Landing"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Payments = React.lazy(() => import("./pages/Payments"));
const NotFound = React.lazy(() => import("./pages/NotFoundPage"));
const SendMoney = React.lazy(() => import("./pages/SendMoney"));

import Authenticate from "./utils/authenticate";
import ApiContextProvider from "./context/api";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/user";
import Falllback from "./components/Fallback";

function App() {
  return (
    <ApiContextProvider>
      <UserContextProvider>
        <Toaster />
        <Suspense fallback={<Falllback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Auth" element={<Auth />} />
            <Route
              path="/Dashboard"
              element={
                <Authenticate>
                  <Dashboard />
                </Authenticate>
              }
            />
            <Route
              path="/Payments"
              element={
                <Authenticate>
                  <Payments />
                </Authenticate>
              }
            />
            <Route
              path="/send-money/*"
              element={
                <Authenticate>
                  <SendMoney />
                </Authenticate>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </UserContextProvider>
    </ApiContextProvider>
  );
}

export default App;
