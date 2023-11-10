import CartToggle from '@/components/CartToggle'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CartProvider from '@/context/Cart'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className="fixed right-2 top-2 hidden md:block">
        <CartToggle />
      </div>
      <Navbar />
      {children}
      <Footer />
    </CartProvider>
  )
}
