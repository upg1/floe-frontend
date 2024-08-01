'use client';

import React from 'react';
import { Editor, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor = ({ editorState, onEditorStateChange, onSave, clauses = [] }) => {
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
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
    onEditorStateChange(newEditorState);
  };

  const handleSaveClick = () => {
    onSave(editorState);
  };

  return (
    <div className="editor">
      <div className="editor-content">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onEditorStateChange}
        />
      </div>
      <div className="clause-buttons mt-4">
        {clauses.map(clause => (
          <button
            key={clause.id}
            onClick={() => replaceClause(clause)}
            className="btn btn-primary w-full mb-2"
          >
            Insert {clause.title}
          </button>
        ))}
      </div>
      <button onClick={handleSaveClick} className="btn btn-primary save-button">
        Save Document
      </button>
    </div>
  );
};

export default DraftEditor;