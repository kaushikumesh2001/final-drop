import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";


// import BootstrapClient from "@/providers/BootstrapClient";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BootstrapClient from "./providers/BootstrapClient";
// import ReduxProvider from "./redux/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen d-flex flex-column">
        
        {/* Bootstrap JS – client only */}
        <BootstrapClient />
        

        <Navbar />

        <main className="flex-grow-1">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}
