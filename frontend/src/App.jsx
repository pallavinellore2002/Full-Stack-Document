import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import DocumentationHub from "./pages/DocumentationHub";
import JavaScriptDoc from "./pages/JavaScriptDoc";
import TypeScriptDoc from "./pages/TypeScriptDoc";
import NodeJSDoc from "./pages/NodeJSDoc";
import ExpressDoc from "./pages/ExpressDoc";
import PostgreSQLDoc from "./pages/PostgreSQLDoc";
import MongoDBDoc from "./pages/MongoDBDoc";
import RedisDoc from "./pages/RedisDoc";
import VercelDoc from "./pages/VercelDoc";
import NetlifyDoc from "./pages/NetlifyDoc";
import DockerDoc from "./pages/DockerDoc";
import PostmanDoc from "./pages/PostmanDoc";
import GitBasicsDoc from "./pages/GitBasicsDoc";
import GitHubActionsDoc from "./pages/GitHubActionsDoc";
import HTMLDoc from "./pages/HTMLDoc";
import CSSDoc from "./pages/CSSDoc";
import ReactDoc from "./pages/ReactDoc";
import PythonDoc from "./pages/PythonDoc";
import DjangoDoc from "./pages/DjangoDoc";
import FastAPIDoc from "./pages/FastAPIDoc";
import SQLiteDoc from "./pages/SQLiteDoc";
import MySQLDoc from "./pages/MySQLDoc";
import AWSDoc from "./pages/AWSDoc";
import GitHubDoc from "./pages/GitHubDoc";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';

// Pages that should NOT show the navbar
const noNavbarRoutes = ['/login', '/register'];

function AppContent() {
  const location = useLocation();
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<DocumentationHub />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/html" element={<ProtectedRoute><HTMLDoc /></ProtectedRoute>} />
        <Route path="/css" element={<ProtectedRoute><CSSDoc /></ProtectedRoute>} />
        <Route path="/react" element={<ProtectedRoute><ReactDoc /></ProtectedRoute>} />
        <Route path="/javascript" element={<ProtectedRoute><JavaScriptDoc /></ProtectedRoute>} />
        <Route path="/typescript" element={<ProtectedRoute><TypeScriptDoc /></ProtectedRoute>} />
        <Route path="/python" element={<ProtectedRoute><PythonDoc /></ProtectedRoute>} />
        <Route path="/django" element={<ProtectedRoute><DjangoDoc /></ProtectedRoute>} />
        <Route path="/fastapi" element={<ProtectedRoute><FastAPIDoc /></ProtectedRoute>} />
        <Route path="/nodejs" element={<ProtectedRoute><NodeJSDoc /></ProtectedRoute>} />
        <Route path="/express" element={<ProtectedRoute><ExpressDoc /></ProtectedRoute>} />
        <Route path="/sqlite" element={<ProtectedRoute><SQLiteDoc /></ProtectedRoute>} />
        <Route path="/mysql" element={<ProtectedRoute><MySQLDoc /></ProtectedRoute>} />
        <Route path="/postgresql" element={<ProtectedRoute><PostgreSQLDoc /></ProtectedRoute>} />
        <Route path="/mongodb" element={<ProtectedRoute><MongoDBDoc /></ProtectedRoute>} />
        <Route path="/redis" element={<ProtectedRoute><RedisDoc /></ProtectedRoute>} />
        <Route path="/aws" element={<ProtectedRoute><AWSDoc /></ProtectedRoute>} />
        <Route path="/vercel" element={<ProtectedRoute><VercelDoc /></ProtectedRoute>} />
        <Route path="/netlify" element={<ProtectedRoute><NetlifyDoc /></ProtectedRoute>} />
        <Route path="/docker" element={<ProtectedRoute><DockerDoc /></ProtectedRoute>} />
        <Route path="/postman" element={<ProtectedRoute><PostmanDoc /></ProtectedRoute>} />
        <Route path="/github" element={<ProtectedRoute><GitHubDoc /></ProtectedRoute>} />
        <Route path="/git-basics" element={<ProtectedRoute><GitBasicsDoc /></ProtectedRoute>} />
        <Route path="/github-actions" element={<ProtectedRoute><GitHubActionsDoc /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;