import React from 'react'
import { MainHeader } from '../allFiles'
import '../styles/NotFound.css'

function NotFound() {
  return (
    <div className='NotFound'>
      <MainHeader/>
      <section>
        <h1>찾을 수 없음</h1>
        <h2>요청한 항목을 찾을 수 없습니다</h2>
      </section>
    </div>
  )
}

export default NotFound;