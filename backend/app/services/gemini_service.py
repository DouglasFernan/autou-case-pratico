import os
import google.generativeai as genai
import json
import re
from google.generativeai.types import HarmCategory, HarmBlockThreshold

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

PROMPT = """Você é um assistente de IA cuja principal tarefa é classificar emails.  
Sua resposta deve ser **APENAS um JSON válido**, sem texto extra, com exatamente estas três chaves:  

- "classificacao" → "PRODUTIVO" ou "IMPRODUTIVO"  
- "justificativa" → frase curta explicando a classificação  
- "sugestao_resposta" →  
   - Se IMPRODUTIVO: sempre "Nenhuma ação necessária."  
   - Se PRODUTIVO: uma resposta profissional contendo:  
        - Saudação ("Olá,")  
        - Corpo da mensagem explicando a ação  
        - Despedida obrigatória: "Atenciosamente,\\nEquipe AutoU"  

⚠️ Se houver qualquer dúvida, classifique como "IMPRODUTIVO".  

Exemplo IMPRODUTIVO:  
Input: "Obrigado a todos pelo ótimo trabalho!"  
Output: {{ "classificacao": "IMPRODUTIVO", "justificativa": "Apenas agradecimento, não exige ação.", "sugestao_resposta": "Nenhuma ação necessária." }}  

Exemplo PRODUTIVO:  
Input: "Olá, não consigo acessar meu painel desde ontem."  
Output: {{ "classificacao": "PRODUTIVO", "justificativa": "Solicitação de suporte técnico exige ação.", "sugestao_resposta": "Olá,\\n\\nAgradecemos por nos informar sobre o problema. Nossa equipe técnica já está verificando a situação e retornaremos o contato assim que tivermos uma atualização.\\n\\nAtenciosamente,\\nEquipe AutoU" }}  

Agora, analise o seguinte email e retorne APENAS o JSON:  
---  
{email_text}  
---  
"""


def clean_and_parse_json(raw_text: str) -> dict:
    """
    Limpa uma string que pode conter um JSON dentro de um bloco de código markdown
    e a converte para um dicionário Python.
    """
    match = re.search(r"\{.*\}", raw_text, re.DOTALL)
    if match:
        json_str = match.group(0)
        return json.loads(json_str)
    else:
        raise ValueError("Nenhum JSON válido encontrado na resposta da IA.")


def analyse_email_content(text: str) -> dict:
    """
    Analisa o conteúdo de um email usando a API Gemini.
    """
    if not text or not text.strip():
        return {"error": "O conteúdo do email não pode estar vazio."}

    safety_settings = {
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

        response = model.generate_content(
            PROMPT.format(email_text=text),
            safety_settings=safety_settings
        )

        if not response.parts:
            block_reason = "Unknown"
            try:
                block_reason = response.prompt_feedback.block_reason
            except Exception:
                pass
            print(f"A resposta da IA foi bloqueada. Motivo: {block_reason}")
            return {"error": f"A análise foi bloqueada pela IA por segurança. Motivo: {block_reason}"}

        analysis = clean_and_parse_json(response.text)
        return analysis

    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")
        print(f"Tipo do erro: {type(e)}")
        return {"error": "Ocorreu um erro inesperado durante a comunicação com a IA."}
