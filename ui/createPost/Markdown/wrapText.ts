import { EditorView } from "@codemirror/view";

export function wrapText(
    view: EditorView,
    before: string,
    after = before,
){
    const { state, dispatch } = view;
    const { from, to } = state.selection.main;
    const selectedText = state.sliceDoc(from, to);
    dispatch(state.update({
        changes: {from, to, insert: `${before}${selectedText}${after}`},
        selection: {
            anchor: from + before.length,
            head: from + before.length + selectedText.length
        }
    }))
}