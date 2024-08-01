'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import DraftEditor from '../../components/DocumentEditor/DraftEditor';
import EditorSidebar from '../../components/DocumentEditor/EditorSidebar';
import { useGlobalContext } from '../../context/Providers';

const DocumentEditorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to get the query params
  const { globalState, saveDocument } = useGlobalContext();
  const [currentDocument, setCurrentDocument] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const initializeDocument = () => {
      const docId = searchParams.get('id') || (globalState.documentData[0] && globalState.documentData[0].id.toString()) || 'document-1';
      console.log('docId from searchParams:', docId);

      const foundDocument = globalState.documentData.find(doc => doc.id.toString() === docId);
      console.log('Found document:', foundDocument);

      if (foundDocument) {
        setCurrentDocument(foundDocument);
        try {
          const contentState = convertFromRaw(JSON.parse(foundDocument.content));
          setEditorState(EditorState.createWithContent(contentState));
        } catch (error) {
          console.error('Failed to parse document content:', error);
          setEditorState(EditorState.createEmpty());
        }
      } else {
        router.replace(`/document-editor?id=document-1`, undefined, { shallow: true });
      }
    };

    initializeDocument();
  }, [searchParams, globalState.documentData, router]);

  const handleSaveDocument = () => {
    if (currentDocument) {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
      const updatedDocument = { ...currentDocument, content: rawContent };
      saveDocument(updatedDocument);
      setCurrentDocument(updatedDocument); // Update currentDocument with the latest content
    }
  };

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSelectDocument = (doc) => {
    router.replace(`/document-editor?id=${doc.id}`, undefined, { shallow: true });
  };



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
            onEditorStateChange={handleEditorStateChange}
            onSave={handleSaveDocument}
            clauses={globalState.clauses} // Pass clauses to the editor
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditorPage;
