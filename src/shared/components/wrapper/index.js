import React from 'react'
import Header from '../header'
import Footer from '../footer'

const Wrapper = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Wrapper
