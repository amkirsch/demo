FROM ruby:2.3
MAINTAINER Kyle A. Matheny <phaygo.one@gmail.com>

RUN \
  apt-get update \
  && apt-get install -y sqlite3 nodejs \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN \
  git clone https://github.com/amkirsch/demo.git . \
  && bundle install \
  && rake db:migrate
  
VOLUME ["/usr/src/app"]

EXPOSE 3000

ENTRYPOINT ["rails", "server"]
CMD ["-b", "0.0.0.0"]
