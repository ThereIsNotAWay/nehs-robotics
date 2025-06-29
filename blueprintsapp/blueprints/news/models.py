from blueprintsapp.app import db

class newsarticle(db.Model):
  
  __table_name__ = 'news_article'

  news_headline = db.Column(db.String(255), primary_key=True)
  author = db.Column(db.String(50))
  publication_date = db.Column(db.Date)
  image_url = db.Column(db.Text, nullable=False)
  image_date = db.Column(db.Date)
  news_sub_headline = db.Column(db.String(255), nullable=False)
  news_text = db.Column(db.Text, nullable=False)

  def __repr__(self):
    return f'{self.news_headline}'
  
  @classmethod
  def get_article(cls, headline):
    return cls.query.filter_by(news_headline = headline).first()