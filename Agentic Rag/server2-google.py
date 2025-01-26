
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.core.agent import ReActAgent
from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core.node_parser import MarkdownElementNodeParser
import chromadb
import nest_asyncio
from llama_parse import LlamaParse
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.llms.gemini import Gemini
import os
import pickle

nest_asyncio.apply()

# API Keys
LLAMA_KEY = "llx-xTWcZrXfwBJs5gNLlWuIMwfiWr2ldsOX6DQuP2FZxQ9503s5"
GOOGLE_API = "AIzaSyA3VQpjBu6AI92KTsvoHomRdWBdMqalCPI"

# Initialize the embedding model
model_name = "models/embedding-001"
embed_model = GeminiEmbedding(model_name=model_name, api_key=GOOGLE_API, title="this is a document")

# Initialize the LLM
llm = Gemini(model="models/gemini-1.5-flash", api_key=GOOGLE_API)

# Set global settings for embedding model and LLM
from llama_index.core import Settings
Settings.embed_model = embed_model
Settings.llm = llm
parsed_data = []
# Initialize Chroma DB
db2 = chromadb.PersistentClient(path="./db/gemini/chroma_db")
chroma_collection = db2.get_or_create_collection("meta-gemini-1")
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

# Function to parse documents
def parse_all_documents_in_directory(directory_path):
    parsed_data = []
    parsing_instruction = """The provided document is a financial report of a company. This document provides detailed financial information about the company including Charts, Peers, Ratios, Shareholding, Quarterly, P&L Balance Sheet, Cash Flows Corp. Action Investors and company essentials such as MARKET CAP, enterprise value etc. documents contains many tables also. Try to be precise while answering the questions."""
    parser = LlamaParse(api_key=LLAMA_KEY, result_type="markdown", parsing_instruction=parsing_instruction)

    for file_name in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file_name)
        if file_name.lower().endswith(".pdf"):
            try:
                print(f"Parsing file: {file_name}")
                parsed_result = parser.load_data(file_path)
                parsed_data += parsed_result
            except Exception as e:
                print(f"Error parsing {file_name}: {e}")

    return parsed_data

# Function to process and index documents



# Initialize the query engine
def initialize_query_engine_and_agent():
    index = VectorStoreIndex.from_vector_store(vector_store, embed_model=embed_model)
    query_engine = index.as_query_engine()

    # Define query engine tools
    query_engine_tools = [
        QueryEngineTool(
            query_engine=query_engine,
            metadata=ToolMetadata(
                name="Financial_model_analyst",
                description="You are the Financial Analysis Agent in a multi-agent system for fundamental company analysis. Your tasks include processing and validating financial data, calculating key financial ratios, and generating actionable insights."
            ),
        ),
        QueryEngineTool(
            query_engine=query_engine,
            metadata=ToolMetadata(
                name="business_model_engine",
                description="You are the Business Model Analysis Agent in a multi-agent system for fundamental company analysis. Your tasks include analyzing revenue streams, evaluating business strategy, and generating actionable insights."
            ),
        ),
    ]

    # Initialize the agent
    agent = ReActAgent.from_tools(query_engine_tools, llm=llm, verbose=True)
    return agent

agent = initialize_query_engine_and_agent()

def process_and_index_documents():
    directory_path = "D:\\Agentic-Rag Finance\\py\\uploaded_files"
    parsed_data = parse_all_documents_in_directory(directory_path)
    print(parsed_data)

    # if not parsed_data:
    #     print("No data to index.")
    #     return

    # Generate embeddings and add to vector store
    node_parser = MarkdownElementNodeParser(llm=llm, num_workers=8)
    nodes = node_parser.get_nodes_from_documents(parsed_data, progress=True)

    for node in nodes:
        node.embedding = embed_model.get_text_embedding(node.text)

    print("Adding documents to vector store...")
    vector_store.add(nodes)
    print("Documents added to vector store.")
   
# Flask app initialization
app = Flask(__name__)
CORS(app)

@app.route("/test", methods=["GET"])
def test():
    return "hello test"

@app.route("/api/chat", methods=["POST"])
def chat():
    print("Route hit for chat query.")
    user_query = request.json.get('message')
    print("User query: ", user_query)
    if not user_query:
        return jsonify({"error": "No query provided in the request."}), 400

    try:
        agent = initialize_query_engine_and_agent()
        response = agent.chat(user_query)
        print("Response: ", response)
        return jsonify({"response": str(response)}), 200
    except Exception as e:
        print(f"Error processing query: {e}")
        return jsonify({"error": f"Query handling failed: {str(e)}"}), 500

UPLOAD_FOLDER = "D:\\Agentic-Rag Finance\\py\\uploaded_files"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the upload directory exists

@app.route("/api/upload", methods=["POST"])
def upload():
    print("Upload route hit")
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request."}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file."}), 400

    if file:
        try:
            filename = secure_filename(file.filename)
            upload_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(upload_path)

            # Process and index the uploaded documents
            process_and_index_documents()
            
            return jsonify({"message": "File uploaded and processed successfully."}), 200
        except Exception as e:
            print(f"Error processing file: {e}")
            return jsonify({"error": "Internal server error while processing the file."}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)

