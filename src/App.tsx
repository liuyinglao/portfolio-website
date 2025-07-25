import { FC } from 'react';
import Home from "./routes/home.component";
import ProjectList from "./routes/projects.component";
import Navigation from "./routes/navigation.component";
import {Routes, Route} from "react-router-dom";
import Game from "./routes/game.component";
import ShareList from "./routes/sharelist.component";
import ReactDomFeatureList from "./reactdom/FeatureTable";
import Playground from "./playground/playground.component";
import InterviewQuestions from "./interviewQuestions/InterviewQuestions.component";

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="projects" element={<ProjectList/>}/>
                <Route path="game" element={<Game/>}/>
                <Route path="sharelist" element={<ShareList/>}/>
                <Route path="projects/reactdom" element={<ReactDomFeatureList/>}/>
                <Route path="projects/playground" element={<Playground/>}/>
                <Route path="projects/interview_questions" element={<InterviewQuestions/>}/>
            </Route>
        </Routes>
    );
}

export default App; 