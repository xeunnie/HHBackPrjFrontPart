// App.js
import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const { IMP } = window;
    IMP.init('imp27135255'); // 포트원에서 발급받은 가맹점 식별코드

    const data = {
      pg: 'kakaopay.TC0ONETIME', // PG사
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: '아임포트 결제데이터 분석', // 주문명
      buyer_name: '최승은', // 구매자 이름
      buyer_tel: '01040362014', // 구매자 전화번호
      buyer_email: 'example@example.com', // 구매자 이메일
      buyer_addr: '주소', // 구매자 주소
      buyer_postcode: '123-456', // 구매자 우편번호
      custom_data: { "list": [{ 1: 3, 2: 5, 9: 10 }] }
    };

    IMP.request_pay(data, (response) => {
      if (response.success) {
        axios.get("/api/payment/check?impUid=" + response.imp_uid)
            .then((data) => {
              console.log(data.data);
            })
            .catch((error) => {
              console.error("결제 검증 실패: ", error);
            });
        alert('결제 성공');
      } else {
        alert('결제 실패: ' + response.error_msg);
      }
    });
  };

  return (
      <div>
        <h1>포트원 결제 테스트</h1>
        <button onClick={handlePayment}>결제하기</button>
      </div>
  );
};

export default App;
