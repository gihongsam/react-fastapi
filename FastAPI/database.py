from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 데이터베이스 URL 설정: 여기서는 SQLite를 사용
URL_DATABASE = "sqlite:///./finance.db"

# SQLAlchemy 엔진 생성: 데이터베이스와의 연결을 관리
engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

# 세션 팩토리 설정: 데이터베이스 작업을 위한 세션 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 모델의 베이스 클래스: 데이터베이스 테이블과 모델 클래스를 연결
Base = declarative_base()
