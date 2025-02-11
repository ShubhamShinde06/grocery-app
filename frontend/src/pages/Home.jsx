import React from 'react'
import Header from '../components/Header'
import Category from '../components/Category'
import Cards from '../components/Cards'

const Home = () => {
  return (
    <div className='w-full h-full flex flex-col gap-5 py-10'>
      <div>
        <Header/>
      </div>
      <div className='w-full px-5 mt-32 lg:mt-20 flex flex-col gap-10'>
        {/* poster */}
        <div className='w-full h-70  rounded-xl'>
          <img src="https://binkeyit-full-stack-ydrn.vercel.app/assets/banner-CVOmu1PY.jpg" alt="" className='w-full h-full' />
        </div>
        {/* category */}
        <div>
          <Category/>
        </div>
        {/* cards */}
        <div className='lg:px-6'>
          <Cards/>
        </div>
      </div>
    </div>
  )
}

export default Home