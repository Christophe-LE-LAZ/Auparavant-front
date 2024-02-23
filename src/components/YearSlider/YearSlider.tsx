import { useState } from 'react';
import Slider from 'react-slider';
import './YearSlider.scss';

export default function YearSlider() {
  // Configuration du slider
  const MIN = 1700;
  const MAX = 2050;
  const [values, setValues] = useState([MIN, MAX]);

  return (
    <div className='flex flex-col'>
      <div className="text-center p-3"> {values[0]} - {values[1]}</div>
      <Slider
        className="slider"
        onChange={setValues}
        value={values}
        min={MIN}
        max={MAX}
      />
    </div>
  );
}
