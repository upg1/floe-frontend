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
    <div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
      />
      <div>
        {clauses.map(clause => (
          <button key={clause.id} onClick={() => replaceClause(clause)}>
            Insert {clause.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DraftEditor;
