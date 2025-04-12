/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "./welcome.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import ParticleGen from "../components/particle";
import civicconnectwhite from "../assets/Civic-Connect-White.svg";
import civicconnectblack from "../assets/Civic-Connect-Black.svg";
import cash from "../assets/cash.svg"
import idcard from "../assets/id-card.svg"
import clouddone from "../assets/cloud-done.svg"
import business from "../assets/business.svg"
import barchart from "../assets/bar-chart.svg"
import Animations from "../components/animations";
import ThreeJSGlobe from "../components/welcome/threejsglobe";
import CarouselMove from "../components/welcome/carousel";
import CustomizedTimeline from "../components/welcome/timeline";
function Welcome() {
  const nav = useNavigate();
  //Initialised useRef hooks for globe and globe container in parent file; For animations and threejsglobe setup.
  const globeRef = useRef(null);
  const globeContainer = useRef(null);

  return (
    <div className="w-screen min-h-screen">
      {/*Non visual react components for providing globe and animation respectively.*/}
      <ThreeJSGlobe globeRef={globeRef} globeContainer={globeContainer} />
      <Animations globeRef={globeRef} globeContainer={globeContainer} />

      {/*Hero Section*/}
      <header className="relative h-screen w-screen flex flex-col justify-center items-center">
        <div className="container mx-auto text-center text-white z-10">
          {/* <img alt='' src={civicconnect} /> */}
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-normal">CivicConnect</h1>
          <p className="mt-4 text-lg md:text-4xl font-normal font-['Montserrat'] tracking-tighter">
            Community for community.
          </p>
        </div>
        <div className="flex items-start justify-center my-4 z-10">
          <button
            onClick={() => nav("/login")}
            className="border-button h-12 w-24 rounded-full mx-2 px-4 font-bold text-center relative bg-transparent text-blue-50"
          >
            LOGIN
          </button>
          <button
            onClick={() => nav("/signup")}
            className="h-12 w-fit bg-gradient-to-r from-[#ffffff] to-[#4ba5f9] rounded-full mx-2 px-4 font-bold text-center"
          >
            REGISTER
          </button>
        </div>
      </header>

      {/*About Section*/}
      <section className="h-fit md:h-screen w-screen flex flex-col items-center justify-between relative sec2">
        <div className="flex flex-col justify-center items-center h-full w-full">
          <h1 className="text-6xl font-semibold mb-6 px-[0rem] mx-[1rem] text-left text-white">
            About us
          </h1>
          <div className="text-white text-justify text-lg m-1 sm:m-0 sm:w-1/2">
            <p>
              Civic Link  is an AI-powered digital platform revolutionizing
              civic engagement by creating India&apos;s first structured
              ecosystem for tracking, verifying, and rewarding community
              service. Our innovative Civic ID and Civic Credits system bridges
              the gap between volunteers, NGOs, corporations, and government
              initiatives - turning goodwill into measurable social impact.
            </p>
          </div>

        </div>
        <table className="w-screen flex justify-center items-center">
          <tbody>
          <tr className="flex flex-col md:flex-row justify-center items-center w-screen">
            {[
              {
                img: idcard,
                title: "Your Social Impact, On Record",
                desc: "Each person gets their unique identifier, which is used for participating in drives and obtaining rewards.",
              },
              {
                img: cash,
                title: "Earn Real Rewards, Not Just Good Vibes",
                desc: "Volunteer hours = Civic Credits = free metro rides, gift cards, or even cash. Because altruism shouldn't mean empty pockets.",
              },
              {
                img: clouddone,
                title: "AI That Spots Fake Heroes",
                desc: "Our tech cross-checks your selfie at the food drive, your location at the beach cleanup, and even crowd-sourced reviews.",
              },
              {
                img: business,
                title: "The chain linking corporates and NGOs",
                desc: "Businesses get a real-time CSR dashboard; NGOs get a volunteer army. We’re the missing link in the impact chain.",
              },
              {
                img: barchart,
                title: "Impact Analytics",
                desc: "Real-time social contribution metric",
              },
            ].map((arr, index)=>{
              return(
                <td key={index} className="glass-card flex flex-col justify-around items-center p-3 m-3 text-white h-[60vh] lg:h-[40vh] w-[50%] md:w-[18vw]">
                   <img src={arr.img} alt={arr.title} className="h-[5rem] bg-gradient-to-r from-[#001A31] to-[#23455f] p-4 rounded-lg border-white border-solid border-[2px]"/>
                   <div>
                   <h3 className="text-2xl font-bold text-center">{arr.title}</h3>
                   <p className="font-extralight text-justify">{arr.desc}</p>
                </div>
              </td>
              )
            })}
          </tr>
          </tbody>
        </table>
      </section>

      <section className="h-fit md:h-screen w-screen flex flex-col md:flex-row items-center justify-between relative sec3">
      <div className="flex flex-col justify-center h-full w-full p-8">
          <h1 className="text-5xl font-semibold mb-6 px-[0rem] text-left text-white">
          Our vision
          </h1>
          <div className="text-white text-justify text-lg mb-6 px-[0rem] mx-[1rem] sm:m-0 sm:w-1/2">
            <p>
              To create a world where every act of community service is recognized, valued, and incentivized, fostering a culture of sustained civic engagement that benefits society as a whole.
            </p>
          </div>

        </div>
            <CarouselMove />
        {/* <div className="flex flex-col items-center justify-center angled-carousel" ref={angledCarouselContainerRef}>{angledSlides.map((slide, index)=>{
          return(
            <div className="glass-card text-white p-2 h-[10vh] w-[20vw] flex flex-col justify-center items-center absolute" key={index}>
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
          </div>
          )
        })}
          
        </div> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">For Volunteers</h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Make a real impact in your community.</li>
              <li>Gain valuable experience.</li>
              <li>Earn rewards for your efforts.</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">For Society</h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Get access to a network of dedicated volunteers.</li>
              <li>Utilize resources to help your cause.</li>
              <li>
                Boosts community engagement by connecting volunteers with local
                NGOs.
              </li>
              <li>
                Increases civic participation through a rewarding system that
                encourages more volunteering and donations.
              </li>
            </ul>
          </div>
        </div> */}
      </section>
      <section className="h-screen w-screen flex flex-col justify-center items-center text-white">
      <CustomizedTimeline />
      </section>
      <footer className="bg-blue-700 text-white py-4 text-center">
       <p>divvvvvvvv</p>
      </footer>
    </div>
  );
}

export default Welcome;
