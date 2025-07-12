import { useState, FC, ReactNode } from "react";
import PaloAltoNetworkInterviewQuestion from "./PaloAltoNetworkInterviewQuestion.component";
import "./InterviewQuestions.style.css";

interface InterviewQuestion {
    id: number;
    company: string;
    type: string[];
    description: string;
    solutionSteps: string[];
    demo?: () => ReactNode;
}

const interviewQuestions: InterviewQuestion[] = [
    {
        id: 1,
        company: 'Palo Alto Network',
        type: ['Knowledge'],
        description: 'What is CORS and how to enable?',
        solutionSteps: ['Step 1: it is short for Cross-Origin Resource Sharing',
            'Step 2: Resource means assets fetched from server such as "API Data, Static Files, Images, etc.',
            "Step 3: Origin is an website identifier including protocol, domain and port, such as https://example.com:3000",
            "Step 4: CORS policy means a webpage loaded from origin A access resource from origin B, which is disabled by default",
            "Step 5: For example, a local webpage of origin 'https://localhost:3000' calling an web API in 'https://example.com/...'",
            "Step 6: To enable CORS, server need to be configured to send Access-Control-Allow-Origin header in its HTTP response",
            "Step 7: Specifically in django, we can modified the setting.py MIDDLEWARE, CORS_ALLOW_ALL_ORIGINS and CORS_ALLOWED_ORIGINS constants."
        ]
    },
    {
        id: 2,
        company: 'Palo Alto Network',
        type: ['Knowledge'],
        description: 'Explain what is webpack?',
        solutionSteps: ["Step 1: Webpack is a js bundler for JS application that compress the static files into a few files optimized for network and parsing",
        "Step 2: specifically, it bundle files to reduce network request number",
        "Step 3: it transpile ES6 features to older version to support transpiling",
        "Step 4: it minify size of static files for faster load",
        "Step 5: it split JS app into chunks to support ondemand load",
        "Step 6: Webpack is normally ran before a webpage is deployed, e.g. npm start is ran during development or CI/CD when PR is committed ",
        "Step 7: the webpack process is configurable in the webpack.config.js, which needed to be ejected in React Project."]
    },
    {
        id: 3,
        company: 'Recurrency',
        type: ['Behavioral'],
        description: 'Tell me about a time you faced a challenge and overcame it.',
        solutionSteps: ['Step 1: Describe the challenge', 'Step 2: Explain your actions', 'Step 3: Highlight the outcome']
    },
    {
        id: 4,
        company: 'Palo Alto Network',
        type: ['React'],
        description: "fetch salary data from the API and calculate average salary of each department." +
            " support department filter" +
            " support loading spinner",
        solutionSteps: ['Step 1: Identify states to control the app',
            'Step 2: fetch data from the API with useEffect and async',
            'Step 3: process the data ',
            'Step 4: Render with <ul> and <li>',
            'Step 5: add <input> to allow filter input'],
        demo: () => <PaloAltoNetworkInterviewQuestion/>
    },
];

const InterviewQuestions: FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<string>('All');
    const [selectedType, setSelectedType] = useState<string>('All');

    // Get unique companies and question types for dropdowns
    const companies = ['All', ...new Set(interviewQuestions.map((q) => q.company))];
    const types = ['All', ...new Set(interviewQuestions.flatMap((q) => q.type))];

    // Filter questions based on selected filters
    const filteredQuestions = interviewQuestions.filter((question) => {
        return (
            (selectedCompany === 'All' || question.company === selectedCompany) &&
            (selectedType === 'All' || question.type.includes(selectedType))
        );
    });

    return (
        <div className="interview-container">
            <h1 className="interview-header">Interview Questions</h1>
            
            <div className="filters-container">
                <div className="filter-group">
                    <label className="filter-label" htmlFor="companyFilter">
                        Filter by Company:
                    </label>
                    <select 
                        id="companyFilter" 
                        className="filter-select"
                        value={selectedCompany} 
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        {companies.map((company, index) => (
                            <option key={index} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="typeFilter">
                        Filter by Type:
                    </label>
                    <select 
                        id="typeFilter" 
                        className="filter-select"
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        {types.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredQuestions.map((question) => (
                <div key={question.id} className="question-card">
                    <h2 className="company-name">{question.company}</h2>
                    <div className="question-type">{question.type.join(', ')}</div>
                    <p className="question-description">{question.description}</p>
                    
                    <h3 className="solution-header">Solution Steps:</h3>
                    <ul className="solution-steps">
                        {question.solutionSteps.map((step, index) => (
                            <li key={index} className="solution-step">{step}</li>
                        ))}
                    </ul>
                    
                    {question.demo && question.demo()}
                </div>
            ))}
        </div>
    );
};

export default InterviewQuestions; 