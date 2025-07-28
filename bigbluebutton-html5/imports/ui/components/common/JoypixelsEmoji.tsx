import React, { useRef, useEffect } from 'react';
import joypixels from 'emoji-toolkit';

interface JoypixelsEmojiProps {
  native: string;
  size?: number;
  padding?: string;
}

const JoypixelsEmoji: React.FC<JoypixelsEmojiProps> = ({ native, size = 16, padding = '0px' }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      // Find the img inside the span and set its width/height
      const img = spanRef.current.querySelector('img');
      if (img) {
        img.width = size;
        img.height = size;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
      }
    }
  }, [native, size]);
  const html = joypixels.toImage(native);
  return (
    <span
      ref={spanRef}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size,
        padding,
        lineHeight: 1,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default JoypixelsEmoji;
