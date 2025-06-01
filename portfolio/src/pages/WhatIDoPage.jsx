import React, { useState, useEffect } from "react";
import gsap from "gsap";

function WhatIDoPage() {
  const [current, setCurrent] = useState();
  const [prevHovered, setPrevHovered] = useState("Songworks");

  const jobs = [
    {
      jobKey: 1,
      jobName: "Songworks",
      jobType: "Development",
      jobCopy: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, amet. Optio quasi odio atque architecto voluptate voluptatum culpa vero consequatur, unde natus placeat cupiditate laboriosam labore nostrum ad, consectetur molestiae!",
      jobYear: "2024",
      jobSkills: "animation, reactjs, html, css, javascript, figma",
      jobLink: "songworks.com",
      jobImage: "./src/static/jobs/songworks.jpg",
    },
    {
      jobKey: 2,
      jobName: "Ben Scott",
      jobCopy: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, amet. Optio quasi odio atque architecto voluptate voluptatum culpa vero consequatur, unde natus placeat cupiditate laboriosam labore nostrum ad, consectetur molestiae!",
      jobYear: "2025",
      jobSkills: "threejs, webgl, blender, reactjs, html, scss, javascript, figma",
      jobLink: "benscott.xyz",
      jobImage: "./src/static/jobs/benscottportfolio.jpg",
    },
    {
      jobKey: 3,
      jobName: "Test 2",
    },
    {
      jobKey: 4,
      jobName: "Test 3",
    },
    {
      jobKey: 5,
      jobName: "Test 4",
    },
  ];

  const handleJobHover = (e) => {
    const chosen = e.target.innerHTML;
    const hoveredJob = jobs.find((job) => job.jobName === chosen);
    const jobPreviewImage = document.querySelector(".jobPreview img");
    setPrevHovered(hoveredJob);

    if (hoveredJob && hoveredJob.jobImage) {
      if (prevHovered.jobName === chosen) {
        return;
      } else {
        const tl = gsap.timeline();
        tl.to(jobPreviewImage, { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" });
        tl.set(jobPreviewImage, { attr: { src: hoveredJob.jobImage } });
        tl.to(jobPreviewImage, { autoAlpha: 1, duration: 0.5, ease: "power1.inOut" });
      }
    }
  };

  const handleClick = (job) => {
    setCurrent(job);
  };

  useEffect(() => {
    if (current) {
      const jobsWrapper = document.querySelector(".jobsWrapper");
      const jobCopyWrapper = document.querySelector(".itemCopyWrapper");

      const tl = gsap.timeline();

      tl.to(jobsWrapper, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power1.inOut",
      });

      tl.to(jobsWrapper, {
        display: "none",
      });

      tl.to(jobCopyWrapper, {
        display: "flex",
      });

      tl.to(jobCopyWrapper, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power1.inOut",
      });
    }
  }, [current]);

  const back = () => {
    const jobsWrapper = document.querySelector(".jobsWrapper");
    const jobCopyWrapper = document.querySelector(".itemCopyWrapper");

    const tl = gsap.timeline();
    tl.to(jobCopyWrapper, {
      autoAlpha: 0,
      duration: 0.4,
    });

    tl.to(jobCopyWrapper, {
      display: "none",
    });
    tl.to(
      jobsWrapper,
      {
        display: "flex",
      },
      "-=1"
    );

    tl.to(jobsWrapper, {
      autoAlpha: 1,
      duration: 0.4,
    });
  };

  // LOGIC FOR HIDING AND SHOWING COPY PLS

  return (
    <section className="whatIDoPage">
      <div className="container max-width">
        <div className="jobsWrapper">
          {jobs.map((job) => (
            <span
              onClick={() => {
                handleClick(job);
              }}
              onMouseEnter={handleJobHover}
              className="job"
              key={job.jobKey}
            >
              {job.jobName}
            </span>
          ))}
        </div>
        {current && (
          <div className="itemCopyWrapper">
            <div className="itemCopyTop">
              <span onClick={back}>back</span>
              <h1>{current.jobName}</h1>
              <p>{current.jobCopy}</p>
            </div>
            <div className="itemCopyBottom">
              <p>
                YEAR: {current.jobYear}
                <br />
                <br />
                {current.jobSkills}
                <br />
                <br />
                {current.jobLink}
              </p>
            </div>
          </div>
        )}
        <span className="divider"></span>
        <div className="jobPreview">
          <img className="previewImage" src="./src/static/jobs/songworks.jpg" alt="imagePreview" />
        </div>
      </div>
    </section>
  );
}

export default WhatIDoPage;

//  <div className="wrapper">
//         <div className="contentWrapper max-width">
//           <div className="itemCopyWrapper">
//             <div className="itemCopyTop">
//               <h1>SONGWORKS</h1>
//               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, amet. Optio quasi odio atque architecto voluptate voluptatum culpa vero consequatur, unde natus placeat cupiditate laboriosam labore nostrum ad, consectetur molestiae!</p>
//             </div>
//             <div className="itemCopyBottom">
//               <p>
//                 YEAR: 2024
//                 <br />
//                 <br />
//                 ANIMATION, REACTJS, HTML, CSS, JAVASCRIPT, FIGMA
//                 <br />
//                 <br />
//                 www.songworks.com
//               </p>
//             </div>
//           </div>
//         </div>
//         <span className="divider draw"></span>
//         <div className="itemShowcase ">
//           <div className="currentItem">
//             <a href="https://songworks.com.au" target="_blank">
//               <img src="./src/static/jobs/songworks.png" alt="songworks.com.au" />
//             </a>
//           </div>
//           <div className="itemSwiper"></div>
//         </div>
//       </div>
