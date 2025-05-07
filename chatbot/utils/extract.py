import time
import logging
import ast
from models.models import ModelLoader
from google.genai import types
from configs.config import LoadConfig
from rag.prompts import EXTRACT_PROMPT

CONFIG_APP = LoadConfig()
CONFIG_MODEL = ModelLoader()


def convert_string_to_dictionary(text):
    text_cleaned = text.replace('""', "None")
    text_cleaned = ast.literal_eval(text_cleaned)
    for key, value in text_cleaned.items():
        text_cleaned[key] = "" if value == "None" else value 

    return text_cleaned

class CreateToolFunctionCalling:
    def create_groq_tool(self, category):
        CATEGORY_INFOMATION = CONFIG_APP.CATEGORY_TOOLS.get(category)
        GROQ_TOOL = CONFIG_APP.GROQ_TOOL_HEADER
        
        for name, description in CATEGORY_INFOMATION.items():
            GROQ_TOOL[0]['function']['parameters'][name] = {
                "type": "string",
                "description": description
            }
            GROQ_TOOL[0]['function']['parameters']['required'].append(name)

        return GROQ_TOOL

    def create_gemini_tool(self, category):
        CATEGORY_INFOMATION = CONFIG_APP.CATEGORY_TOOLS.get(category)
        GEMINI_TOOL = CONFIG_APP.GEMINI_TOOL_HEADER
        
        for name, description in CATEGORY_INFOMATION.items():
            GEMINI_TOOL['properties'][name] = {
                "type": "STRING",
                "description": description
            }
        # print(GEMINI_TOOL)
        extract_infomation = types.FunctionDeclaration(
            name="extract_infomation",
            description="Trích xuất thông tin sản phẩm từ câu hỏi của người dùng, áp dụng cho nhiều danh mục sản phẩm khác nhau như điện thoại, laptop, tai nghe, đồng hồ, máy tính bảng, củ sạc, sạc dự phòng.",
            parameters=GEMINI_TOOL,
        )
        
        story_tools = types.Tool(
            function_declarations=[extract_infomation],
        )

        return story_tools


class ExtractInfomationFromQuery:
    def __init__(self):
        self.groq_llms = ModelLoader().load_extract_groq_model()
        self.gemini_llms = ModelLoader().load_extract_gemini_model()
        self.create_tool = CreateToolFunctionCalling()

    def groq_extract(self, query, category):
        tools = self.create_tool.create_groq_tool(category)
        messages = [
            {"role": "system", "content": EXTRACT_PROMPT},
            {"role": "user", "content": f"Trích xuất thông tin sản phẩm từ câu hỏi dưới đây: {query}"}
        ]
        
        try:
            response = self.groq_llms.chat.completions.create(
                model=CONFIG_APP.GROQ_MODEL,
                messages=messages,
                stream=False,
                tools=tools,
                tool_choice="auto",
                max_completion_tokens=CONFIG_APP.GROQ_MAX_TOKENS
            )
            response = response.choices[0].message.tool_calls[0].function.arguments
            response = convert_string_to_dictionary(response)
            return response
        except Exception as e:
            logging.warning(f'Extract Module using Groq Error. Please read the error: {e}')

    def gemnini_extract(self, query, category):
        prompt = EXTRACT_PROMPT + f"\nCâu hỏi: {query}"
        try:
            response = self.gemini_llms.models.generate_content(
                model = CONFIG_APP.GEMINI_MODEL,
                contents = prompt,
                config = types.GenerateContentConfig(
                    tools=[story_tools],
                    temperature=0
                )
            )
            response = response.candidates[0].content.parts[0].function_call.args
            return response
        except Exception as e:
            logging.warning(f"Extract Moduel using Gemini Error. Please read the error {e}")
# # Test  
# extract = ExtractInfomationFromQuery()
# response = extract.groq_extract("Anh cần mua điện thoại Iphone 16 pro max màu tím", "PHONE")
# print(response)