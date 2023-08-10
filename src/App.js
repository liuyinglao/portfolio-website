import Home from "./routes/home.component";
import ProjectList from './routes/projects.component'
import Navigation from "./routes/navigation.component";
import { Routes, Route } from "react-router-dom";
import Game from "./routes/game.component";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<ProjectList />} />
        <Route path='game' element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
