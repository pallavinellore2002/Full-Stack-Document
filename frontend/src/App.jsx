import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentationHub />} />
        <Route path="/html" element={<HTMLDoc />} />
        <Route path="/css" element={<CSSDoc />} />
        <Route path="/react" element={<ReactDoc />} />
        <Route path="/javascript" element={<JavaScriptDoc />} />
        <Route path="/typescript" element={<TypeScriptDoc />} />
        <Route path="/python" element={<PythonDoc />} />
        <Route path="/django" element={<DjangoDoc />} />
        <Route path="/fastapi" element={<FastAPIDoc />} />
        <Route path="/nodejs" element={<NodeJSDoc />} />
        <Route path="/express" element={<ExpressDoc />} />
        <Route path="/sqlite" element={<SQLiteDoc />} />
        <Route path="/mysql" element={<MySQLDoc />} />
        <Route path="/postgresql" element={<PostgreSQLDoc />} />
        <Route path="/mongodb" element={<MongoDBDoc />} />
        <Route path="/redis" element={<RedisDoc />} />
        <Route path="/aws" element={<AWSDoc />} />
        <Route path="/vercel" element={<VercelDoc />} />
        <Route path="/netlify" element={<NetlifyDoc />} />
        <Route path="/docker" element={<DockerDoc />} />
        <Route path="/postman" element={<PostmanDoc />} />
        <Route path="/github" element={<GitHubDoc />} />
        <Route path="/git-basics" element={<GitBasicsDoc />} />
        <Route path="/github-actions" element={<GitHubActionsDoc />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;