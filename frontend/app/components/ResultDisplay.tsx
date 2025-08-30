"use client";

import { useState, useEffect } from "react";
import { AnalysisResult } from "../page";
import { Copy, Check, Eye, EyeOff } from "lucide-react";

interface ResultDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  submittedEmail: string | null;
}

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
      <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
    </div>
    <div className="h-20 bg-gray-200 rounded-md w-full"></div>
  </div>
);

export default function ResultDisplay({
  result,
  isLoading,
  error,
  submittedEmail,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowEmail(false);
    }
  }, [isLoading]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center text-gray-500">
        O resultado da análise aparecerá aqui.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.sugestao_resposta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isProductive = result.classificacao === "PRODUTIVO";

  // Condição para desabilitar o botão de cópia
  const isCopyDisabled =
    result.sugestao_resposta === "Nenhuma ação necessária.";

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase">
          Classificação
        </h2>
        <span
          className={`px-3 py-1 text-lg font-bold rounded-full inline-block mt-1 ${
            isProductive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {result.classificacao}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          Justificativa
        </h3>
        <p className="mt-1 text-gray-700">{result.justificativa}</p>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">
            Sugestão de Resposta
          </h3>
          {/* BOTÃO DE COPIAR COM A LÓGICA DE DESABILITAR */}
          <button
            onClick={handleCopy}
            disabled={isCopyDisabled}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:text-gray-400"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1" /> Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" /> Copiar
              </>
            )}
          </button>
        </div>
        <p className="mt-1 p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-800 whitespace-pre-wrap">
          {result.sugestao_resposta}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowEmail(!showEmail)}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
        >
          {showEmail ? (
            <EyeOff className="w-4 h-4 mr-2" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          )}
          {showEmail ? "Ocultar Email Enviado" : "Ver Email Enviado"}
        </button>

        {showEmail && submittedEmail && (
          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 whitespace-pre-wrap">
            {submittedEmail}
          </div>
        )}
      </div>
    </div>
  );
}
