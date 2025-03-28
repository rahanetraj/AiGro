from fastapi import FastAPI
import src.items.routers as items

app = FastAPI()

app.include_router(items.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI demo"}
