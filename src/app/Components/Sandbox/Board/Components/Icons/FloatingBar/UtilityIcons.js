// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const CopyIcon = props => {
  return (
    <SvgIcon width="11" height="12" viewBox="0 0 10 13" {...props} fill="none">
      <g clipPath="url(#clip0)">
        <path
          d="M7.9663 2.18176H1.88588C1.45253 2.18176 1.10001 2.56636 1.10001 3.03908V3.58416H1.8174V3.03908C1.8174 2.99789 1.84813 2.96437 1.88588 2.96437H7.9663C8.00406 2.96437 8.03479 2.99789 8.03479 3.03908V9.67227C8.03479 9.71348 8.00406 9.74701 7.9663 9.74701H7.78509V10.5296H7.9663C8.39963 10.5296 8.75218 10.145 8.75218 9.67227V3.03908C8.75216 2.56636 8.39963 2.18176 7.9663 2.18176Z"
          fill="#102542"
        />
        <path
          d="M6.89507 3.6521H0.81468C0.381328 3.6521 0.0287781 4.0367 0.0287781 4.50945V11.1426C0.028802 11.6154 0.381328 12 0.81468 12H6.8951C7.32845 12 7.681 11.6154 7.681 11.1427V4.50945C7.68102 4.0367 7.32843 3.6521 6.89507 3.6521ZM6.89512 11.2174H0.81468C0.776898 11.2174 0.746169 11.1838 0.746169 11.1427V4.50945C0.746169 4.46823 0.776898 4.43471 0.81468 4.43471H6.8951C6.93288 4.43471 6.96361 4.46823 6.96361 4.50945V11.1427C6.96361 11.1838 6.93288 11.2174 6.89512 11.2174Z"
          fill="#102542"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="11" height="12" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

const CutIcon = props => {
  return (
    <SvgIcon width="13" height="12" viewBox="0 0 13 12" {...props} fill="none">
      <path
        d="M8.73438 9C8.64459 9 8.55725 9.00863 8.47214 9.02325L7.22719 6.4635L8.9375 0.9375L8.73438 0.375L6.5 4.96875L4.26562 0.375L4.0625 0.9375L5.77302 6.4635L4.52806 9.02325C4.44275 9.00863 4.35541 9 4.26562 9C3.48034 9 2.84375 9.58762 2.84375 10.3125C2.84375 11.0374 3.48034 11.625 4.26562 11.625C5.05091 11.625 5.6875 11.0374 5.6875 10.3125C5.6875 9.86756 5.447 9.47494 5.08016 9.23756L5.70863 8.16037C5.87945 7.86769 6.16647 7.656 6.5 7.55944C6.83373 7.656 7.12075 7.8675 7.29138 8.16037L7.91984 9.23756C7.553 9.47494 7.3125 9.86756 7.3125 10.3125C7.3125 11.0374 7.94909 11.625 8.73438 11.625C9.51966 11.625 10.1562 11.0374 10.1562 10.3125C10.1562 9.58762 9.51966 9 8.73438 9ZM4.26562 11.0625C3.81692 11.0625 3.45312 10.7267 3.45312 10.3125C3.45312 9.89831 3.81692 9.5625 4.26562 9.5625C4.71433 9.5625 5.07812 9.89831 5.07812 10.3125C5.07812 10.7267 4.71433 11.0625 4.26562 11.0625ZM6.70312 6.5625V6.9375H6.29688V6.5625H6.70312ZM8.73438 11.0625C8.28567 11.0625 7.92188 10.7267 7.92188 10.3125C7.92188 9.89831 8.28567 9.5625 8.73438 9.5625C9.18308 9.5625 9.54688 9.89831 9.54688 10.3125C9.54688 10.7267 9.18308 11.0625 8.73438 11.0625Z"
        fill="#102542"
      />
    </SvgIcon>
  );
};

const PasteIcon = props => {
  return (
    <SvgIcon width="11" height="12" viewBox="0 0 11 9" {...props} fill="none">
      <rect
        x="0.375"
        y="0.375"
        width="8.25"
        height="9.25"
        rx="0.625"
        fill="whit"
        stroke="#102542"
        strokeWidth="0.75"
      />
      <mask id="path-2-inside-1" fill="white">
        <rect x="2.25" width="4.5" height="1.66667" rx="0.25" />
      </mask>
      <rect
        x="2.25"
        width="4.5"
        height="1.66667"
        rx="0.25"
        fill="white"
        stroke="#102542"
        strokeWidth="1.5"
        mask="url(#path-2-inside-1)"
      />
    </SvgIcon>
  );
};

const BringToFrontIcon = props => {
  return (
    <SvgIcon width="10" height="10" viewBox="0 0 10 10" {...props} fill="none">
      <rect width="7" height="7" rx="0.5" fill="#102542" />
      <rect
        x="2.25"
        y="2.25"
        width="7.5"
        height="7.5"
        rx="0.25"
        fill="white"
        stroke="#102542"
        strokeWidth="0.5"
      />
    </SvgIcon>
  );
};

const BringToBackIcon = props => {
  return (
    <SvgIcon width="10" height="10" viewBox="0 0 10 10" {...props} fill="none">
      <rect
        x="3.25"
        y="3.25"
        width="6.5"
        height="6.5"
        rx="0.25"
        fill="white"
        stroke="#102542"
        strokeWidth="0.5"
      />
      <rect
        x="0.25"
        y="0.25"
        width="7.5"
        height="7.5"
        rx="0.25"
        fill="black"
        stroke="#102542"
        strokeWidth="0.5"
      />
    </SvgIcon>
  );
};

export { CopyIcon, CutIcon, PasteIcon, BringToBackIcon, BringToFrontIcon };