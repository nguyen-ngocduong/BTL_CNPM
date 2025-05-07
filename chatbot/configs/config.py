import yaml
import pandas as pd

def load_config():
    with open('configs/config.yml', 'r') as f:
        config  = yaml.safe_load(f)
    return config
def load_dataset():
    dataset = pd.read_csv('csv/phone.csv')
    return dataset

class LoadConfig:
    def __init__(self):
        phone_dataset = load_dataset()
        config = load_config()
        # GROQ CONFIG
        self.GROQ_MODEL = config['llm_groq']['model']
        self.GROQ_API = config['llm_groq']['api_key']
        self.GROQ_MAX_TOKENS = config['llm_groq']['max_tokens']
        self.GROQ_TEMPERATURE = config['llm_groq']['temperature']
        self.GROQ_TIMEOUT  = config['llm_groq']['timeout']

        # GEMENI CONFIG
        self.GEMINI_MODEL = config['gemini']['model']
        self.GEMINI_API = config['gemini']['api_key']

        # OPENAI CONFIG
        self.OPENAI_MODEL = config['openai']['model']
        self.OPENAI_API = config['openai']['api_key']

        # QDRANT_CONFIG
        self.QDRANT_URL = config['qdrant']['url']
        self.QDRANT_API = config['qdrant']['api_key']
        self.QDRANT_COLLECTION = config['qdrant']['collection_name']
        self.QDRANT_DENSE_EMBEDDING = config['qdrant']['dense_embedding']
        self.QDRANT_SPARSE_EMBEDDING = config['qdrant']['sparse_embedding']
        self.QDRANT_INTERACTION_EMBEDDING = config['qdrant']['late_interaction_embedding']
        self.QDRANT_BATCH_SIZE = config['qdrant']['batch_size']
        self.QDRANT_THRESH_SCORE = config['qdrant']['thresh_score']

        # EMBEDDING CONFIG
        self.HUGGINGFACE_API = config['huggingface']['api_key']
        self.BAAI_EMBEDDING = config['huggingface']['baai_embedding']

        #CHROMA CONFIG
        self.CHROMA_PATH  = config['chroma']['db_path']
        self.CHROMA_COLLECTION = config['chroma']['collection']
        self.CHROMA_TOP_K = config['chroma']['top_k']
        self.CHROMA_SCORE_THRESHOLD = config['chroma']['score_threshold']

        self.ELASTIC_CLOUD_ID = config['elastic_search']['cloud_id']
        self.ELASTIC_API_KEY = config['elastic_search']['api_key']  
        self.ELASTIC_INDEX_NAME = config['elastic_search']['index_name'] 
        self.ELASTIC_TIMEOUT = config['elastic_search']['timeout']   
        # DATA CONFIG
        self.FINAL_DATA_PATH = config['data']['final_data_path']
        # RAG CONFIIG
        self.MEMORY_K = 100
        # KEYWORD
        self.CHEAP_KEYWORD = ['rẻ', 'rẻ nhất', 'thấp', 'thấp nhất', 'nhỏ', 'nhỏ nhất', 'tiết kiệm nhất', 'thấp', 'thấp nhất', 'nhỏ', 'nhỏ nhất', 'yếu', 'yếu nhất']
        self.EXPENSIVE_KEYWORD = ['đắt', 'đắt nhất', 'cao', 'cao nhất', 'lớn', 'lớn nhất', 'cao', 'cao nhất', 'lớn', 'lớn nhất', 'manh', 'mạnh nhất', 'trâu', 'trâu nhất']
        
        # RANGE PRICE
        self.ORIGIN_PRICE_MIN = phone_dataset['origin_price'].min() 
        self.ORIGIN_PRICE_MAX = phone_dataset['origin_price'].max()
        self.RENEW_VALUE_MIN = phone_dataset['renew_value'].min()
        self.RENEW_VALUE_MAX = phone_dataset['renew_value'].max()
        self.SCREEN_FREQ_MIN = phone_dataset['screen_freq'].min()
        self.SCREEN_FREQ_MAX = phone_dataset['screen_freq'].max()
        self.SCREEN_SIZE_MIN = phone_dataset['screen_size'].min()
        self.SCREEN_SIZE_MAX = phone_dataset['screen_size'].max()
        self.MEMORY_MIN = phone_dataset['in_memory'].min()
        self.MEMORY_MAX = phone_dataset['in_memory'].max()
        self.RAM_MIN = phone_dataset['RAM'].min()
        self.RAM_MAX = phone_dataset['RAM'].max()
        self.BATTERY_MIN = phone_dataset['battery_capacity'].min()
        self.BATTERY_MAX = phone_dataset['battery_capacity'].max()
        # FUNCTION_CALLING TOOLS
        self.GEMINI_TOOL_HEADER = {
            "type": "OBJECT",
            "properties": {},
            "required": []
        }
        self.PHONE_INFOMATION = {
            "item_name": "Tên cụ thể của sản phẩm. Ví dụ: iPhone 12 Pro Max, Samsung Galaxy Z Fold 3, ...",
            "specifications": "Thông số kĩ thuật của sản phẩm.",
            "price": "Giá bán của sản phẩm.",
            "renew_value": "Giá lên đời của sản phẩm.",
            "color": "Màu sắc của sản phẩm. Ví dụ: Xanh da trời, Titan Đen, ...",
            "ram": "Dung lượng RAM của sản phẩm. Ví dụ: 8G, 4G, ...",
            "memory": "Dung lượng bộ nhớ trong của sản phẩm. Ví dụ: 256G, 512GB, ...",
            "screen_freq": "Tần số quét của màn hình. Ví dụ: 60Hz, 120Hz, ...",
            "screen_size": "Kích thước màn hình. Ví dụ: 6.3', 7.2 inch, ...",
            "battery_capacity": "Dung lượng PIN. Ví dụ: 5000mAh, 4500mAh, ..."
        }
        self.CATEGORY_TOOLS = {
            "PHONE": self.PHONE_INFOMATION
        }
        # MAPPING ELASTIC SEARCH CONFIG
        self.PHONE_MAPPING = 
