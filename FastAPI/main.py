from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import aiohttp
import asyncio


app = FastAPI()  # FastAPI 애플리케이션 인스턴스 생성

# CORS 설정: 프론트엔드에서 백엔드에 접근할 수 있도록 설정
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic 모델 정의
class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: str


class TransactionModel(TransactionBase):
    id: int  # 거래 ID 필드 추가

    class Config:  # Pydantic 모델의 ORM 모드 설정
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  # 작업 종료 후 세션 닫기


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)  # 데이터베이스 테이블 생성


async def naverdic(word_to_search):
    # 네이버 영어사전 URL
    url = f"https://ac-dict.naver.com/enko/ac?st=11&r_lt=11&q={word_to_search}"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    dicResponse = await response.text()
                    dicResponse = eval(dicResponse)
                    if dicResponse["items"][0]:  # 사전에 없는 단어가 아닐 경우
                        return (
                            dicResponse["items"][0][0][0][0]
                            + " : "
                            + dicResponse["items"][0][0][2][0]
                        )
                    else:
                        return "없는 단어입니다."
                else:
                    return "페이지를 가져오는 데 문제가 발생했습니다."
    except aiohttp.ClientError as e:
        return "요청 중 오류가 발생했습니다: " + str(e)


# 거래 생성 API 엔드포인트
@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


# 거래 조회 API 엔드포인트
@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions


@app.get("/naverdic/{word}")
async def get_naver_dic(word: str):
    return await naverdic(word)


if __name__ == "__main__":
    models.Base.metadata.create_all(bind=engine)
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
