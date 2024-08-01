'use client'
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
    router.replace(`/document-editor?id=${doc.id}`, undefined, { shallow: true });
  };

  return (
    <div className="document-editor-page flex">
      <EditorSidebar
        documents={globalState.documentData}
        onSelectDocument={handleSelectDocument}
      />
      <div className="editor-container flex-1 p-4">
        {currentDocument && (
          <DraftEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            onSave={handleSaveDocument}
            clauses={globalState.clauses}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditorPage;
