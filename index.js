// https://aistudiocdn.com/react@^19.1.1/jsx-runtime
import {
  jsx,
  jsxs
} from "https://aistudiocdn.com/react@^19.1.1/jsx-runtime";

// https://aistudiocdn.com/react@^19.1.1
import * as React from "https://aistudiocdn.com/react@^19.1.1";
import {
  useState,
  useCallback,
  useRef
} from "https://aistudiocdn.com/react@^19.1.1";

// https://aistudiocdn.com/react-dom@^19.1.1/client
import {
  createRoot
} from "https://aistudiocdn.com/react-dom@^19.1.1/client";

// https://esm.sh/jszip@3.10.1
import JSZip from "https://esm.sh/jszip@3.10.1";

// components/icons/SparklesIcon.tsx
var SparklesIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 00-1.423-1.423L13.125 18l1.188-.648a2.25 2.25 0 001.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 001.423 1.423L19.375 18l-1.188.648a2.25 2.25 0 00-1.423 1.423z" })
  }
);
var SparklesIcon_default = SparklesIcon;

// components/Header.tsx
var Header = () => {
  return /* @__PURE__ */ jsx("header", { className: "w-full p-4 border-b border-slate-700", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex items-center space-x-3", children: [
    /* @__PURE__ */ jsx(SparklesIcon_default, { className: "w-8 h-8 text-blue-400" }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "AI \uBC1C\uD45C \uC2A4\uD06C\uB9BD\uD2B8 \uC0DD\uC131\uAE30" }),
    /* @__PURE__ */ jsx("span", { className: "text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md", children: "v1.0" })
  ] }) });
};
var Header_default = Header;

// components/icons/UploadIcon.tsx
var UploadIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h18v-3.75M3 12.75v-3.75C3 6.649 5.649 4 9 4h6c3.351 0 6 2.649 6 6v3.75" })
  }
);
var UploadIcon_default = UploadIcon;

// components/icons/FileTextIcon.tsx
var FileTextIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })
  }
);
var FileTextIcon_default = FileTextIcon;

// components/icons/XCircleIcon.tsx
var XCircleIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
  }
);
var XCircleIcon_default = XCircleIcon;

