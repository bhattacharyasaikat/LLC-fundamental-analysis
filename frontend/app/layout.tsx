import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ["latin"] })
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "MarketAI - Transform Your Analysis Process",
  description: "AI-powered market analysis and research platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>

    {/* <SessionProvider> */}
    <Navbar/>
    {children}
    {/* </SessionProvider> */}


   
       


        

        
        </body>
    </html>
  )
}

