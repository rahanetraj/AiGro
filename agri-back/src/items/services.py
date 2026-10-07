from typing import Dict, List
import uuid
from src.items.models import Item, ItemCreate

# "Base de données" en mémoire
fake_items_db: Dict[str, Item] = {}


class ItemService:
    @staticmethod
    def create_item(item: ItemCreate) -> Item:
        item_id = str(uuid.uuid4())
        db_item = Item(
            id=item_id, name=item.name, description=item.description, price=item.price
        )
        fake_items_db[item_id] = db_item
        return db_item

    @staticmethod
    def get_items() -> List[Item]:
        return list(fake_items_db.values())

    @staticmethod
    def get_item(item_id: str) -> Item:
        if item_id not in fake_items_db:
            return None
        return fake_items_db[item_id]

    @staticmethod
    def update_item(item_id: str, item: ItemCreate) -> Item:
        if item_id not in fake_items_db:
            return None

        db_item = Item(
            id=item_id, name=item.name, description=item.description, price=item.price
        )
        fake_items_db[item_id] = db_item
        return db_item

    @staticmethod
    def delete_item(item_id: str) -> bool:
        if item_id not in fake_items_db:
            return False
        del fake_items_db[item_id]
        return True
