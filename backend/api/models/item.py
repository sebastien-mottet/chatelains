from .common import db


class Item(db.Model):
    __tablename__ = 'item'

    id: int
    text: str
    checked: bool

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String())
    checked = db.Column(db.Boolean, default=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"<Item {self.id}>"
