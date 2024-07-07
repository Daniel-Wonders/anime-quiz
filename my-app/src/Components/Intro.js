import React from "react";

export default function Intro({onStart}){

    
    return ( <div id="introScreen">
        <p>Ready to test your anime knowledge?</p>
        <button id="StartBtn" onClick={onStart}>Start!</button>
    </div>

    )
}