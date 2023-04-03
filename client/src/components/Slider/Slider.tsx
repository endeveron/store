import { memo, useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'assets/ui';

import './Slider.scss';

interface ISlider {
  title: string;
  images: {
    src: string;
    alt?: string;
  }[];
}

const Slider = memo(({ title, images }: ISlider) => {
  const [imageIdArr, setImageIdArr] = useState<string[]>([]);

  const showNav = imageIdArr?.length > 1;

  const unshiftArray = (arr: string[]) => {
    const lastElId = arr[arr.length - 1];
    const updArr = arr.slice(0, -1);
    updArr.unshift(lastElId);
    return updArr;
  };

  // Init image id array
  useEffect(() => {
    const initialImageIdArr = images.map((image) => image.src);
    setImageIdArr(initialImageIdArr);
  }, [images]);

  // Unshift array [n, a, b, c, d, ..., n - 1]
  const handleClickPrev = () => {
    const unshiftedImageIdArr = unshiftArray(imageIdArr);
    setImageIdArr(unshiftedImageIdArr);
  };

  // Shift array [b, c, d, e, ... a]
  const handleClickNext = () => {
    const shiftedImageIdArr = [...imageIdArr.slice(1), imageIdArr[0]];
    setImageIdArr(shiftedImageIdArr);
  };

  const curImage = images.find((image) => image.src === imageIdArr[0]);

  if (!curImage) return null;

  return (
    <div className="slider">
      <img
        className="slider__image"
        onClick={handleClickNext}
        src={curImage.src}
        alt={curImage?.alt || title}
      />

      {showNav && (
        <div className="slider__nav">
          <div className="slider__nav-item">
            <ChevronLeftIcon className="icon" onClick={handleClickPrev} />
          </div>
          <div className="slider__nav-item">
            <ChevronRightIcon className="icon" onClick={handleClickNext} />
          </div>
        </div>
      )}
    </div>
  );
});

export { Slider };
