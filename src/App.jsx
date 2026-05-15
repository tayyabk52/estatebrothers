import { Route, Routes } from "react-router";
import { Archive } from "./pages/Archive";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";

export function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="archive" element={<Archive />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
