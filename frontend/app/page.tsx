"use client";

import { useState } from "react";
import EmailForm from "./components/EmailForm";
import ResultDisplay from "./components/ResultDisplay";
import axios from "axios";

export interface AnalysisResult {
  classificacao: "PRODUTIVO" | "IMPRODUTIVO";
  justificativa: string;
  sugestao_resposta: string;
  texto_original?: string;
}

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleAnalyse = async (text: string, file: File | null) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setSubmittedEmail(null);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("text", text);
    }

    try {
      // CORREÇÃO: URL corrigida de 1227.0.0.1 para 127.0.0.1
      const response = await axios.post<AnalysisResult>(
        "http://127.0.0.1:8000/process-email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
      setSubmittedEmail(response.data.texto_original || null);
    } catch (err) {
      setError(
        "Ocorreu um erro ao analisar o email. Verifique o arquivo ou tente novamente."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-gray-50 text-gray-800">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            AutoU Email Classifier
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Cole um email, envie um arquivo (.txt ou .pdf) e deixe a IA
            classificar e sugerir uma resposta.
          </p>
        </header>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <EmailForm onAnalyse={handleAnalyse} isLoading={isLoading} />
        </div>

        <div className="mt-8">
          <ResultDisplay
            result={result}
            isLoading={isLoading}
            error={error}
            submittedEmail={submittedEmail}
          />
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>Esta é uma demonstração para o Case Prático da AutoU.</p>
          <p>
            A solução completa se integraria diretamente à sua caixa de entrada
            para análise em massa.
          </p>
        </footer>
      </div>
    </main>
  );
}
