import { observer } from 'mobx-react-lite';
import React from 'react';
import { useAppContext } from '../../context';
import FileModal from './FileModal';
import { ModalType } from '../../store/modalStore';

const ModalsManager = observer(() => {
  const { fileStore, modalStore } = useAppContext();
  const { selectedModal } = modalStore;
  return (
    <>
      {selectedModal === ModalType.NewFileCreationModal && (
        <FileModal
          toggle={() => modalStore.setModal(null)}
          newFileUrl={fileStore.getNewFileLink()}
        />
      )}
    </>
  );
});

export default ModalsManager;
