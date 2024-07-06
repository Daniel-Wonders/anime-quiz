import React from "react";

export default function Intro({onStart}){

    
    return ( <div id="introScreen">
        <button id="StartBtn" onClick={onStart}>Start!</button>
    </div>

    )
}