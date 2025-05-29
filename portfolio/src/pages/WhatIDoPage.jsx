import React from "react";

function WhatIDoPage() {
  const jobs = [
    {
      jobKey: 1,
      jobName: "Songworks",
      jobCopy: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, amet. Optio quasi odio atque architecto voluptate voluptatum culpa vero consequatur, unde natus placeat cupiditate laboriosam labore nostrum ad, consectetur molestiae!",
      jobYear: "2024",
      jobSkills: "animation, reactjs, html, css, javascript, figma",
      jobLink: "songworks.com",
      jobImage: "./src/static/jobs/songworks.png",
    },
    {
      jobKey: 2,
      jobName: "Test 1",
    },
    {
      jobKey: 3,
      jobName: "Test 2",
    },
    {
      jobKey: 4,
      jobName: "Test 3",
    },
  ];

  return (
    <section className="whatIDoPage">
      <div className="container max-width">
        <div className="jobsWrapper">
          {jobs.map((job) => (
            <span className="job" key={job.jobKey}>
              {job.jobName}
            </span>
          ))}
        </div>
        <div className="jobPreview"></div>
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
