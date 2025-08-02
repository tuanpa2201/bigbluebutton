import React from 'react';

function UserAvatar(props) {
  const {
    user,
  } = props;

  return (
    <div className="border-2 items-center rounded-full-restyle">
        {user.isDialIn
            ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-1" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
            )
            : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.33301 15.666C3.33301 13.4569 5.12387 11.666 7.33301 11.666H12.6663C14.8755 11.666 16.6663 13.4569 16.6663 15.666V15.666C16.6663 17.1388 15.4724 18.3327 13.9997 18.3327H5.99967C4.52691 18.3327 3.33301 17.1388 3.33301 15.666V15.666Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M13.333 4.99935C13.333 6.8403 11.8406 8.33268 9.99967 8.33268C8.15873 8.33268 6.66634 6.8403 6.66634 4.99935C6.66634 3.1584 8.15873 1.66602 9.99967 1.66602C11.8406 1.66602 13.333 3.1584 13.333 4.99935Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            )}
    </div>
  );
}

export default UserAvatar;
