import React from 'react'
import Header from './Header'


import '../App.css'

const Main = (props) => {
  return (
    
      <div className="main-content justify-content-between">
        <header> {/* to display Header */}
          <Header />
        </header>
        <main> {/* to display Main Content */}
          {props.child} {/* to display the main content */}
        </main>
      
      </div>
   
  )
}

export default Main