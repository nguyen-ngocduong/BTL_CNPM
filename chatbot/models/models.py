from fastembed.embedding import TextEmbedding
from fastembed.sparse.bm25 import Bm25
from langchain_google_genai import GoogleGenerativeAI
from fastembed.late_interaction import LateInteractionTextEmbedding
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_groq import ChatGroq
from langchain_openai import OpenAI
from google import genai
from groq import Groq
from configs.config import LoadConfig

CONFIG_APP = LoadConfig()


class ModelLoader:
    def load_baai_embedding(self):
        embedding = SentenceTransformerEmbeddings(
            model_name = CONFIG_APP.BAAI_EMBEDDING
        )
        return embedding
    def load_dense_embedding(self):
        dense_embedding = TextEmbedding(CONFIG_APP.QDRANT_DENSE_EMBEDDING)
        return dense_embedding
    def load_sparse_embedding(self):
        sparse_embedding = Bm25(CONFIG_APP.QDRANT_SPARSE_EMBEDDING)
        return sparse_embedding
    def load_lateinteraction_embedding(self):
        lateinteraction_embedding = LateInteractionTextEmbedding(CONFIG_APP.QDRANT_INTERACTION_EMBEDDING)
        return lateinteraction_embedding
    def load_groq_model(self):
        return ChatGroq(
            api_key = CONFIG_APP.GROQ_API,
            model = CONFIG_APP.GROQ_MODEL,
            temperature = CONFIG_APP.GROQ_TEMPERATURE,
            max_tokens = CONFIG_APP.GROQ_MAX_TOKENS,
            timeout = CONFIG_APP.GROQ_TIMEOUT
        )
    def load_gemini_model(self):
        return GoogleGenerativeAI(
            model = CONFIG_APP.GEMINI_MODEL,
            google_api_key = CONFIG_APP.GEMINI_API
        )
    def load_openai_model(self):
        return OpenAI(
            model_name = CONFIG_APP.OPENAI_MDOEL,
            openai_api_key = CONFIG_APP.OPENAI_API
        )
    def load_route_model(self):
        return Groq(
            api_key = CONFIG_APP.GROQ_API
        )
    def load_extract_groq_model(self):
        return Groq(
            api_key = CONFIG_APP.GROQ_API
        )
    def load_extract_gemini_model(self):
        return genai.Client(
            api_key = CONFIG_APP.GEMINI_API
        )
    def load_rewrite_groq_model(self):
        return  Groq(
            api_key = CONFIG_APP.GROQ_API
        )
    def load_rewrite_gemini_model(self):
        return genai.Client(
            api_key = CONFIG_APP.GEMINI_API
        )




