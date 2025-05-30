import React, { useState } from "react";
import gsap from "gsap";

function WhatIDoPage() {
  const [currentHover, setCurrentHover] = useState();

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

    if (hoveredJob && hoveredJob.jobImage) {
      const tl = gsap.timeline();
      tl.to(jobPreviewImage, { autoAlpha: 0, duration: 0.3 });
      tl.set(jobPreviewImage, { attr: { src: hoveredJob.jobImage } });
      tl.to(jobPreviewImage, { autoAlpha: 1, duration: 0.5 });
    }
  };

  const handleClick = (job) => {
    setCurrentHover(job);
    const jobsWrapper = document.querySelector(".jobsWrapper");
    const jobCopyWrapper = document.querySelector(".itemCopyWrapper");

    // LOGIC FOR HIDING AND SHOWING COPY PLS
  };

  const back = () => {
    console.log("BACK PLEASEEEEEE");
  };

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
        <span className="divider"></span>
        <div className="jobPreview">
          <img className="previewImage" src="./src/static/jobs/songworks.jpg" alt="imagePreview" />
        </div>
      </div>
      {currentHover && currentHover.jobCopy && (
        <div className="itemCopyWrapper">
          <span onClick={back}>back</span>
          <div className="itemCopyTop">
            <h1>{currentHover.jobName}</h1>
            <p>{currentHover.jobCopy}</p>
          </div>
          <div className="itemCopyBottom">
            <p>
              YEAR: {currentHover.jobYear}
              <br />
              <br />
              {currentHover.jobSkills}
              <br />
              <br />
              {currentHover.jobLink}
            </p>
          </div>
        </div>
      )}
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
