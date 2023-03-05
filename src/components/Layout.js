import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const LayoutWrapper = (props) => {
  return (
    <div>
  <Navbar/>
  <div
        className="layout-children"
      >
        {props.children}
      </div>
      <div
        className="footer m-0"
      >
         {props.withFooter && <Footer />}
      </div>
  </div>
  
  )
}

export default LayoutWrapper
