from fastapi import APIRouter, HTTPException, Depends
from src.items.models import Item, ItemCreate
from src.items.services import ItemService

router = APIRouter(prefix="/items", tags=["items"])


@router.post("/", response_model=Item)
def create_item(item: ItemCreate):
    return ItemService.create_item(item)


@router.get("/", response_model=list[Item])
def read_items():
    return ItemService.get_items()


@router.get("/{item_id}", response_model=Item)
def read_item(item_id: str):
    db_item = ItemService.get_item(item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.put("/{item_id}", response_model=Item)
def update_item(item_id: str, item: ItemCreate):
    db_item = ItemService.update_item(item_id, item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.delete("/{item_id}")
def delete_item(item_id: str):
    success = ItemService.delete_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}
