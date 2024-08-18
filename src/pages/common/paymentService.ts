import axios from 'axios';

export interface Payment {
  balanceAmount: number;
  cardType: string;
  id: string;
  amount: number;
  date: string;
  description: string;
  platform: string;
  default_coin: number;
  bonus_coin: number;
  method: string;
  purchaseTime: string;
  Status: 1 | 2; // 1: 승인, 2: 취소
  formattedPrice: string;
  createdAt: string;
  totalAmount: number;
  cardAmount: number;
  acquirerCode: string;
  issuerCode: string;
  number: string;
  validFrom: string;
  orderId: string; 
  payments: { 
    acquirerCode: string;
    balanceAmount: number;
    cardAmount: number;
    cardType: string;
    currency: string;
    lastTransactionKey: string;
    paymentKey: string;
  };
}

export interface GetAllPaymentsRes {
  code: number;
  data: {
    count: number;
    list: Payment[];
    page: number;
    sort: string;
    total: number;
  };
  timestamp: string;
}

interface CancelPaymentParams {
  orderId: string;
  paymentKey: string;
  cancel_reason: string;
  token: string;
}

export const getAllPayments = async ({
  startDate,
  endDate,
  page,
  count,
  token
}: {
  startDate: string;
  endDate: string;
  page: number;
  count: number;
  token: string;
}): Promise<GetAllPaymentsRes> => {
  try {
    const response = await axios.post<GetAllPaymentsRes>(
      'https://api-client.allcomics.org/v1/client/web-site/payment/search',
      {
        startDate,
        endDate,
        page,
        count,
        Status: [1, 2] // 여기서 Status 속성은 이전 속성과 쉼표로 구분되어야 합니다
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('결제 정보를 가져오는 중 에러 발생:', error);
    throw error;
  }
};

export const cancelTossPmntOrder = async ({ orderId, paymentKey, cancel_reason, token }: CancelPaymentParams) => {


  try {
    const response = await axios.post(
      'https://api-client.allcomics.org/v1/client/web-site/payment/cancel',
      { paymentKey, orderId, cancel_reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('결제 취소 응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('결제 취소 요청 실패:', error.message);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
      }
    } else {
      console.error('알 수 없는 오류:', error);
    }
    throw error;
  }
};

export default { getAllPayments, cancelTossPmntOrder };
