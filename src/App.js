import Home from "./routes/home.component";
import ProjectList from './routes/projects.component'
import Navigation from "./routes/navigation.component";
import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<ProjectList/>}/>
      </Route>
    </Routes>
  );
}

export default App;
