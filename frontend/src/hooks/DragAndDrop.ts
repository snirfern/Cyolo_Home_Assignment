import { useEffect } from 'react';

const DragAndDropHook = (
  dropRef: React.RefObject<HTMLDivElement>,
  handleDragOver: (e: any) => void,
  handleDrop: (e: any) => void
) => {
  useEffect(() => {
    const currentDrop = dropRef.current;
    if (currentDrop) {
      currentDrop.addEventListener('dragover', handleDragOver);
      currentDrop.addEventListener('drop', handleDrop);
    }

    return () => {
      if (currentDrop) {
        currentDrop.removeEventListener('dragover', handleDragOver);
        currentDrop.removeEventListener('drop', handleDrop);
      }
    };
  }, [dropRef, handleDragOver, handleDrop]);
};

export default DragAndDropHook;
