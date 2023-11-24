import React, {useState, useEffect} from 'react' // React와 필요한 훅 임포트
import api from './api';

const Finance = () => {
  // 거래 데이터와 폼 데이터의 상태를 관리하는 훅
  const [transactions, setTransactions] = useState([]); // 거래 데이터 상태
  const [formData, setFormData] = useState({ // 폼 데이터 상태
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  // 백엔드에서 거래 데이터를 가져오는 함수
  const fetchTransactions = async() => {
    const response = await api.get('/transactions/');
    setTransactions(response.data) // 상태 업데이트
  };

  // 컴포넌트 마운트 시 거래 데이터 가져오기
  useEffect(() =>{
    fetchTransactions();
  }, []); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때만 실행

  // 폼 입력 변경 시 호출되는 함수
  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value, // 기존 폼 데이터에 변경사항 반영
    });
  };

  // 폼 제출 시 호출되는 함수
  const handleFormSubmit = async(event)=>{
    event.preventDefault(); // 기본 폼 제출 동작 방지
    await api.post('/transactions/', formData); // 백엔드로 데이터 전송
    fetchTransactions(); // 거래 데이터 새로고침
    setFormData({ // 폼 초기화
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return (
    <div>
      <h2>Finance Page</h2>
      {/* 여기에 Finance 관련 컨텐츠를 구현 */}
            {/* 거래 데이터 입력 폼 */}
            <div className='container'>
        <form onSubmit={handleFormSubmit}>
          {/* 금액 입력 필드 */}
          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>
              Amount
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
          </div>

          {/* 카테고리 입력 필드 */}
          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
              Category
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
          </div>

          {/* 설명 입력 필드 */}
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
          </div>

          {/* 수입 여부 체크박스 */}
          <div className='mb-3'>
            <label htmlFor='is_income' className='form-label'>
              Income?
            </label>
            <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
          </div>

          {/* 날짜 입력 필드 */}
          <div className='mb-3'>
            <label htmlFor='date' className='form-label'>
              Date
            </label>
            <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
          </div>

          {/* 제출 버튼 */}
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>

        {/* 거래 데이터 테이블 */}
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* 거래 데이터를 행으로 렌더링 */}
            {transactions.map((transaction)=>(
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
