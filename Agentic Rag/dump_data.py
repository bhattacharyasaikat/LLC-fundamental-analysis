from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
import chromadb
import nest_asyncio
from llama_index.core.readers.json import JSONReader

from llama_index.core import Settings
from llama_index.embeddings.cohere import CohereEmbedding
from llama_index.llms.cohere import Cohere
nest_asyncio.apply()


def load_and_index_json(directory_path):
    reader = JSONReader(
        levels_back=0,             # Set levels back as needed
        collapse_length=None,      # Set collapse length as needed
        ensure_ascii=False,        # ASCII encoding option
        is_jsonl=False,            # Set if input is JSON Lines format
        clean_json=True            # Clean up formatting-only lines
    )

    # Find all JSON files in the specified directory
#    json_files = glob.glob(os.path.join(directory_path, "*.json"))

    # Load the data from each JSON file
    # documents = []
    # for json_file in json_files:
        # documents.extend(reader.load_data(input_file=json_file, extra_info={}))
    documents = reader.load_data(input_file=directory_path, extra_info={})
    return documents

print("34")

embed_model = CohereEmbedding(
    api_key= "cRBbUKMSZgLZsk4aGr9PeggZZWVZDQHmWz5Z56dn",
    model_name="embed-english-v3.0",
    input_type="search_document",
)
Settings.embed_model = embed_model

llm = Cohere(api_key="cRBbUKMSZgLZsk4aGr9PeggZZWVZDQHmWz5Z56dn",
                      model="command-r-plus")
Settings.embed_model = embed_model
Settings.llm = llm
print("45")

from llama_index.core import VectorStoreIndex

from llama_index.vector_stores.chroma import ChromaVectorStore
import chromadb

print("52")
chroma_client = chromadb.EphemeralClient()
chroma_collection = chroma_client.create_collection("quickstart-z2")


# load documents
path = "company_data_META.json"
documents = load_and_index_json(path)
print("66 : documents loaded")

print(documents)
print("-------------------------------------")
# set up ChromaVectorStore and load in data
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

print("line 72")
# index = VectorStoreIndex.from_documents(
#     documents, storage_context=storage_context, embed_model=embed_model
# )
print("done")
# query_engine = index.as_query_engine()
# response = query_engine.query("What is the data about")
# print(response)
# save to disk
db = chromadb.PersistentClient(path="./data/chroma_db")
chroma_collection = db.get_or_create_collection("quickstart-z2")
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context, embed_model=embed_model
)

print("done")



# Check if the collection contains any data
document_count = chroma_collection.count()

if document_count > 0:
    print(f"The collection contains {document_count} documents.")
else:
    print("The collection is empty.")
