from fastapi import UploadFile
from pypdf import PdfReader
import io


async def extract_text_from_file(file: UploadFile) -> str:
    """
    Extrai texto de um arquivo .txt ou .pdf.

    Args:
        file: O arquivo enviado via FastAPI.

    Returns:
        O texto extraído do arquivo.
    """
    try:
        content = await file.read()

        if file.content_type == "text/plain":
            return content.decode("utf-8")

        elif file.content_type == "application/pdf":
            text = ""
            # Usa um stream de bytes para ler o PDF sem salvar em disco
            pdf_reader = PdfReader(io.BytesIO(content))
            for page in pdf_reader.pages:
                text += page.extract_text() or ""
            return text

        else:
            raise ValueError("Formato de arquivo não suportado.")

    except Exception as e:
        print(f"Erro ao processar o arquivo: {e}")
        raise ValueError(
            f"Não foi possível processar o arquivo {file.filename}.")
