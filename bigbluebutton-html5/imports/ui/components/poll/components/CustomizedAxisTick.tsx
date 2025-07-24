import React from 'react';

function getAverageCharacterWidth(text: string, font: string) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  ctx.font = font;

  const textWidth = ctx.measureText(text).width;
  const averageAdvance = textWidth / text.length;

  return averageAdvance;
}

const TICK_SIZE = 6;
const AVERAGE_CHAR_WIDTH = getAverageCharacterWidth('0', 'Source Sans Pro') ?? 6;
const ELLIPSIS = '...';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedAxisTick = (props: any) => {
  const { payload, ...restProps } = props;
  const {width, x, y, visibleTicksCount} = restProps;
  const { offset } = payload;
  const numberOfChars = Math.floor((width - TICK_SIZE) / AVERAGE_CHAR_WIDTH);
  const restValue = payload.value.substring(numberOfChars, payload.value.length);
  const pathX = Math.floor( x - offset + width / visibleTicksCount) - 0.5;

  return (
    <g>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <path d={`M${pathX},${y - 13}v${-2}`} stroke="#C8C8C8" stroke-linecap="round"/>
      <text {...restProps}>
        {payload.value.substring(0, restValue.length > 0 ? numberOfChars - ELLIPSIS.length : numberOfChars)}
        {restValue.length > 0 && ELLIPSIS}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
