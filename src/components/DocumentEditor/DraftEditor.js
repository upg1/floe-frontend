'use client';

import React from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import the editor styles

const DraftEditor = ({ editorState, onEditorStateChange, onSave, clauses }) => {
  const handleSave = () => {
    onSave(editorState);
  };

  const handleClauseClick = (clause) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity('CLAUSE', 'MUTABLE', { text: clause.text });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    
    const newContentState = Modifier.replaceText(
      contentStateWithEntity,
      selectionState,
      clause.text,
      null,
      entityKey
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    
    onEditorStateChange(newEditorState);
  };

  return (
    <div className="editor-container">
      <div className="clause-grid mb-4">
        {clauses.map(clause => (
          <button 
            key={clause.id} 
            onClick={() => handleClauseClick(clause)}
            className="clause-button"
          >
            {clause.title}
          </button>
        ))}
      </div>
      <Editor
        editorState={editorState}
        onChange={onEditorStateChange}
      />
      <button onClick={handleSave} className="btn-primary mt-4">
        Save
      </button>
    </div>
  );
};

export default DraftEditor;
