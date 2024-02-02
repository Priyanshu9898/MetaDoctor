import ThemeSwitcher from '@/components/Themes/ThemeSwitcher'
import React from 'react'

const AuthNavbar = () => {
  return (
    <div className='flex items-end justify-end px-6 py-4 w-screen'>
        <ThemeSwitcher />
    </div>
  )
}

export default AuthNavbar