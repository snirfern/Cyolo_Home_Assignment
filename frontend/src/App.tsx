import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import ModalsManager from './views/modal/ModalManager';
import { useAppContext } from './context';
import { CustomAlert } from './components/CustomAlert/CustomAlert';
import FileCard from './views/fileCard/FileCard';

const App = observer(() => {
  const { uiStore } = useAppContext();

  return (
    <div className="App">
      <FileCard />
      <ModalsManager />
      {uiStore.alert && <CustomAlert />}
    </div>
  );
});

export default App;
