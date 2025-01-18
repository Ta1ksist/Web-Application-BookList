import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";


export default function RootLayout({ children = null, }: Readonly<{ children?: React.ReactNode; }>) {
  return (
    <>
      <html lang="en">
        <body>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