// components/InputPanel.tsx
var OptionButton = ({ value, selectedValue, setSelectedValue, children }) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick: () => setSelectedValue(value),
    className: `px-3 py-2 text-sm rounded-md transition-colors duration-200 w-full text-left ${selectedValue === value ? "bg-blue-600 text-white shadow-md" : "bg-slate-700 hover:bg-slate-600 text-slate-300"}`,
    children
  }
);
var InputPanel = ({ onGenerate, isLoading }) => {
  const [slideContent, setSlideContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef(null);
  const [intention, setIntention] = useState("");
  const [tone, setTone] = useState("격식체 (Formal & Professional)" /* FORMAL */);
  const [length, setLength] = useState("중간 (3-4 sentences per slide)" /* MEDIUM */);
  const handleFile = async (file) => {
    const fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    if (file && (file.type === fileType || file.name.toLowerCase().endsWith(".pptx"))) {
      setUploadedFile(file);
      setIsParsing(true);
      setSlideContent("");
      try {
        const zip = await JSZip.loadAsync(file);
        const slideFiles = zip.filter((path) => path.startsWith("ppt/slides/slide") && path.endsWith(".xml"));
        slideFiles.sort((a, b) => {
          const numA = parseInt(a.name.match(/slide(\d+)\.xml/)[1], 10);
          const numB = parseInt(b.name.match(/slide(\d+)\.xml/)[1], 10);
          return numA - numB;
        });
        const parser = new DOMParser();
        const slideTextsPromises = slideFiles.map(async (slideFile) => {
          const slideXml = await slideFile.async("string");
          const xmlDoc = parser.parseFromString(slideXml, "application/xml");
          const textNodes = xmlDoc.getElementsByTagName("a:t");
          return Array.from(textNodes).map((node) => {
            var _a;
            return (_a = node.textContent) == null ? void 0 : _a.trim();
          }).join(" ").replace(/\s+/g, " ").trim();
        });
        const slideTexts = await Promise.all(slideTextsPromises);
        setSlideContent(slideTexts.join("\n\n---SLIDE BREAK---\n\n"));
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
      setSlideContent("");
    }
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  const removeFile = () => {
    setUploadedFile(null);
    setSlideContent("");
    setIsParsing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (slideContent && intention) {
      onGenerate({ slideContent, intention, tone, length });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/3 lg:w-2/5 p-6 bg-slate-800/50 border-r border-slate-700/50 flex-shrink-0", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 h-full flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col space-y-6 overflow-y-auto pr-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "file-upload", className: "block text-sm font-medium text-slate-300 mb-2", children: "1. \uBC1C\uD45C \uC790\uB8CC \uC5C5\uB85C\uB4DC (.pptx)" }),
        uploadedFile ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-slate-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 min-w-0", children: [
            isParsing ? /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-blue-400 flex-shrink-0", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }) : /* @__PURE__ */ jsx(FileTextIcon_default, { className: "w-6 h-6 text-blue-400 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate", title: uploadedFile.name, children: isParsing ? `'${uploadedFile.name}' \uBD84\uC11D \uC911...` : uploadedFile.name })
          ] }),
          !isParsing && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: removeFile,
              className: "p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors flex-shrink-0 ml-2",
              title: "Remove file",
              children: /* @__PURE__ */ jsx(XCircleIcon_default, { className: "w-5 h-5" })
            }
          )
        ] }) : /* @__PURE__ */ jsxs(
          "div",
          {
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: `relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-900/20" : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/50"}`,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  id: "file-upload",
                  ref: fileInputRef,
                  onChange: handleFileChange,
                  accept: ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6 text-center", children: [
                /* @__PURE__ */ jsx(UploadIcon_default, { className: "w-8 h-8 mb-3 text-slate-500" }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2 text-sm text-slate-400", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-400", children: "\uD074\uB9AD\uD558\uC5EC \uC5C5\uB85C\uB4DC" }),
                  "\uD558\uAC70\uB098 \uD30C\uC77C\uC744 \uB4DC\uB798\uADF8\uD558\uC138\uC694."
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "PPTX \uD504\uB808\uC820\uD14C\uC774\uC158 \uD30C\uC77C" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "intention", className: "block text-sm font-medium text-slate-300 mb-2", children: "2. \uAE30\uD68D \uC758\uB3C4 \uBC0F \uBAA9\uD45C" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "intention",
            value: intention,
            onChange: (e) => setIntention(e.target.value),
            rows: 3,
            className: "w-full bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
            placeholder: "예: 이 제안의 핵심 기술력을 강조하여 투자 유치를 이끌어내는 것이 목표입니다.",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "3. \uC2A4\uD06C\uB9BD\uD2B8 \uD1A4\uC564\uB9E4\uB108" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: Object.values("격식체 (Formal & Professional)" /* FORMAL */).map((t) => /* @__PURE__ */ jsx(OptionButton, { value: t, selectedValue: tone, setSelectedValue: setTone, children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "4. \uC2A4\uD06C\uB9BD\uD2B8 \uAE38\uC774" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: Object.values("짧게 (1-2 sentences per slide)" /* SHORT */).map((l) => /* @__PURE__ */ jsx(OptionButton, { value: l, selectedValue: length, setSelectedValue: setLength, children: l }, l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pt-4 border-t border-slate-700", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: isLoading || isParsing || !slideContent || !intention,
        className: "w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100",
        children: isLoading ? /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }),
          "\uC0DD\uC131 \uC911..."
        ] }) : /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsx(SparklesIcon_default, { className: "w-5 h-5 mr-2" }),
          "\uC2A4\uD06C\uB9BD\uD2B8 \uC0DD\uC131\uD558\uAE30"
        ] })
      }
    ) })
  ] }) });
};
var InputPanel_default = InputPanel;

// components/icons/ClipboardIcon.tsx
var ClipboardIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25H9A2.25 2.25 0 016.75 4.5v0a2.25 2.25 0 012.25-2.25h3.879a2.25 2.25 0 012.121.75l2.121 2.121A2.25 2.25 0 0118 8.25v3.375c0 .621-.504 1.125-1.125 1.125h-3.75a1.125 1.125 0 01-1.125-1.125V8.25a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25h-3.879z" }),
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 13.5H3.75A2.25 2.25 0 001.5 15.75v3.75c0 1.242 1.008 2.25 2.25 2.25h3.75c1.242 0 2.25-1.008 2.25-2.25V19.5m-3.75-3.75h3.75m-3.75 0V15m3.75 0v1.5m0 0v1.5m-3.75-3.75h3.75" })
    ]
  }
);
var ClipboardIcon_default = ClipboardIcon;

// components/icons/CheckIcon.tsx
var CheckIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" })
  }
);
var CheckIcon_default = CheckIcon;

// components/icons/ClockIcon.tsx
var ClockIcon = ({ className = "w-6 h-6" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className,
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" })
  }
);
var ClockIcon_default = ClockIcon;

