//import { Inter } from "next/font/google"
import { Prompt } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/navbar/Navbar"
import { Toaster } from "react-hot-toast"
import Provider from "./context/AuthContext"

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"]
});

export const metadata = {
  title: "QuickNotes",
  description: "Keep your notes here with QNotes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={prompt.className}>
      <body>
        <Provider>
          <Navbar />
          <Toaster
            position="top-center"
            containerStyle={{
              top: 80,
              bottom: 90
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
