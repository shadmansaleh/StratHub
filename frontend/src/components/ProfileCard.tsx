import React from 'react'
import demo_profile from "../assets/profile_demo.png";
import { useState } from 'react';


function ProfileCard() {
    const [rating, setRating] = React.useState(4.5);
    return (
        <div className=" bg-gradient-to-tl from-blue-400 to-neutral w-1/4 min-h-80 m-5 p-2 rounded-box">
            <div className="flex justify-center items-start">
                <div className="w-20 aspect-square rounded-full ml-2 my-2">
                    <img src={demo_profile} alt="profile pic" />
                </div>
                <div className=" ml-3 my-2">
                    <h2 className="text-lg font-bold">John Doe</h2>
                    <p className="text-sm text-black">Expert in: <span className=" text-cyan-950">Web Development</span></p>
                    <p className="text-sm text-black">Experience: <span className=" text-cyan-950">5 years</span></p>
                    {/* <p className="text-sm text-black">Rating: <span className=" text-cyan-950">4.5</span></p> */}
                    <p className="text-sm text-black">Price: <span className=" text-cyan-950">$50/hr</span></p>
                </div>
            </div>
            {/* rating bar */}
            <div className="m-2 flex justify-center items-center">
                <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div className="w-10 h-3 bg-cyan-900 rounded-full"></div>
                        <div className="w-10 h-3 bg-cyan-900 rounded-full"></div>
                        <div className="w-10 h-3 bg-cyan-900 rounded-full"></div>
                        <div className="w-10 h-3 bg-cyan-900 rounded-full"></div>
                        <div className="w-10 h-3 bg-cyan-900 rounded-full"></div>
                    </div>
                    <p className="text-sm text-cyan-900 m-2">{rating}</p>
                </div>
            </div>
            <div>
                <h2 className="text-sm font-bold">Description</h2>
                <p className="text-sm text-cyan-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex justify-center"><button className="bg-cyan-900 text-white rounded-box p-2 m-2"> Give Rating</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard