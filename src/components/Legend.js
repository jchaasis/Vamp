import React, { Component } from 'react';
import sports from '../styles/sport-material.png'
import music from '../styles/music.png'
import food from '../styles/food.png'
import community from '../styles/community.png'

class Legend extends Component {



    render(){
            return(
                <div className='legendSpace'>
                    <ul>
                        <h4>Sports/Outdoors</h4>
                            <img className='reSize' src={sports} alt='' />

                        <h4>Music/Arts</h4>
                            <img className='reSize' src={music} alt='' />

                        <h4>Food/Bev</h4>
                            <img className='reSize' src={food} alt='' />

                        <h4>Community</h4>
                            <img className='reSize' src={community} alt='' />

                    </ul>
                </div>
            )
    }
}
        
export default Legend;