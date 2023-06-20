import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const AllRefunds = () => {
  const {setActive} = useOutletContext();	        

    useEffect(() => {
        setActive(7);
    },[])

  return (
    <div>AllRefunds</div>
  )
}

export default AllRefunds