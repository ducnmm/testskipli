import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneNumberForm from './PhoneNumberForm';
import AccessCodeForm from './AccessCodeForm';
import Main from './components/Main';
import FacebookPost from './components/FacebookPost';
import GetInspired from './components/GetInspired';
import StartFromScratch from './components/StartFromScratch';
import InstagramPost from './components/InstagramPost';
import TwitterPost from './components/TwitterPost';
import GeneratedIdeas from './components/GeneratedIdeas';
import IdeaDetail from './components/IdeaDetail';
import SavedContent from './components/SavedContent';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/phone-form" element={<PhoneNumberForm />} />
        <Route path="/verify-code" element={<AccessCodeForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/facebook-post" element={<FacebookPost />} />
        <Route path="/twitter-post" element={<TwitterPost />} />
        <Route path="/instagram-post" element={<InstagramPost />} />
        <Route path="/get-inspired" element={<GetInspired />} />
        <Route path="/start-from-scratch" element={<StartFromScratch />} />
        <Route path="/ideas" element={<GeneratedIdeas />} />
        <Route path="/ideas" element={<GeneratedIdeas />} />
        <Route path="/idea/:ideaId" element={<IdeaDetail />} />
        <Route path="/profile" element={<SavedContent />} />

      </Routes>
    </Router>
  );
};

export default App;