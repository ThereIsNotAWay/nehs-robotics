from flask import request, render_template, redirect, url_for, Blueprint
from sqlalchemy import desc

from blueprintsapp.app import db
from blueprintsapp.blueprints.news.models import newsarticle

news = Blueprint('news', __name__, template_folder='templates')

@news.route('/')
def display_news_articles():
  news_articles = newsarticle.query.order_by(desc(newsarticle.publication_date)).all()
  return render_template('news/news_catalog.html', news_articles=news_articles)

@news.route('/<news_headline>')
def retrieve_news(news_headline):
  news_headline = news_headline.replace('-', ' ')
  article = newsarticle.get_article(news_headline)

  if not article:
    return render_template('wip_page.html')
  
  return render_template("news/news.html", news_article=article)

@news.errorhandler(404)
def page_not_found(e):
  return render_template('wip_page.html')

# @news.route('')
# def redirect():
#   pass


@news.app_template_filter('length')
def number_of_news(news):
  return len(news)

@news.app_template_filter('is_first')
def news_index(news, news_list):
  return news == news_list[0]

