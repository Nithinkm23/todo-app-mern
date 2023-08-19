import { Route, Routes } from 'react-router-dom';
import './App.css';
import ToDoHome from './components/ToDoHome';
import ToDoAdd from './components/ToDoAdd';
import Main from './components/Main';

function App() {
  return (
    <div className="App">

      <Routes>
       <Route path="/" element={<Main child={<ToDoHome />} />} />
        <Route path="/todoadd" element={<Main child={<ToDoAdd method="post" data={
          {
            
            eventname: "",
            status: "",
            
          }
        } />} />} />
        </Routes>
    </div>
  );
}

export default App;
