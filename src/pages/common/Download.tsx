import React, {useEffect} from "react";

export const Download = () => {

  useEffect(() => {
    redirectToStore()
  },[])

  function detectDevice() {
    const userAgent = navigator.userAgent

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'iOS';
    }
    else if (/android/i.test(userAgent)) {
      return 'Android';
    }
    else {
      return 'Other';
    }
  }

  function redirectToStore() {
    const deviceType = detectDevice();
    if (deviceType === 'iOS') {
      window.location.href = 'https://apps.apple.com/app/allcomics/id1552315891';
    } else if (deviceType === 'Android') {
      window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.all_comics';
    } else {
      alert('지원되지 않는 기기입니다.');
      window.location.href = window.location.origin;
    }
  }
  return <div></div>;
};
