import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const AdminSettings = () => {
  const {setActive} = useOutletContext();	        

    useEffect(() => {
        setActive(11);
    }, [])

  return (
    <div>AdminSettings</div>
  )
}

export default AdminSettings