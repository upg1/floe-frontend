'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import DraftEditor from '../../components/DocumentEditor/DraftEditor';
import EditorSidebar from '../../components/DocumentEditor/EditorSidebar';
import { useGlobalContext } from '../../context/Providers';

const DocumentEditorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { globalState, saveDocument } = useGlobalContext();
  const [currentDocument, setCurrentDocument] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDocument = async () => {
      let docId = searchParams.get('id');

      if (!docId || !globalState.documentData.some(doc => doc.id.toString() === docId)) {
        docId = globalState.documentData.length > 0 ? globalState.documentData[0].id.toString() : 'document-1';
        router.replace(`/document-editor?id=${docId}`, undefined, { shallow: true });
      }

      const doc = globalState.documentData.find(doc => doc.id.toString() === docId) || {
        id: 'document-1',
        title: 'Untitled Document',
        content: JSON.stringify({ blocks: [], entityMap: {} })
      };

      setCurrentDocument(doc);

      try {
        const contentState = convertFromRaw(JSON.parse(doc.content));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error('Failed to parse document content:', error);
        setEditorState(EditorState.createEmpty());
      }

      setLoading(false);
    };

    initializeDocument();
  }, [searchParams, globalState.documentData, router]);

  const handleSaveDocument = (newEditorState) => {
    if (currentDocument) {
      const contentState = newEditorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
      const updatedDocument = { ...currentDocument, content: rawContent };
      saveDocument(updatedDocument);
    }
  };

  const handleSelectDocument = (doc) => {
    router.push(`/document-editor?id=${doc.id}`, undefined, { shallow: true });
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="document-editor-page">
      <EditorSidebar
        documents={globalState.documentData}
        onSelectDocument={handleSelectDocument}
        clauses={globalState.clauses} // Pass clauses from global state
      />
      <div className="editor-container">
        {currentDocument && (
          <DraftEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            onSave={handleSaveDocument}
            clauses={globalState.clauses} // Pass clauses to the editor
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditorPage;
