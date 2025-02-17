import FileOpenIcon from '@mui/icons-material/FileOpen';
import React, { useCallback, useRef } from 'react';
import { styled } from '@mui/material';
import { useAppContext } from '../../context';
import DragAndDropHook from '../../hooks/DragAndDrop';

const LoadedFileContainer = styled('div')({
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: 200,
});

const DropFilesRow = styled('div')({
  marginTop: 30,
});
const DragAndDropContainer = styled('div')({
  width: '200px',
  height: '200px',
  padding: '10px 30px',
  fontSize: '24px',
  color: '#555555',
  border: '2px dashed #c3c3c3',
  borderRadius: '5px',
});

interface DragAndDropProps {
  onFileUploadHandler: (metadata: File) => void;
  selectedFile: string;
}

const isImage = (file: File) => file.type.indexOf('image') > -1;
const DragAndDrop = ({
  onFileUploadHandler,
  selectedFile,
}: DragAndDropProps) => {
  const { uiStore } = useAppContext();

  const drop = useRef<HTMLDivElement | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, [fileInput]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0 && isImage(files[0])) {
        onFileUploadHandler(files[0]);
        return;
      }
      uiStore.setErrorAlert('Please upload only images!');
    },
      // eslint-disable-next-line
    [onFileUploadHandler]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const { files } = e.dataTransfer;
      if (files && files.length > 0 && isImage(files[0])) {
        onFileUploadHandler(files[0]);
        return;
      }
      uiStore.setErrorAlert('Please upload only images!');
    },
      // eslint-disable-next-line
    [onFileUploadHandler]
  );

  DragAndDropHook(drop, handleDragOver, handleDrop);

  return (
    <DragAndDropContainer ref={drop} onClick={handleClick}>
      <DropFilesRow>Drop files area</DropFilesRow>
      <DropFilesRow>
        <FileOpenIcon color={selectedFile ? 'primary' : 'inherit'} />
      </DropFilesRow>
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {selectedFile && (
        <DropFilesRow>
          <LoadedFileContainer>{selectedFile}</LoadedFileContainer>
        </DropFilesRow>
      )}
    </DragAndDropContainer>
  );
};
export default DragAndDrop;
