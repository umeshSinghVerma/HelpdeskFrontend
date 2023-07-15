import logo from './logo.svg';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Accordian from './components/Accordian';
import MainPage from './Pages/MainPage';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<MainPage />}>
      <Route path='/:Blogid' element={<MainPage/>}>
        <Route path='/:Blogid/:Menuid' element={<MainPage/>}></Route>
      </Route>
    </Route>
  </>
))
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
