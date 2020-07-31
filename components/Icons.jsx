import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

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
    )
}