
import  SignIn from './components/SignIn';
import  Login  from './components/Login';
import { Routes , Route , BrowserRouter} from 'react-router-dom';
import About from './components/about';
import MainPage from './components/main';


function App() {


  return(
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}
export default App;