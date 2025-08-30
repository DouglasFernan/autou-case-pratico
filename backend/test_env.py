import os
from dotenv import load_dotenv

print("--- Iniciando teste de diagnóstico do .env ---")

# Tentamos carregar o arquivo .env do diretório atual
foi_carregado = load_dotenv()

if foi_carregado:
    print("✅ SUCESSO: O arquivo .env foi encontrado e lido.")
else:
    print("❌ FALHA: O arquivo .env NÃO foi encontrado no diretório atual.")
    print("   Verifique se o nome do arquivo é exatamente '.env' (com o ponto).")

# Agora, tentamos ler a variável específica
api_key = os.getenv("GOOGLE_API_KEY")

if api_key:
    print("✅ SUCESSO: A variável GOOGLE_API_KEY foi lida do ambiente!")
    # Mostramos apenas o início e o fim para confirmar, sem expor a chave
    print(f"   Valor parcial da chave: {api_key[:5]}...{api_key[-4:]}")
else:
    print("❌ FALHA: A variável GOOGLE_API_KEY NÃO foi encontrada no ambiente.")
    print("   Verifique se o nome da variável dentro do arquivo .env está correto.")

print("--- Teste de diagnóstico concluído ---")
