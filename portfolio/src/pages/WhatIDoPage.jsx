import React, { useState, useEffect } from "react";
import gsap from "gsap";

function WhatIDoPage() {
  const [active, setActive] = useState();
  // All Jobs
  const jobs = [
    {
      jobKey: 1,
      jobName: "Ben Scott",
      jobType: "3D Website Development",
      jobYear: "2025",
      jobSkills: "ThreeJS, WebGL, Blender, ReactJs, HTML, SCSS, JavaScript, Figma",
      jobLink: "https://www.benscott.xyz",
      jobImage: "./src/static/jobs/benscottportfolio.jpg",
    },
    {
      jobKey: 2,
      jobName: "Songworks",
      jobType: "Website Development",
      jobYear: "2024",
      jobSkills: "Animation, ReactJS, HTML, CSS, JavaScript, Figma",
      jobLink: "https://www.songworks.com.au",
      jobImage: "./src/static/jobs/songworks.jpg",
    },
  ];

  const handleJobHover = (e) => {
    const chosen = e.target.innerHTML;
    setActive(chosen);

    // Returns the current hovered job object
    const hoveredJob = jobs.find((job) => job.jobName === chosen);

    // Markup variables
    const jobPreviewImage = document.querySelector(".jobPreview img");
    const jobPreviewImageMobile = document.querySelector(".mobile img");
    const jobType = document.getElementById("jobType");
    const jobYear = document.getElementById("jobYear");
    const jobSkills = document.getElementById("jobSkills");
    const jobLink = document.getElementById("jobLink");

    if (hoveredJob && hoveredJob.jobImage) {
      const tl = gsap.timeline();
      tl.to([jobPreviewImage, jobPreviewImageMobile], { autoAlpha: 0, duration: 0.4, ease: "power1.inOut" });
      tl.set([jobPreviewImage, jobPreviewImageMobile], { attr: { src: hoveredJob.jobImage } });
      tl.to([jobPreviewImage, jobPreviewImageMobile], { delay: 0.2, autoAlpha: 1, duration: 0.5, ease: "power1.inOut" });

      jobYear.innerHTML = hoveredJob.jobYear;
      jobType.innerHTML = hoveredJob.jobType;
      jobSkills.innerHTML = hoveredJob.jobSkills;
      jobLink.innerHTML = "see more";
      jobLink.href = hoveredJob.jobLink;
    }
  };

  return (
    <section className="whatIDoPage">
      <div className="container max-width">
        <div className="jobsWrapper">
          <div className="jobs">
            {jobs.map((job) => (
              <span onMouseEnter={handleJobHover} className="job" key={job.jobKey} style={{ color: job.jobName === active ? "orangered" : "#9498a1" }}>
                {job.jobName}
              </span>
            ))}
          </div>
          <div className="mobile">
            <img className="previewImage" src="./src/static/jobs/benscottportfolio.jpg" alt="imagePreview" />
          </div>
          <div className="jobInformation">
            {jobs.map((jobInfo) => (
              <div key={jobInfo.jobKey}>
                <p id="jobYear"></p>
                <p id="jobType"></p>
                <p id="jobSkills"></p>
                <p>
                  <a href="" target="_blank" id="jobLink"></a>
                </p>
              </div>
            ))}
          </div>
        </div>

        <span className="divider"></span>
        <div className="jobPreview desktop">
          <img className="previewImage" src="./src/static/jobs/benscottportfolio.jpg" alt="imagePreview" />
        </div>
      </div>
    </section>
  );
}

export default WhatIDoPage;
