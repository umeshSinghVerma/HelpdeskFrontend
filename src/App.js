import logo from './logo.svg';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Accordian from './components/Accordian';
import MainPage from './Pages/MainPage';
import DarkmodeState from './Contexts/DarkmodeState';
import EditModeContextProvider from './Contexts/EditModeContext';
import { NavBarHeightContextProvider } from './Contexts/NavBarHeightContext';
import('preline');

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<MainPage />}>
      <Route path='/:Blogid' element={<MainPage />}>
        <Route path='/:Blogid/:Menuid' element={<MainPage />}>
          <Route path='/:Blogid/:Menuid/:Headingid' element={<MainPage />}></Route>
        </Route>
      </Route>
    </Route>
    <Route path='/error' element={<h1>Error</h1>}></Route>
  </>
))
function App() {
  return (
    <DarkmodeState>
      <EditModeContextProvider>
        <NavBarHeightContextProvider>
          <RouterProvider router={router} />
        </NavBarHeightContextProvider>
      </EditModeContextProvider>
    </DarkmodeState>
  )
}

export default App;
