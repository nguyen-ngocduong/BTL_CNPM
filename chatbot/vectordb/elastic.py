import logging
import pandas as pd
from elasticsearch import Elasticsearch
from configs.config import LoadConfig


CONFIG_APP = LoadConfig()


class ElasticSearch:
    def __init__(self):
        self.client = Elasticsearch(
            cloud_id = CONFIG_APP.ELASTIC_CLOUD_ID,
            api_key = CONFIG_APP.ELASTIC_API_KEY,
            request_timeout = CONFIG_APP.ELASTIC_TIMEOUT
        )
        self.CATEGORIES = CONFIG_APP.CATEGORIES
    