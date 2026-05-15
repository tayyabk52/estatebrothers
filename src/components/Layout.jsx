import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function Layout({ active, children }) {
  return (
    <>
      <Nav active={active} />
      {children}
      <Footer />
    </>
  );
}
