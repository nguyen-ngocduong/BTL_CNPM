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





class Rewrite:
	def __init__(self):
		self.model = CONFIG_MODEL.load_rewrite_groq_model()
	def rewrite_query(self, query, memory, num_message = 10):
		history = [(msg.type, msg.content) for msg in memory.chat_memory.messages]
        if not history:
            return query
        elif len(history) < num_message:
            recent_history = history
        else:
            recent_history = memory[-num_message : ]
        rewrite_prompt = ChatPromptTemplate.from_messages([
            SystemMessage(REWRITE_PROMPT),
            HumanMessagePromptTemplate.from_template(REWRITE_HUMAN_MESSAGE)
        ])
        rewrite_chain = LLMChain(
            prompt = rewrite_prompt,
            llm = ModelLoader().load_llm_model(),
            output_parser = StrOutputParser()
        )
        rewritten_query = rewrite_chain.predict(history = recent_history, human_input = query)
        return rewritten_query.strip()




