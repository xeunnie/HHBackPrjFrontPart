// server.js
const express = require('express');
const axios = require('axios');
const app = express();

// TODO: YOUR_ACCESS_TOKEN을 실제 포트원 액세스 토큰으로 교체해야 합니다.
const YOUR_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

app.get('/api/payment/check', (req, res) => {
    const { impUid } = req.query;

    // 포트원 API를 통해 결제 검증 요청
    axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
        }
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        res.status(500).send(error);
    });
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다.');
});
