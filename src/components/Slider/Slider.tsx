import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchRandomMemory } from '../../store/randomReducer';

const Slider = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRandomMemory());
  }, []);

  const randomPicture = useAppSelector((state) => state.randomMemoryReducer.picture);

  return (
    <div className='max-w-screen-xl mx-auto p-5'>
      <div className="diff aspect-[16/9]">
        <div className="diff-item-1">
          <img className='m-auto' alt="test" src={randomPicture.picture1} />
        </div>
        <div className="diff-item-2">
          <img className='m-auto' alt="test" src={randomPicture.picture2} />
        </div>
        <div className="diff-resizer"></div>
      </div>
    </div>
  );
};

export default Slider;
