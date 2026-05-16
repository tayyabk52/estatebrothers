import { Route, Routes } from "react-router";
import { About } from "./pages/About";
import { BuySell } from "./pages/BuySell";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { ListingDetail } from "./pages/ListingDetail";
import { Updates } from "./pages/Updates";

export function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="buy-sell" element={<BuySell />} />
      <Route path="buy-sell/:listingType/:slug" element={<ListingDetail />} />
      <Route path="archive" element={<BuySell />} />
      <Route path="contact" element={<Contact />} />
      <Route path="updates" element={<Updates />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
