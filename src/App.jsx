import React, { useState } from 'react';
import BackgroundImage from './BackgroundImage';
import Three from './Three'; 


function App() {
  const [popup, setPopup] = useState(false);
  const [obj, setObj] = useState('');
  return (
    <>
    <div  className="relative" >
        <BackgroundImage/>
        </div>
        <div id ='1' className = "bg-cover bg-no-repeat mt-24 absolute inset-0 flex justify-center items-center">
          <Three popup={popup} setPopup={setPopup} obj ={obj} setObj = {setObj} />
          <div>

            <div className = " text-[1.25rem] flex flex-col top-0 mt-5  text-center w-1/3  bg-gray-500 absolute bg-opacity-10">
            {popup && obj === "boxMesh1" &&
            <>
            <h1 className = " text-orange-600 font-bold text-center text-4xl"> MERCEDES-BENZ BIOME </h1>
            <p className = "mt-2 mx-10   text-blue-400">
              "The Mercedes-Benz BIOME Concept symbiosis vehicle is made from an ultralight material called BioFibre and tips the scales 
              at just 875.5 lbs (around 394 kg). This material is significantly lighter than metal or plastic, yet more robust than steel. 
              BioFibre is grown from proprietary DNA in the Mercedes-Benz nursery, where it collects energy from the sun and stores 
              it in a liquid chemical bond called BioNectar4534. As part of this process, the vehicle is created from two seeds: 
              The interior of the BIOME grows from the DNA in the Mercedes star on the front of the vehicle, while the exterior 
              grows from the star on the rear." 
              </p>
              </>
            }
            {popup && obj === "boxMesh2" && 
              <>
              <h1 className = " text-orange-600 font-bold text-center text-4xl">LAMBORGHINI V12 VISION GT</h1>
              <p className = "mt-2 mx-10   text-blue-400">
              "The Lambo V12 Vision Gran Turismo is created to provide the ultimate virtual car for young fans and gamers, 
              who are ultra-enthusiastic about Lamborghini and its futuristic aspirations,” said Mitja Borkert, 
              Head of Lamborghini Centro Stile. ”It is an opportunity for Lamborghini’s design talent to stretch 
              its wings and visualize a car that, like every Lamborghini, not only is a head-turner and the best 
              driving experience, but also mirrors Lamborghini's push on future technologies, particularly in the 
              arena of lightweight materials and hybridization."
                </p>
                </>
            }
            {popup && obj === "boxMesh3" && 
              <>
              <h1 className = " text-orange-600 font-bold text-center text-4xl"> MAZDA RX-VISION GT3 CONCEPT</h1>
              <p className = "mt-2 mx-10   text-blue-400">
              "The base vehicle "MAZDA RX-VISION" is a concept car that was revealed at the 2015 Tokyo Motor Show. 
              Based on the “KODO -Soul of Motion-” design theme, it was designed to be the most beautiful FR sports 
              car that Mazda could conceive of and was equipped with a next-generation "SKYACTIV-R” rotary engine (RE). 
              The model embodies a dream vehicle that Mazda hopes to make it real one day."
                </p>
                </>
            }
            {popup && obj === "boxMesh4" && 
              <>
              <h1 className = " text-orange-600 font-bold text-center text-4xl"> PAGANI HUAYRA R </h1>
              <p className = "mt-2 mx-10   text-blue-400">
                "San Cesario Sul Panaro, 18 March 2021 – On the wings of a wind that blows ever-stronger, the Huayra R is 
                released to express its full character in total freedom. Pure, passionate, mighty and captivating. 
                It knows no limits. The new track-focused Hypercar from Pagani combines the highest level of automotive 
                engineering and aerodynamic know-how with unprecedented aesthetic sensitivity in an exercise of style that 
                represents the full expression of Pagani Automobili’s technological development."
                </p>
                </>
            }
            </div>
            
          </div>
        </div>
      <div className=" mt-3 absolute top-0 flex flex-col justify-center items-center  w-full">
        <h1 className="text-violet-300 text-3xl font-bold mb-2">Welcome to my 3D interactive concept car gallery!</h1>
        <h2 className="text-3xl text-cyan-200 font-bold mb-2">Click on any car! All the cars are 360° interactive (hold left click) and move around!</h2>
      </div> 
      </>
   
  );
}

export default App;