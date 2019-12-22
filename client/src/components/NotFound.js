import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div className='has-text-centered'>
      <p>Ooop..., you hit the wrong page</p>
      <Link to='/' className='button is-primary'>
        Back to homepage
      </Link>
    </div>
  )
}

export default NotFound
