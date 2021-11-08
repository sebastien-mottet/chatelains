from flask.cli import FlaskGroup

from api import app
from api.models.common import db
from api.models.item import Item

cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    db.session.add(Item(text="3kg d'oignons", checked=False))
    db.session.add(Item(text="1kg de bananes", checked=True))
    db.session.commit()


if __name__ == "__main__":
    cli()
