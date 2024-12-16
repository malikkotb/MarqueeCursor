"use client";
import styles from "./style.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeButton({ direction = "left" }) {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;

  useEffect(() => {
    gsap.set(secondText.current, {
      left: secondText.current.getBoundingClientRect().width,
    });
    if (direction === "right") {
      requestAnimationFrame(animateRight);
    } else {
      requestAnimationFrame(animateLeft);
    }
  }, []);

  //   to animate to the right
  const animateRight = () => {
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animateRight);
    xPercent += 0.5;
  };

  // animate to the left
  const animateLeft = () => {
    // Reset `xPercent` once it exceeds 100% to create the looping effect
    if (xPercent < -100) {
      xPercent = 0;
    }
    // Move first text to the left
    gsap.set(firstText.current, { xPercent: xPercent });

    // Move second text to the right
    gsap.set(secondText.current, { xPercent: xPercent });

    requestAnimationFrame(animateLeft);
    xPercent -= 0.5; // Adjust the speed by changing the decrement value
  };

  return (
    <div className={styles.main}>
      <div ref={slider} className={styles.slider}>
        <p ref={firstText}>View Details -</p>
        <p ref={secondText}>View Details -</p>
        {/* 
        Using CSS: .slider p:nth-of-type(2), we place the second <p> element directly next to the first one, off-screen to the right (left: 100%).
        This setup makes the two texts act like a single, continuous line of text, allowing the animation to scroll both together smoothly to the left, looping endlessly when they move out of view.
        */}
      </div>
    </div>
  );
}
