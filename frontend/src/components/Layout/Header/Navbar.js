import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../../static/data'

const Navbar = ({activeHeading}) => {
    return (
        <div className='flex items-start flex-col 800px:flex-row 800px:items-center'>
             { navItems && navItems.map((item,index) => (
                <div className="normalFlex" key={index}>
                    <Link to={item.url} className={`${activeHeading === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}>
                        {item.title}
                    </Link>
                </div>
                ))
             }
        </div>
      )
}

export default Navbar