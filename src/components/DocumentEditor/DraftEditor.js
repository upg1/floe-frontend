import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor = ({ clauses }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onChange = (newState) => {
    setEditorState(newState);
  };

  const replaceClause = (clause) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.replaceText(
      contentState,
      selection,
      clause.text
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    setEditorState(newEditorState);
  };

  return (
    <div className="flex-1 p-4">
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
      />
      <div>
        {clauses.map(clause => (
          <button
            key={clause.id}
            onClick={() => replaceClause(clause)}
            className="px-4 py-2 mt-2 text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Insert {clause.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DraftEditor;
