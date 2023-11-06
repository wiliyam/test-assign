import Header from "@/components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
