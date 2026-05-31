import React, { useState } from 'react';
import { api } from '../../services/Api'; // Sua instância do Axios
import { 
  Upload, FileText, AlertTriangle, CheckCircle, 
  Download, Info, Loader2, X 
} from 'lucide-react';

interface ImportacaoResumo {
  total: number;
  sucesso: number;
  erro: number;
  log_url?: string; // Link opcional para baixar o relatório de erros
}

export const ImportacaoColaboradoresPage: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resumo, setResumo] = useState<ImportacaoResumo | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        alert('Por favor, selecione apenas arquivos CSV.');
        return;
      }
      setArquivo(selectedFile);
      setResumo(null); // Limpa resumo anterior ao trocar arquivo
    }
  };

  const handleImportar = async () => {
    if (!arquivo) return;

    const formData = new FormData();
    formData.append('file', arquivo); // 'file' deve ser o nome esperado pelo Multer no Node.js

    try {
      setIsImporting(true);
      
      // Rota no seu Node.js: router.post('/usuarios/importar', upload.single('file'), ...)
      const { data } = await api.post<ImportacaoResumo>('/usuarios/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResumo(data);
      setArquivo(null); // Limpa o campo após sucesso
    } catch (error: any) {
      console.error("Erro na importação:", error);
      alert(error.response?.data?.message || "Erro crítico ao processar o arquivo CSV.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        setArquivo(file);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Importação de Colaboradores
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sincronize a estrutura organizacional do PostgreSQL via CSV.
          </p>
        </div>

        <a
          href="/modelos/modelo_importacao_cda.csv" // Caminho na pasta /public ou rota da API
          download
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
        >
          <Download size={16} />
          Baixar Modelo
        </a>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-[1.5rem] p-12 transition-all flex flex-col items-center text-center space-y-4 ${
            isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 bg-slate-50/30'
          }`}
        >
          {arquivo && (
            <button 
              onClick={() => setArquivo(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <X size={20} />
            </button>
          )}

          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-indigo-600">
            {isImporting ? <Loader2 size={28} className="animate-spin" /> : <Upload size={28} />}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-black text-slate-800">
              {arquivo ? arquivo.name : 'Arraste seu arquivo CSV aqui'}
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Colunas obrigatórias: matricula, nome, email, cargo, perfil e gestor_email.
            </p>
          </div>

          {!arquivo && (
            <label className="cursor-pointer">
              <span className="px-6 py-2 bg-white border border-slate-200 rounded-full text-[11px] font-black uppercase tracking-tight hover:shadow-md transition-all">
                Procurar Arquivo
              </span>
              <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-400">
            <Info size={16} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Formato aceito: .CSV (Delimitador: Vírgula ou Ponto e Vírgula)</span>
          </div>

          <button
            type="button"
            onClick={handleImportar}
            disabled={!arquivo || isImporting}
            className="px-8 py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-black hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30 shadow-lg shadow-slate-200 flex items-center gap-2"
          >
            {isImporting && <Loader2 size={18} className="animate-spin" />}
            {isImporting ? 'Enviando ao Servidor...' : 'Processar Importação'}
          </button>
        </div>
      </div>

      {resumo && (
        <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.15em] ml-2">
            Resultado do Processamento (Backend)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Processado</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-3xl font-black text-slate-900">{resumo.total}</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 shadow-sm text-emerald-700">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} />
                <p className="text-[10px] font-black uppercase">Sucesso</p>
              </div>
              <p className="text-3xl font-black">{resumo.sucesso}</p>
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 shadow-sm text-rose-700">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} />
                <p className="text-[10px] font-black uppercase">Erros de Validação</p>
              </div>
              <p className="text-3xl font-black">{resumo.erro}</p>
            </div>
          </div>

          {resumo.erro > 0 && (
            <div className="bg-white border border-rose-100 rounded-2xl p-4 flex items-center justify-between border-l-4 border-l-rose-500">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-rose-500" />
                <p className="text-xs font-bold text-slate-600">
                  {resumo.erro} colaboradores não puderam ser importados devido a duplicidade ou dados inválidos.
                </p>
              </div>
              <button className="text-[10px] font-black text-rose-600 uppercase hover:underline">
                Baixar Relatório de Falhas
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};