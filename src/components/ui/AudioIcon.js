import { ReactComponent as Sound } from "./sound.svg";
import { ReactComponent as NoSound } from "./no-sound.svg";
import React, { useState } from "react";

const AudioIcon = props => {
    const [audioOn, setAudioOn] = useState(true);
    return (
        <div
            className="icon audio"
            onClick={() => {
                setAudioOn(!audioOn);
                props.toggle();
            }}
        >
            {audioOn ? (
                <Sound className="icon" />
            ) : (
                <NoSound className="icon" />
            )}
        </div>
    );
};

export default AudioIcon;
