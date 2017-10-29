import React, { Component } from 'react';
import sports from '../styles/sport-material.png'
import music from '../styles/music.png'
import food from '../styles/food.png'
import community from '../styles/community.png'

class Legend extends Component {



    render(){
            return(
                // <div className='legendSpace'>
                //     <ul>
                //         <h4>Sports/Outdoors</h4>
                //             <img className='reSize' src={sports} alt='' />

                //         <h4>Music/Arts</h4>
                //             <img className='reSize' src={music} alt='' />

                //         <h4>Food/Bev</h4>
                //             <img className='reSize' src={food} alt='' />

                //         <h4>Community</h4>
                //             <img className='reSize' src={community} alt='' />

                //     </ul>
                // </div>
                <div className='my-legend'>
                <div className='legend-title'>Legend</div>
                <div className='legend-scale'>
                  <ul className='legend-labels'>
                    <li><span><img src={sports} alt=''/></span>Sports/Outdoors</li>
                    <li><span><img src={music} alt=''/></span>Music/Arts</li>
                    <li><span><img src={food} alt=''/></span>Food/Bev</li>
                    <li><span><img src={community} alt=''/></span>Community</li>
                  </ul>
                </div>
                </div>
            )
    }
}
        
export default Legend;