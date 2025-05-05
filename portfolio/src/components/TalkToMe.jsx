import React, { forwardRef } from "react";

const TalkToMe = forwardRef((__, ref) => {
  return (
    <div className="talkToMeContainer" ref={ref}>
      <div className="half">
        <p>mobile: 0498 095 622</p>
        <p>
          email: <a href="mailto:benscott.dev@gmail.com">benscott.dev@gmail.com</a>
        </p>
      </div>
      <div className="half">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut veniam provident quo quisquam ullam, repudiandae dignissimos laboriosam, necessitatibus et natus quos neque fugiat illum cumque earum doloremque, quidem debitis? Quasi.</p>
      </div>
    </div>
  );
});

export default TalkToMe;
