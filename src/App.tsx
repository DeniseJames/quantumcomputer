import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from '../src/components/NavBar/NavBarComponent';
import LoginComponent from './components/LogIn/LoginComponent';
import SearchResults from '../src/components/SearchResults/SearchResultsComponent';
import MachineLearningComponent from '../src/components/MachineLearning/MachineLearningComponent';
import WebDesignComponent from '../src/components/WebDesign/WebDesignComponent';
import TrainingComponent from '../src/components/Training/TrainingComponent';
import ContactComponent from '../src/components/Contact/ContactComponent';
import HomeComponent from './components/Home/HomeComponent';
import './App.css'; // Import your CSS file

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator.Provider>
      <Router>
        <NavbarComponent />
        <div className="content-wrapper"> {/* Add this wrapper */}
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/machine-learning" element={<MachineLearningComponent />} />
            <Route path="/web-design" element={<WebDesignComponent />} />
            <Route path="/training" element={<TrainingComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
          </Routes>


        </div>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
