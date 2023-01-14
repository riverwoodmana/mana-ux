import React from 'react'
import { VolunteerButton } from './VolunteerButton'
import { RequestButton } from './RequestButton'
import { AdminButton } from './AdminButton'
import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <div className='navBar'>
      <AdminButton />
      <VolunteerButton />
      <RequestButton />
    </div>
  )
}
