import React from 'react'
import bread from '../img/bread_wine.jpg'

export const BodyMain = () => {
  return (
    <div className='messageContainer'>
      <div className='messageVerse'>
      <h3>Matthew 25: Verse 35:</h3>
      <p>For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me</p>
      </div>
      <div className='messageImg'>
        <img src={bread} alt="image of bread and wine today" className='mainImg'/>
      </div>
    </div>
  )
}
