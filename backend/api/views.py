from flask import request
from . import app
from api.models.common import db
from api.models.item import Item


@app.route("/api/items", methods=['GET'])
def get_items():
    items = Item.query.all()
    return {
        'items': [item.as_dict() for item in items],
    }


@app.route("/api/item/<item_id>", methods=['GET', 'PUT', 'DELETE'])
def handle_item(item_id):
    item = Item.query.filter_by(id=item_id).first_or_404()
    if request.method == 'GET':
        return {
            'item': item.as_dict(),
        }
    if request.method == 'DELETE':
        db.session.delete(item)
    if request.method == 'PUT':
        data = request.get_json()
        item.text = data.get('text', item.text)
        item.checked = data.get('checked', item.checked)
    db.session.commit()
    return get_items()


@app.route("/api/item", methods=['POST'])
def create_item():
    data = request.get_json()
    text = data.get('text', '')
    checked = data.get('checked', False)
    new_item = Item(text=text, checked=checked)
    db.session.add(new_item)
    db.session.commit()
    return get_items()
