import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { Tone, ScriptLength, ScriptGenerationParams } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import UploadIcon from './icons/UploadIcon';
import FileTextIcon from './icons/FileTextIcon';
import XCircleIcon from './icons/XCircleIcon';

interface InputPanelProps {
  onGenerate: (params: ScriptGenerationParams) => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading }) => {
  const [slideContent, setSlideContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [intention, setIntention] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.FORMAL);
  const [length, setLength] = useState<ScriptLength>(ScriptLength.MEDIUM);

  const handleFile = async (file: File) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    if (file && (file.type === fileType || file.name.toLowerCase().endsWith('.pptx'))) {
      setUploadedFile(file);
      setIsParsing(true);
      setSlideContent('');

      try {
        const zip = await JSZip.loadAsync(file);
        const slideFiles = zip.filter((path) => path.startsWith("ppt/slides/slide") && path.endsWith(".xml"));

        slideFiles.sort((a, b) => {
            const numA = parseInt(a.name.match(/slide(\d+)\.xml/)![1], 10);
            const numB = parseInt(b.name.match(/slide(\d+)\.xml/)![1], 10);
            return numA - numB;
        });

        const parser = new DOMParser();
        const slideTextsPromises = slideFiles.map(async (slideFile) => {
            const slideXml = await slideFile.async("string");
            const xmlDoc = parser.parseFromString(slideXml, "application/xml");
            const textNodes = xmlDoc.getElementsByTagName("a:t");
            return Array.from(textNodes).map(node => node.textContent?.trim()).join(' ').replace(/\s+/g, ' ').trim();
        });
        
        const slideTexts = await Promise.all(slideTextsPromises);
        setSlideContent(slideTexts.join('\n\n---SLIDE BREAK---\n\n'));

      } catch (error) {
        console.error("Error parsing PPTX file:", error);
        alert("PPTX 파일을 분석하는 중 오류가 발생했습니다. 파일이 손상되지 않았는지 확인해주세요.");
        removeFile();
      } finally {
        setIsParsing(false);
      }
    } else {
      alert("오류: .pptx 파일만 업로드할 수 있습니다.");
      setUploadedFile(null);
      setSlideContent('');
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setSlideContent('');
    setIsParsing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slideContent && intention) {
      onGenerate({ slideContent, intention, tone, length });
    }
  };

  const OptionButton = <T,>({ value, selectedValue, setSelectedValue, children }: { value: T, selectedValue: T, setSelectedValue: (value: T) => void, children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => setSelectedValue(value)}
      className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 w-full text-left ${
        selectedValue === value
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full md:w-1/3 lg:w-2/5 p-6 bg-slate-800/50 border-r border-slate-700/50 flex-shrink-0">
      <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
        <div className="flex-grow flex flex-col space-y-6 overflow-y-auto pr-2">
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-slate-300 mb-2">
              1. 발표 자료 업로드 (.pptx)
            </label>
            {uploadedFile ? (
              <div className="flex items-center justify-between bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-slate-200">
                <div className="flex items-center space-x-3 min-w-0">
                  {isParsing ? (
                    <svg className="animate-spin h-5 w-5 text-blue-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FileTextIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium truncate" title={uploadedFile.name}>
                    {isParsing ? `'${uploadedFile.name}' 분석 중...` : uploadedFile.name}
                  </span>
                </div>
                {!isParsing && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors flex-shrink-0 ml-2"
                    title="Remove file"
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            ) : (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-900/20' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <UploadIcon className="w-8 h-8 mb-3 text-slate-500" />
                  <p className="mb-2 text-sm text-slate-400">
                    <span className="font-semibold text-blue-400">클릭하여 업로드</span>하거나 파일을 드래그하세요.
                  </p>
                  <p className="text-xs text-slate-500">
                    PPTX 프레젠테이션 파일
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="intention" className="block text-sm font-medium text-slate-300 mb-2">
              2. 기획 의도 및 목표
            </label>
            <textarea
              id="intention"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              rows={3}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="예: 이 제안의 핵심 기술력을 강조하여 투자 유치를 이끌어내는 것이 목표입니다."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">3. 스크립트 톤앤매너</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.values(Tone).map((t) => (
                <OptionButton key={t} value={t} selectedValue={tone} setSelectedValue={setTone}>
                  {t}
                </OptionButton>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">4. 스크립트 길이</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.values(ScriptLength).map((l) => (
                <OptionButton key={l} value={l} selectedValue={length} setSelectedValue={setLength}>
                  {l}
                </OptionButton>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 pt-4 border-t border-slate-700">
            <button
              type="submit"
              disabled={isLoading || isParsing || !slideContent || !intention}
              className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  생성 중...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  스크립트 생성하기
                </>
              )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default InputPanel;