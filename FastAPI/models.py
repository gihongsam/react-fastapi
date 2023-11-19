from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float


# Transaction 모델 클래스 정의
class Transaction(Base):
    __tablename__ = "transaction"  # 데이터베이스의 테이블 이름 설정

    id = Column(Integer, primary_key=True, index=True)  # 기본 키 설정, 인덱싱
    amount = Column(Float)  # 거래 금액 필드
    category = Column(String)  # 거래 카테고리 필드
    description = Column(String)  # 거래 설명 필드
    is_income = Column(Boolean)  # 수입 여부 필드
    date = Column(String)  # 거래 날짜 필드
