import React from 'react'
import logoImg from '../../assets/logo.svg'
import facebookIcon from '../../assets/facebook_icon.svg'
import twitterIcon from '../../assets/twitter_icon.svg'
import instaIcon from '../../assets/instagram_icon.svg'

const Footer = () => {
  return (
    <footer className='flex pb-3 sm:py-3 md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t'>
      <div className='flex items-center gap-4'>
        <img className='hidden md:block w-20' src={logoImg} alt="logo" />
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p>Copyright 2025 &copy; Edemy. All Right Reserved</p>
      </div>

      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#"><img src={facebookIcon} alt="facebook" /></a>
        <a href="#"><img src={twitterIcon} alt="twitter" /></a>
        <a href="#"><img src={instaIcon} alt="insta" /></a>
      </div>
    </footer>
  )
}

export default Footer