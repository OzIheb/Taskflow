import React from 'react'
import NavBar from './_components/NavBar'
import Footer from './_components/Footer'


const Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
  return (
    <div>
        <NavBar />
        {children}
        <Footer />
    </div>
  )
}

export default Layout