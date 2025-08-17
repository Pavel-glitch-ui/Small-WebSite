import { EditorState, EditorView } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { useState, useRef, useEffect, useMemo } from "react";
import { Toolbar } from "./Toolbar";
import { MDXPreview } from "./MarkDownPreview";
import { FaColumns} from "react-icons/fa";
import { motion } from "framer-motion";


export function MarkDownEditor({ defaultValue, triger = false }: { defaultValue?: string, triger?: boolean }){
    const refContainer = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [content, setContent] = useState(defaultValue || "");
    const [isDark, setDark] = useState(false);
    const [view, setView] = useState<EditorView | null>(null)
    const handleChange = () => { setDark(!isDark) }
   

    const defaultOptions = useMemo(() => [
      markdown({
      base: markdownLanguage,
      codeLanguages: languages,
      addKeymap: true,
      }),
      EditorView.updateListener.of((update) => {
        if(update.docChanged){
          setContent(update.state.doc.toString())
        }
      }),
    ], []);

    useEffect(() => {
      if(triger){
        setContent('')
        view?.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: '',
          }
        })
      }
    }, [triger])
    const marldownHightLight = HighlightStyle.define([
      {tag: tags.heading1, fontSize: "2em", fontWeight: "bold"},
      {tag: tags.heading2, fontSize: "1.8em", fontWeight: "bold"},
      {tag: tags.heading3, fontSize: "1.6em", fontWeight: "bold"}
    ])
    const themeOptions = useMemo(() =>  EditorView.theme({
            "&":{
              height: "100%",
            minHeight: "300px",
            backgroundColor: isDark ? "#1e2939" : "#fff",
            color: isDark ? "#f8f8f8" : "#333",
            border: "1px solid " + (isDark ? "none" : "none"),
            borderRadius: "8px",
            padding: "12px",
            fontSize: "16px",
            fontFamily: "'Fira Code', monospace",
            transitionProperty: "color, background-color, border-color, outline-color, text-decoration-color",
            transitionDuration: '1s'
            },
          ".cm-content": {
            whiteSpace: "pre-wrap", 
            wordBreak: "break-word",
            overflowWrap: "anywhere", 
            maxWidth: "100%", 
            caretColor: isDark ? "none" : "none",
            lineHeight: "1.6",
            transitionProperty: "color, background-color, border-color, outline-color, text-decoration-color",
            transitionDuration: '1000ms'
          },
          ".cm-gutters": {
            backgroundColor: isDark ? "#1e2939" : "#fff",
            color: isDark ? "#858585" : "#999",
            borderRight: "1px solid " + (isDark ? "none" : "none"),
            transitionProperty: "color, background-color, border-color, outline-color, text-decoration-color",
            transitionDuration: '1s'
          },
        ".cm-heading": { 
        fontFamily: "'Inter', sans-serif",
        lineHeight: "1.2",
        margin: "16px 0 8px 0"
      },
      ".cm-heading1": { fontSize: "2em" },
      ".cm-heading2": { fontSize: "1.5em" },
          })
    , [isDark]) 



    useEffect(() => {
        if(!refContainer.current) return;

        const editor = new EditorView({
            doc: content,
            extensions: [...defaultOptions, themeOptions, syntaxHighlighting(marldownHightLight)],
            parent: refContainer.current
        });

        setView(editor);
        
        return () => editor.destroy()
    },[defaultOptions]);

    useEffect(() => {
      if(!view) return;
      const newState = EditorState.create({
        doc: view.state.doc,
        extensions: [...defaultOptions, themeOptions]
      })
      view.setState(newState)
    }, [isDark, themeOptions, view])
    

    return (
       <div className="max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-lg">
  <div className="flex justify-between items-center mb-4">
    <button 
      aria-label={isDark ? "Светлая тема" : "Тёмная тема"} 
      onClick={handleChange}
      type="button"
      className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
    >
      {isDark ? (
        <span className="text-yellow-300 text-xl">🌙</span>
      ) : (
        <span className="text-gray-600 text-xl">🌞</span>
      )}
    </button>
    
    <Toolbar view={view} />
    
    <button 
      aria-label={open ? 'Закрыть превью' : 'Открыть превью'}
      type="button"
      onClick={() => setOpen(!open)}
      className={`p-2 rounded-full ${open ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'} hover:bg-gray-300 transition-colors`}
    >
      <FaColumns className="w-5 h-5" />
    </button>
  </div>

  <div className={`${open ? 'grid grid-cols-2 gap-4' : ''}`}>
    <div
      ref={refContainer} 
      aria-describedby="content-error"
      className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-1000 rounded-lg overflow-hidden ${open ? 'h-[70vh]' : 'h-[60vh]'} shadow-sm`}
    />
    <input type='hidden' value={content} name="content" className='overflow-hidden'/>
    
    {open && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 1 }}
        className={`${isDark ? ' bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-800' } transition-colors duration-1000 border rounded-lg shadow-sm h-[70vh] overflow-y-auto p-4`}
      >
        <div className={` transition-colors duration-1000 ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
        <MDXPreview MDXText={content}/>
        </div>
      </motion.div>
    )}
  </div> 

  <div className="text-xs text-gray-500 mt-4">
    <p>Поддерживаются стандартные Markdown синтаксисы и GFM (GitHub Flavored Markdown).</p>
  </div>
</div>
    )
}
