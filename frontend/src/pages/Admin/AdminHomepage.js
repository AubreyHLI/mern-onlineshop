import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const AdminHomepage = () => {
  const {setActive} = useOutletContext();

  useEffect(() => {
    setActive(0);
  }, [])

  return (
    <div>
       
    </div>

  )
}

export default AdminHomepage