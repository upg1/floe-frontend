import React, { useState } from 'react';
import { Editor, EditorState, Modifier, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { useGlobalContext } from '../../context/Providers'; // Adjust the import path if needed

const styleMap = {
  HIGHLIGHT: {
    backgroundColor: 'yellow',
  },
};

const DraftEditor = ({ editorState, onEditorStateChange, onSave, clauses }) => {
  const { fetchRelevantRegulations, globalState } = useGlobalContext(); // Get function from context
  const [highlightedText, setHighlightedText] = useState('');

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

  const handleAnalyze = async () => {
    // Fetch relevant regulations
    try {
      const fetchedRegulations = await fetchRelevantRegulations(highlightedText);
      console.log('Fetched Regulations:', fetchedRegulations);
    } catch (error) {
      console.error('Error fetching regulations:', error);
    }
  };

  const handleHighlight = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const blockKey = selection.getStartKey();
    const block = blockMap.get(blockKey);
    const text = block.getText();

    const normalizedText = normalizeText(text);
    const sentences = splitSentences(normalizedText);

    const startOffset = selection.getStartOffset();
    const endOffset = selection.getEndOffset();

    const selectedSentences = getSentencesInRange(sentences, startOffset, endOffset);
    const newContentState = applyHighlighting(contentState, selection, selectedSentences);

    const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
    onEditorStateChange(newEditorState);

    // Save the highlighted text to local state
    setHighlightedText(selectedSentences.join(' '));
  };

  function normalizeText(text) {
    return text.trim().replace(/\s+/g, ' ');
  }

  function splitSentences(text) {
    if (!text) return [];
    const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
    return sentences.filter(sentence => sentence.trim() !== '');
  }

  function getSentencesInRange(sentences, startOffset, endOffset) {
    let selectedSentences = [];
    let cumulativeOffset = 0;

    sentences.forEach(sentence => {
      const sentenceLength = sentence.length;
      const sentenceStart = cumulativeOffset;
      const sentenceEnd = cumulativeOffset + sentenceLength;

      if (sentenceEnd > startOffset && sentenceStart < endOffset) {
        selectedSentences.push(sentence);
      }

      cumulativeOffset += sentenceLength;
    });

    return selectedSentences;
  }

  function applyHighlighting(contentState, selection, sentences) {
    let newContentState = contentState;

    sentences.forEach(sentence => {
      contentState.getBlockMap().forEach((block, blockKey) => {
        const blockText = block.getText();
        const sentenceStart = blockText.indexOf(sentence);
        if (sentenceStart !== -1) {
          const sentenceEnd = sentenceStart + sentence.length;

          const selectionState = SelectionState.createEmpty(blockKey)
            .merge({
              anchorOffset: sentenceStart,
              focusOffset: sentenceEnd,
            });

          newContentState = Modifier.applyInlineStyle(newContentState, selectionState, 'HIGHLIGHT');
        }
      });
    });

    return newContentState;
  }

  return (
  <div className="editor-container bg-gray-100 border border-gray-200 rounded-lg p-4 relative">
    <div className="regulations-container mb-4">
      <h2 className="text-lg font-semibold mb-2">Relevant Regulations</h2>
      {globalState.regulations.length === 0 ? (
        <p>No regulations found.</p>
      ) : (
        <div className="regulations-list flex gap-4 overflow-x-auto">
          {globalState.regulations.map((regulation) => (
            <div key={regulation.id} className="regulation-card bg-white border border-gray-300 rounded-md p-3 w-80 h-44 shadow-md">
              <div className="regulation-card-title font-semibold mb-2">{regulation.title}</div>
              <div className="regulation-card-content">
                {regulation.text.length > 255 
                  ? regulation.text.substring(0, 255) + '...' 
                  : regulation.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="clause-grid mb-4 flex flex-wrap gap-4">
      {clauses.map(clause => (
        <div 
          key={clause.id} 
          onClick={() => handleClauseClick(clause)}
          className="clause-card bg-white border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100"
        >
          {clause.title}
        </div>
      ))}
    </div>
    <div className="editor-field bg-white border border-gray-300 rounded-md p-4 overflow-auto">
      <Editor
        editorState={editorState}
        onChange={onEditorStateChange}
        customStyleMap={styleMap}
        placeholder="Start typing..."
      />
    </div>
    <div className="editor-actions absolute bottom-4 right-4 flex gap-2">
      <button onClick={handleSave} className="btn-primary bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
        Save
      </button>
      <button onClick={handleAnalyze} className="btn-secondary bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600">
        Analyze Selection
      </button>
      <button onClick={handleHighlight} className="btn-highlight bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-600">
        Highlight Selection
      </button>
    </div>
  </div>
  );
}

export default DraftEditor;
