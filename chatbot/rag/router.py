import ast
from groq import Groq
from langchain.schema import SystemMessage
from langchain.chains import LLMChain
from langchain.schema.output_parser import StrOutputParser
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    AIMessagePromptTemplate
)
from models.models import ModelLoader
from rag.prompts import (
    SYSTEM_MESSAGE,
    HUMAN_MESSAGE,
    AI_MESSAGE,
    REWRITE_PROMPT,
    REWRITE_HUMAN_MESSAGE,
    ROUTING_PROMPT, 
    CHITCHAT_SYSTEM,
    CHITCHAT_HUMAN_MESSAGE,
    INSURANCE_SYSTEM,
    INSURANCE_HUMAN,
    PROMPT_ORDER,
    ORDER_HUMAN
)
from configs.config import LoadConfig
from rag.handle_router import RouteHandler
CONFIG_MODEL = ModelLoader()
CONFIG_APP = LoadConfig()


class RouteHandler:
    def handle_recommend_question(self, product_type):
        pass
    def handle_consultation_question(self, product_type):
        pass
    def handle_oder_question(self, product_type):
        pass
    def handle_compare_question(self, product_type):
        pass
    def handle_chitchat_question(self):
        pass
    def handle_insurance_question(self):
        pass
    def run(self, response):
        question_type, product_type = response.split("|")
        if question_type == "RECOMMEND":
            prompt = self.handle_recommend_question(product_type = product_type)
        elif question_type == "CONSULTATION":
            prompt = self.handle_consultation_question(product_type = product_type)
        elif question_type == "ORDER":
            prompt = self.handle_oder_question(product_type = product_type)
        elif question_type == "COMPARE":
            prompt = self.handle_compare_question(product_type = product_type)
        elif: question_type == "CHITCHAT":
            prompt = self.handle_chitchat_question()
        elif question_type == "INSURANCE":
            prompt = self.handle_insurance_question()
        return prompt
class Router:
    def __init__(self):
        self.llm = CONFIG_MODEL.load_route_model()
        self.route_handler = RouteHandler()
    def classify_question(self, question):
        messages = [
            {"role": "system", "content": ROUTING_PROMPT},
            {"role": "user", "content": f"Phân loại câu hỏi này vào 1 trong 6 nhóm kèm theo loại của sản phẩm: {question}"}
        ]

        response = self.llm.chat.completions.create(
            model = CONFIG_APP.GROQ_MODEL,
            messages = messages,
            max_completion_tokens=CONFIG_APP.GROQ_MAX_TOKENS
        )
        response = response.choices[0].message.content
        return response.strip()
    def run(self, question):
        response = self.classify_question(question = question)
        prompt = self.route_handler.run(response)

