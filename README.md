# options

## Local
* `docker-compose up -d`
* `docker-compose down`
* `docker-compose exec web python tiger/scripts/fetch_tickets.py`
* `docker-compose exec web python tiger/scripts/disable_tickers.py`

## Deployment
#### Local
* Pycharm pythonpath: https://stackoverflow.com/questions/28326362/pycharm-and-pythonpath
* https://medium.com/@fullsour/how-to-switch-user-on-the-aws-cli-77c2b314e12d
* `aws ecr get-login-password --region us-east-2 --profile roll | docker login --username AWS --password-stdin 813539762970.dkr.ecr.us-east-2.amazonaws.com`
* `docker-compose -f docker-compose.prod.yml build`
* `docker-compose -f docker-compose.prod.yml push`
* `ssh -i ~/.ssh/roll_tech.pem ubuntu@3.135.138.142`
* `scp -i ~/.ssh/roll_tech.pem -r $(pwd)/{django_apps,frontend,.env.prod,docker-compose.prod.yml} ubuntu@3.135.138.142:/home/ubuntu/app`
* `docker-compose exec web python manage.py test`
#### Remote
* `aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 813539762970.dkr.ecr.us-east-2.amazonaws.com`
* `sudo systemctl enable docker`
* `docker-compose pull`
* `docker-compose down && docker-compose up -d`
* `nohup docker-compose exec -T backend python tiger/scripts/disable_tickers.py &`
