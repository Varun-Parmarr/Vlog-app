
import  SignIn from './components/SignIn';
import  Login  from './components/Login';
import { Routes , Route } from 'react-router-dom';
import {Link} from 'react-router-dom';

function App() {

  return(
    <div  className='h-screen flex items-center justify-center bg-blue-100'>
    <div className=" border border-solid border-white rounded-2xl w-1/2 mx-auto shadow p-12 mt-4 bg-blue-200">
    
    <div className='flex items-center justify-center mb-8 shadow rounded-2xl text-2xl p-8 bg-blue-100 text-blue-500'>
    <i> Welcome to my website </i>
    </div>
    <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/login' element={<Login/>}/>
     </Routes>

  
    <div className='flex items-center justify-center mt-4 text-blue-500 cursor-pointer'>
     <nav>
      <Link to="/">SIGNIN</Link>  |  <Link to="/login">LOGIN</Link>
     </nav>
    
      </div>
     </div>
    </div>
  )
}
export default App;