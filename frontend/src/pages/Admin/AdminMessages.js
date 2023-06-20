import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const AdminMessages = () => {
  const {setActive} = useOutletContext();	        

    useEffect(() => {
        setActive(10);
    }, [])

  return (
    <div>AdminMessages</div>
  )
}

export default AdminMessages