import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

export const CheckIcon = () => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M20 6L9 17l-5-5" />
        </Svg>
    );
}

export const CheckSquareIcon = () => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M9 11l3 3L22 4" />
            <Path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </Svg>
    );
}

export const CircleCheckIcon = () => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <Path d="M22 4L12 14.01l-3-3" />
        </Svg>
    );
}

export const CircleXIcon = () => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Circle cx={12} cy={12} r={10} />
            <Path d="M15 9l-6 6M9 9l6 6" />
        </Svg>
    );
}