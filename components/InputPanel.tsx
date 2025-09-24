import React, { useState, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { Tone, ScriptLength, ScriptGenerationParams } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import UploadIcon from './icons/UploadIcon';
import FileTextIcon from './icons/FileTextIcon';
import XCircleIcon from './icons/XCircleIcon';

interface InputPanelProps {
  onGenerate: (params: ScriptGenerationParams) => void;
  isLoading: boolean;
}

// Helper to recursively find all text values ('a:t') in the parsed XML object
const extractTextFromNode = (node: any): string => {
  let text = '';
  if (!node) {
    return text;
  }

  // If the node is an 'a:t' element, return its text content
  if (node['a:t']) {
    // Content can be a string or an array of text parts
    if (Array.isArray(node['a:t'])) {
        return node['a:t'].map(t => t['#text'] || t).join('');
    }
    return node['a:t']['#text'] || node['a:t'] || '';
  }

  // If the node is an array, iterate over its items
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('');
  }

  // If the node is an object, iterate over its properties
  if (typeof node === 'object') {
    for (const key in node) {
      text += extractTextFromNode(node[key]);
    }
  }
  
  return text;
};


const CustomSelect = ({ label, value, onChange, options }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: { value: string, label: string }[] }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
);

const TONE_OPTIONS = [
    { value: Tone.FORMAL, label: Tone.FORMAL },
    { value: Tone.COLLOQUIAL, label: Tone.COLLOQUIAL },
    { value: Tone.CONCISE, label: Tone.CONCISE },
    { value: Tone.PASSIONATE, label: Tone.PASSIONATE },
];

const LENGTH_OPTIONS = [
    { value: ScriptLength.SHORT, label: ScriptLength.SHORT },
    { value: ScriptLength.MEDIUM, label: ScriptLength.MEDIUM },
    { value: ScriptLength.LONG, label: ScriptLength.LONG },
];

const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [slideContent, setSlideContent] = useState<string>('');
  const [intention, setIntention] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.FORMAL);
  const [length, setLength] = useState<ScriptLength>(ScriptLength.MEDIUM);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      setParseError('Please upload a valid .pptx file.');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFile(selectedFile);
    setIsParsing(true);
    setParseError(null);
    setSlideContent('');

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '',
          textNodeName: '#text',
          isArray: (name, jpath) => jpath === 'p:sld.cSld.spTree.sp' || jpath === 'p:sld.cSld.spTree.grpSp' || jpath.endsWith('.r'),
      });

      const slidePromises = [];
      for (const fileName in zip.files) {
          if (fileName.match(/^ppt\/slides\/slide\d+\.xml$/)) {
              slidePromises.push({
                  number: parseInt(fileName.match(/(\d+)/)![0], 10),
                  promise: zip.files[fileName].async('string')
              });
          }
      }

      if (slidePromises.length === 0) {
          throw new Error("No slides found in the PPTX file.");
      }
      
      slidePromises.sort((a, b) => a.number - b.number);
      const slideXmlContents = await Promise.all(slidePromises.map(p => p.promise));
      
      const allSlidesText = slideXmlContents.map((xmlContent, index) => {
        const jsonObj = parser.parse(xmlContent);
        const slideText = extractTextFromNode(jsonObj['p:sld']?.['p:cSld']?.['p:spTree']);
        return `Slide ${index + 1}:\n${slideText.replace(/\s+/g, ' ').trim()}`;
      }).join('\n\n---SLIDE BREAK---\n\n');

      if (!allSlidesText.trim()) {
        throw new Error("Could not extract any text from the presentation slides.");
      }
      
      setSlideContent(allSlidesText);
    } catch (error) {
      console.error('Error parsing PPTX file on client:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred during parsing.';
      setParseError(`Failed to process file: ${message}`);
      setFile(null);
      setSlideContent('');
    } finally {
      setIsParsing(false);
    }
  }, []);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        handleFileChange(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setSlideContent('');
    setParseError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    const params: ScriptGenerationParams = {
      slideContent,
      intention,
      tone,
      length,
    };
    onGenerate(params);
  };
  
  const isFormValid = !!slideContent && intention.trim() !== '' && !isParsing && !isLoading;

  return (
    <div className="w-full md:w-1/3 lg:w-2/5 p-6 bg-slate-800 border-r border-slate-700 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-6">입력 정보</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">1. PPTX 파일 업로드</label>
          {file ? (
            <div className="flex items-center justify-between bg-slate-700 p-3 rounded-md">
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileTextIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-white truncate">{file.name}</span>
              </div>
              <button type="button" onClick={removeFile} className="text-slate-400 hover:text-white flex-shrink-0 ml-2">
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-slate-700/50' : 'border-slate-600 hover:border-slate-500'}`}
            >
              <UploadIcon className="w-10 h-10 text-slate-500 mb-3" />
              <p className="text-slate-400 text-sm">여기에 파일을 드래그하거나 클릭하여 업로드</p>
              <p className="text-slate-500 text-xs mt-1">.pptx 파일만 지원됩니다</p>
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation" className="hidden" />
            </div>
          )}
          {isParsing && <p className="text-sm text-blue-400 mt-2">파일 처리 중...</p>}
          {parseError && <p className="text-sm text-red-400 mt-2">{parseError}</p>}
        </div>

        <div>
          <label htmlFor="intention" className="block text-sm font-medium text-slate-300 mb-2">2. 발표의 목적 또는 의도</label>
          <textarea
            id="intention"
            rows={4}
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="예: 이 발표를 통해 투자자들에게 우리 프로젝트의 비전과 잠재력을 설득하고 싶습니다."
          />
        </div>

        <CustomSelect
          label="3. 스크립트 톤앤매너"
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          options={TONE_OPTIONS}
        />

        <CustomSelect
          label="4. 슬라이드 당 스크립트 분량"
          value={length}
          onChange={(e) => setLength(e.target.value as ScriptLength)}
          options={LENGTH_OPTIONS}
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 transition-colors"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {isLoading ? '생성 중...' : '스크립트 생성하기'}
        </button>
      </form>
    </div>
  );
};

export default InputPanel;