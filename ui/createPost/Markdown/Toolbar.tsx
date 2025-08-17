import { wrapText } from "./wrapText";
import { EditorView } from "@codemirror/view";
import { MdFormatItalic } from "react-icons/md";
import { RxFontBold } from "react-icons/rx";
import { FaCode } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";

interface ToolbarProps{
    view: EditorView | null;
}

export function Toolbar({ view }: ToolbarProps){
    if(!view) return null;
    return (
    <div className="toolbar mb-2 flex gap-2 justify-between">
      <button type="button" onClick={() => wrapText(view, '**')} title="Жирный">
        <RxFontBold  className="w-5 h-5"/>
      </button>
      <button type="button" onClick={() => wrapText(view, '*')} title="Курсив">
        <MdFormatItalic className="w-5 h-5"/>
      </button>
      <button type="button" onClick={() => wrapText(view, '`')} title="Код">
        <FaCode className="w-5 h-5"/>
      </button>
      <button type="button" onClick={() => wrapText(view, '- ', '')} title="Список">
        <CiBoxList className="w-5 h-5"/>
      </button>
    </div>
  );
}