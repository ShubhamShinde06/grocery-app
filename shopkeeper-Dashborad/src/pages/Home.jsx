import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Breadcrums from '../components/Breadcrums'

const Home = () => {
  return (
    <div className=' w-full h-full flex flex-col '>
      <div>
        <Header/>
      </div>
      <div className=' w-full h-[calc(100vh-80px)] flex justify-between'>
        <div>
          <Sidebar/>
        </div>
        <div className=' w-full h-full overflow-scroll scroll-display px-5 py-12 '>
          <Breadcrums name={'Dashboard'}/>
        </div>
      </div>
    </div>
  )
}

export default Home