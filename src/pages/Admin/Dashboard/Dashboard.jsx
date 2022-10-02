import React from 'react'
import Lottie from 'react-lottie';
import watchmovie from "../../../assets/lotties/watchmovie.json.json"
export default function Dashboard() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: watchmovie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div >
            <Lottie
                options={defaultOptions}
                height={"60vh"}
                width={"60vh"}
            />
        </div>
    )
}
