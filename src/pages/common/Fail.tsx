import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Loading} from "@components/Loading";


export const Fail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert('결제에 실패했습니다.')
    navigate(`/webtoon`);
  }, [])


  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center align-center">
        <Loading/>
      </div>
    </div>
  );
}

export default Fail;
