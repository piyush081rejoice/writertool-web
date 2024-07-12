import React from 'react'

const Loader = ({blackLoader}) => {
  return (
    <span className={`${blackLoader ? "blackLoader":"loader"}`}></span>
  )
}

export default Loader