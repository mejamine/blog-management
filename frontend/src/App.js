
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Blog from './components/Blog';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blog/>}/>
          <Route path="/cretae" element={<CreatePost/>}/>
          <Route path="/update/:id" element={<UpdatePost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
