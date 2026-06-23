import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipely — Share, discover, and save recipes",
  description: "A home for recipes worth keeping.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${jakarta.variable} light h-full`}
    >
      <body className="bg-[#FFF9F2]   dark:bg-[#1A1714] ">
        <Navbar />
        <main>{children}</main>
         <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}