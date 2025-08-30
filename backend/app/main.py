from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from app.utils.file_processor import extract_text_from_file
from app.services.gemini_service import analyse_email_content
import os
from pathlib import Path
from dotenv import load_dotenv


current_dir = Path(__file__).resolve().parent
env_path = current_dir.parent / ".env"
load_dotenv(dotenv_path=env_path)


# Inicialização da aplicação FastAPI
app = FastAPI(
    title="AutoU Email Classifier API",
    description="API para classificar emails e sugerir respostas usando IA.",
    version="1.0.0"
)

# Configuração do CORS para permitir a comunicação com o frontend
origins = [
    "http://localhost:3000",
    "https://autou-frontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Definição do endpoint principal da API
@app.post("/process-email")
async def process_email_endpoint(
    text: str = Form(None),
    file: UploadFile = File(None)
):
    """
    Recebe um email (seja como texto ou arquivo), processa-o e retorna a análise da IA 
    junto com o texto original extraído.
    """
    if not text and not file:
        raise HTTPException(
            status_code=400,
            detail="Nenhum conteúdo fornecido. Por favor, envie um texto ou um arquivo."
        )

    email_content = ""
    try:
        if file:
            email_content = await extract_text_from_file(file)
        elif text:
            email_content = text

        if not email_content.strip():
            raise HTTPException(
                status_code=400, detail="O conteúdo do email está vazio ou o arquivo não pôde ser lido.")

        # Chama o serviço de IA para obter a análise
        analysis_result = analyse_email_content(email_content)

        # Verifica se a análise retornou um erro
        if "error" in analysis_result:
            raise HTTPException(
                status_code=500, detail=analysis_result["error"])

        # Monta a resposta final para o frontend
        final_response = {
            **analysis_result,
            "texto_original": email_content
        }

        return final_response

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Erro interno no servidor: {e}")
        raise HTTPException(
            status_code=500, detail="Ocorreu um erro inesperado no servidor.")
