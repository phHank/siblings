import React from 'react'

import { 
  AiFillFacebook, 
  AiOutlineInstagram, 
} from 'react-icons/ai'
// import { SiTiktok } from 'react-icons/si'

const Footer = () => {
    return (
      <footer className='w-100 mt-5'>
        <div className='container'>
          <div className='d-flex justify-content-center align-items-center'>
              <ul className='list-inline'>
                <li className='list-inline-item text-center'>
                  <a href='https://www.instagram.com/siblingstms' target='_blank'>
                    <span className='fa-stack fa-lg'>
                      <AiOutlineInstagram size={30} color='#dd2afb' />
                      {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/100px-Instagram_icon.png' /> */}
                    </span>
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a href='https://www.facebook.com/siblingstms' target='_blank'>
                    <span className='fa-stack fa-lg'>
                      <AiFillFacebook size={30} />
                    </span>
                  </a>
                </li>
                {/* <li className='list-inline-item'>
                  <a href='https://www.tiktok.com/@siblingstms' target='_blank'>
                    <span className='fa-stack fa-lg'>
                      <SiTiktok size={25} color='#000' />
                    </span>
                  </a>
                </li> */}
              </ul>
          </div>
          <hr/>
          <p className='text-muted'>Copyright &copy; Siblings 2021</p>
        </div>
      </footer>
    )
}

export default Footer