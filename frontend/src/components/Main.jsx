// Your updated MainPage.jsx

import Videocard from './Videocard';
// 1. Import your new Navbar component
// (Adjust the path if you put it in a 'components' folder)
import Navbar from './Navbar'; 

function MainPage() {
  return (
    <div>
      {/* 2. Use your new Navbar component here */}
      <Navbar />
      
      {/* 3. The rest of your page */}
      <Videocard />
    </div>
  );
}

export default MainPage;