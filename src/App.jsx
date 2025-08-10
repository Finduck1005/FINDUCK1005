import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import MyPage from './pages/MyPage.jsx'
import SearchResultPage from './pages/SearchResultPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import SellerPostPage from './pages/SellerPostPage.jsx'
import BuyerPostPage from './pages/BuyerPostPage.jsx'
import CreateSellerPage from './pages/CreateSellerPage.jsx'
import CreateBuyerPage from './pages/CreateBuyerPage.jsx'
import SignupPage from './pages/SignupPage.jsx';
import AuthCallbackPage from './pages/AuthCallbackPage.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/seller-post/:id" element={<SellerPostPage />} />
      <Route path="/buyer-post/:id" element={<BuyerPostPage />} />
      <Route path="/create-seller" element={<CreateSellerPage />} />
      <Route path="/create-buyer" element={<CreateBuyerPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* 로그인 필요한 라우트 묶기 */}
      <Route element={<ProtectedRoute />}>
        <Route path="/my" element={<MyPage />} />
      </Route>
    </Routes>
  )
}
