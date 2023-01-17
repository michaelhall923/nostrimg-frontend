import { SliderUnstyled } from "@mui/base";
import React from "react";

const Slider = React.forwardRef(function Slider(props, ref) {
  return (
    <SliderUnstyled
      {...props}
      ref={ref}
      slotProps={{
        thumb: {
          className:
            "ring-violet-300 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute",
        },
        root: { className: "w-40 relative inline-block h-2 cursor-pointer" },
        rail: {
          className:
            "bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute",
        },
        track: {
          className: "bg-violet-300 h-2 absolute rounded-full",
        },
      }}
    />
  );
});

export default Slider;
