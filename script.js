import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const heroSection = document.querySelector(".hero");
    const heroBackground = document.querySelector(".hero-bg");
    const heroContent = document.querySelector(".hero-content");
    const heroRevealer = document.querySelector(".hero-revealer");
    const heroImagesWrapper = document.querySelector(".hero-images");
    const heroImages = gsap.utils.toArray(".hero-img");
    const heroOutroContent = document.querySelector(".hero-outro-content");

    const heroOutroClone = heroOutroContent.cloneNode(true);
    heroOutroContent.classList.add("hero-outro-left");
    heroOutroClone.classList.add("hero-outro-right");
    heroOutroContent.parentNode.appendChild(heroOutroClone);

    gsap.set(".hero-outro-left", {
        clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
    });

    gsap.set(".hero-outro-right", {
        clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
    });

    gsap.set(heroImagesWrapper, { scale: 1 });

    const heroScrollTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: () => `+=${window.innerHeight * 7}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
    },
});

heroScrollTimeline.to(heroBackground, { scale: 1, duration: 0.5 }, 0);

heroScrollTimeline.to(
    heroRevealer,
    {
        clipPath: "polygon(49.5% 0%, 50.5% 0%, 50.5% 100%, 49.5% 100%)",
        duration: 0.2,
    },
    0,
);

    heroScrollTimeline.to(
        heroRevealer,
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.3,
        },
        0.2,
    );

    const cascadeStart = 0.4;
const cascadeStagger = 0.04;
const cascadeDuration = 0.16;

heroImages.forEach((heroImage, index) => {
    heroScrollTimeline.to(
        heroImage,
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: cascadeDuration,
        },
        cascadeStart + index * cascadeStagger,
    );
});

heroScrollTimeline.to(
    ".hero-outro-content",
    { scale: 1, duration: cascadeDuration },
    cascadeStart + heroImages.length * cascadeStagger + cascadeStagger * 0.5,
);

heroScrollTimeline.set(
    [heroBackground, heroContent, heroRevealer, heroImagesWrapper],
    { autoAlpha: 0 },
    0.7,
);

heroScrollTimeline.set(heroSection, { backgroundColor: "transparent" }, 0.7);

heroScrollTimeline.to(
    ".hero-outro-left",
    { xPercent: -150, duration: 0.3 },
    0.7,
);
heroScrollTimeline.to(
    ".hero-outro-right",
    { xPercent: 50, duration: 0.3 },
    0.7,
);
});