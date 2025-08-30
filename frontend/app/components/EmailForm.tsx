"use client";

import { useState } from "react";
import { Upload, Send } from "lucide-react";

interface EmailFormProps {
  onAnalyse: (text: string, file: File | null) => void;
  isLoading: boolean;
}

export default function EmailForm({ onAnalyse, isLoading }: EmailFormProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setText("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!text && !file) {
      alert("Por favor, insira um texto ou selecione um arquivo.");
      return;
    }
    onAnalyse(text, file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email-text"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cole o conteúdo do email aqui:
        </label>
        <textarea
          id="email-text"
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Prezado(a), gostaria de saber o status do meu pedido..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setFile(null);
            setFileName("");
          }}
          disabled={isLoading}
        />
      </div>

      <div className="relative flex items-center justify-center border-t border-gray-200">
        <span className="absolute px-3 bg-white text-sm text-gray-500">
          - OU -
        </span>
      </div>

      <div>
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md"
        >
          <Upload className="w-6 h-6 mr-2" />
          <span>{fileName || "Selecione um arquivo (.txt, .pdf)"}</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept=".txt,.pdf"
            disabled={isLoading}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || (!text && !file)}
        className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
          isLoading || (!text && !file)
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analisando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Analisar Email
          </>
        )}
      </button>
    </form>
  );
}
