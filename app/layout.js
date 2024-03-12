import { Inter } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/navbar/Navbar"
import { Toaster } from "react-hot-toast"
import Provider from "./context/AuthContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <Toaster
            containerStyle={{
              top: 80
            }}
            toastOptions={{
              style: {
                background: "#242526",
                padding: "5px 10px",
                color: "#E4E6EB",
                borderRadius: "100vh",
                fontSize: "12px"
              }
            }}
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}
