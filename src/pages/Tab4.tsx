

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainDrawer from '../components/Drawer';
import '../components/Detail.css';

import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import React ,{useState} from 'react';
const Tab4: React.FC = () => {
  const handleClick = () => {
    // Define the action you want to perform when the button is clicked
    alert('Button clicked!');
  };
  const [imageClass, setImageClass] = useState('save'); 

  const handleImageChange = () => {
    // Toggle between different CSS classnamees
    setImageClass(imageClass === 'save' ? 'saved' : 'save');
  };

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const handleIncrease = () => {
    setSliderValue((prevValue) => prevValue + 1);
  };

  const handleDecrease = () => {
    setSliderValue((prevValue) => prevValue - 1);
  };
  
  return (
    <IonPage>
   
      <button onClick={handleImageChange} className={imageClass}></button>
      <div className="title">Cafe Landwer</div>
      <div className="placepic"></div>
      <div className="scrolling-wrapper">
        <div className="catordog"></div>
        <div className="medit">mediterranean</div>
        <div className="vegan">Vegan Option</div> 
      </div>
      <div className="opentime">Open</div>
      <div className="opentimerest">Until</div>
      <div className="scrolling-wrapper-flexbox">
        <div className="treat"></div>
        <div className="catfood"></div>
        <div className="leash"></div>
        <div className="disability"></div>
        <div className="test"></div>
      </div>
      <button onClick={handleClick} className="menu">
        <div className="menufont">Menu</div>
      </button>
      <button onClick={handleClick} className="menu">
        <div className="menufont">Menu</div>
      </button>
      <button onClick={handleClick} className="time">
        <div className="timefont">Time</div>
      </button>
      <div className="comment">Comment</div>
      <button onClick={handleDecrease}>-</button>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
        />
    </IonPage>
    
  );
};

export default Tab4;


