from blueprintsapp.app import db

class SeasonImages(db.Model):

  __tablename__ = 'seasonimages'
  image_id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
  image_season = db.Column(db.String(20), nullable=False)
  image_url = db.Column(db.Text)
  image_alt_text = db.Column(db.Text)
  image_caption = db.Column(db.String(50))

  @classmethod
  def get_images_by_season(cls, season):
    images = cls.query.filter_by(image_season = season).all()
    return images
  
class SeasonDescriptions(db.Model):
  
  __tablename__ = 'seasondescriptions'
  description_id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
  description_season = db.Column(db.String(20), nullable=False)
  description_title = db.Column(db.Text)
  description_text = db.Column(db.Text)

  @classmethod
  def get_description_by_season(cls, season):
    season_info = cls.query.filter_by(description_season = season).first()
    return season_info
  
class SplineObserver(db.Model):

  __tablename__ = 'splineobserver'
  spline_id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
  spline_season = db.Column(db.String(20))
  spline_image = db.Column(db.Text)
  spline_script = db.Column(db.Text)
  spline_viewer = db.Column(db.Text)
  spline_name = db.Column(db.String(100))
  spline_title = db.Column(db.String(50))
  spline_description = db.Column(db.Text)

  @classmethod
  def get_spline_by_season(cls, season):
    spline = cls.query.filter_by(spline_season = season).all()
    return spline