// components/OutputPanel.tsx
var formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0)
    return "0\uCD08";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  let timeString = "";
  if (minutes > 0) {
    timeString += `${minutes}\uBD84 `;
  }
  if (remainingSeconds > 0 || minutes === 0) {
    timeString += `${remainingSeconds}\uCD08`;
  }
  return timeString.trim();
};
var SlideScriptCard = ({ slide }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(slide.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-lg p-5 relative transition-shadow hover:shadow-xl hover:shadow-blue-900/20", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-blue-400", children: [
          "Slide ",
          slide.slideNumber
        ] }),
        slide.estimatedSpeakingTime > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-slate-400 mt-1", children: [
          /* @__PURE__ */ jsx(ClockIcon_default, { className: "w-4 h-4 mr-1.5" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "\uC608\uC0C1 \uBC1C\uD45C \uC2DC\uAC04: ",
            formatTime(slide.estimatedSpeakingTime)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleCopy,
          className: "p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200 flex-shrink-0",
          title: "Copy script",
          children: copied ? /* @__PURE__ */ jsx(CheckIcon_default, { className: "w-5 h-5 text-green-400" }) : /* @__PURE__ */ jsx(ClipboardIcon_default, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-slate-300 whitespace-pre-wrap leading-relaxed", children: slide.script.split("\n\n").map((paragraph, index) => /* @__PURE__ */ jsx("p", { className: "mb-4 last:mb-0", children: paragraph }, index)) })
  ] });
};
var LoadingSkeleton = () => /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
  /* @__PURE__ */ jsx("div", { className: "bg-slate-800 border border-slate-700 rounded-lg p-5 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-around", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-slate-700 rounded w-20 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-slate-700 rounded w-16" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-slate-700 rounded w-24 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-slate-700 rounded w-20" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-lg p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 w-24 bg-slate-700 rounded mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 w-40 bg-slate-700 rounded" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-9 w-9 bg-slate-700 rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 mt-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-slate-700 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-slate-700 rounded w-5/6" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-slate-700 rounded w-3/4" })
    ] })
  ] }, i)) })
] });
var OutputPanel = ({ scripts, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return /* @__PURE__ */ jsx(LoadingSkeleton, {});
    }
    if (error) {
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-red-400 text-lg", children: "\u26A0\uFE0F \uC2A4\uD06C\uB9BD\uD2B8 \uC0DD\uC131 \uC2E4\uD328" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 mt-2", children: error })
      ] });
    }
    if (scripts && scripts.length > 0) {
      const totalSpeakingTime = scripts.reduce((total, slide) => total + (slide.estimatedSpeakingTime || 0), 0);
      return /* @__PURE__ */ jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-5 mb-6 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-around items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-1", children: "\uCD1D \uC2AC\uB77C\uC774\uB4DC" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: scripts.length })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-l border-slate-600 h-12" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-1", children: "\uCD1D \uC608\uC0C1 \uBC1C\uD45C \uC2DC\uAC04" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: formatTime(totalSpeakingTime) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: scripts.map(
          (slide) => /* @__PURE__ */ jsx(SlideScriptCard, { slide }, slide.slideNumber)
        ) })
      ] });
    }
    if (scripts) {
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg", children: "\uACB0\uACFC \uC5C6\uC74C" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 mt-2", children: "PPTX \uD30C\uC77C\uC5D0 \uD14D\uC2A4\uD2B8 \uB0B4\uC6A9\uC774 \uC5C6\uAC70\uB098 \uBD84\uC11D\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
      /* @__PURE__ */ jsx(SparklesIcon_default, { className: "w-16 h-16 text-slate-600 mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-300", children: "\uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 mt-2", children: "\uC67C\uCABD \uD328\uB110\uC5D0\uC11C \uC815\uBCF4\uB97C \uC785\uB825\uD558\uACE0 '\uC2A4\uD06C\uB9BD\uD2B8 \uC0DD\uC131\uD558\uAE30'\uB97C \uD074\uB9AD\uD558\uC138\uC694." })
    ] });
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full md:w-2/3 lg:w-3/5 p-6 h-full overflow-y-auto relative", children: renderContent() });
};
var OutputPanel_default = OutputPanel;

// services/geminiService.ts
var generateScript = async (params) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error generating script:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate script: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the script.");
  }
};

// App.tsx
var App = () => {
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleGenerateScript = useCallback(async (params) => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript(null);
    try {
      const result = await generateScript(params);
      setGeneratedScript(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen bg-slate-900 text-white font-sans", children: [
    /* @__PURE__ */ jsx(Header_default, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow flex flex-col md:flex-row overflow-hidden", children: [
      /* @__PURE__ */ jsx(InputPanel_default, { onGenerate: handleGenerateScript, isLoading }),
      /* @__PURE__ */ jsx(OutputPanel_default, { scripts: generatedScript, isLoading, error })
    ] })
  ] });
};
var App_default = App;

// index.tsx
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App_default, {}) })
);
