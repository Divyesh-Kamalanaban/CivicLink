/* eslint-disable react/prop-types */
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

function Animations ({globeRef, globeContainer}) {
  //useEffect for making sure the object loads and then we can animate it, to prevent accessing property before even loading.
  useEffect(() => {
    function globeAnimate() {
      // Set up scroll animation
      //GlobeRef data is passed from ThreeJSGlobe to Welcome.jsx and stored there and used here.
      gsap.to(globeRef.current.position, {
        x: 80, // Move from center to right
        y: 0,
        scrollTrigger: {
          trigger: "header", // Your main container
          start: "center center",
          endTrigger: ".sec2",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
          markers: true, // Set to true for debugging
        },
      });

      gsap.to(globeRef.current.rotation, {
        y: 0.5,
        scrollTrigger: {
          trigger: "header", // Your main container
          start: "center center",
          endTrigger: "footer",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
          markers: true, // Set to true for debugging
        },
      });

    }

    function backgroundFade(){
        gsap.to(globeContainer.current.style,{
            backgroundImage : "linear-gradient(#000000,#001A31)",
            scrollTrigger: {
              trigger: "header", // Your main container
              start: "center center",
              endTrigger: ".sec2",
              end: "bottom bottom",
              scrub: 1, // Smooth scrubbing
              markers: true, // Set to true for debugging

        }
    })
}
backgroundFade();

    globeAnimate();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [globeRef, globeContainer]);

  return null;

};

export default Animations;
