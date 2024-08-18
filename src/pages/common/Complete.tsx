import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {UserContext} from "@context/UserContext";
import {PaymentContext} from "@context/PaymentContext";
import {Loading} from "@components/Loading";


export const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {executeConfirmPayment} = useContext(PaymentContext);
  const {userId, session_token} = useContext(UserContext);
  // const [msg, setMsg] = useState('');

  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId');
  const paymentKey = query.get('paymentKey');
  const paymentType = query.get('paymentType');
  const amount = query.get('amount');
  const redirect = query.get('redirect');

  useEffect(() => {
    if(userId === -1) {
      navigate(`/webtoon`);
    }
    if (orderId !== null && paymentKey !== null && amount !== null) {
      requestPay()
    }
  }, [])

  const requestPay = async () => {
    try {
      let confirmPaymentRes = await executeConfirmPayment(session_token, paymentKey!, orderId!, Number(amount!));
    } catch (error) {
      alert('결제 실패 했습니다.')
      console.log('결제 검증에러:', error)
    } finally {
      // setMsg('결제가 완료되었습니다.');
      if (redirect !== "null") {
        navigate(`${redirect}`);
      } else {
        navigate(`/me`);
      }
    }
  }


  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center align-center">
        <Loading/>
        {/*<div className="text-lg font-bold">{msg}</div>*/}
      </div>
    </div>
  );
}

export default Complete;
