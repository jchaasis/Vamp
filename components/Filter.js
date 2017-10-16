import React, { Component } from 'react';

class Filter extends Component {


  render(){
    return(

      <form>
      <div>
        <input type='radio' name='sports/outdoors' value='Sports/Outdoors' id='sports/outdoors'/>
        <label htmlFor='sports/outdoors'> Sports/outdoors </label>
        <br/>

        <input type='radio' name='Music/Art' value='Music/Art'
        id='Music/Art'/>
        <label htmlFor='Music/Art'> Music/Art </label>
        <br/>
        <input type='radio' name='Food/Bev' value='Food/Bev' id='Food/Bev'/>
        <label htmlFor='Food/Bev'> Food/Bev </label>
        <br/>
        <input type='radio' value='Community'/>
        <label htmlFor='Community'>Community</label>
      </div>
      </form>

    )
  }
}

export default Filter;
