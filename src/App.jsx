import React from 'react';
import Feed from './components/Feed';
import { useUserContext } from './context/User-context';
import { useNavigate } from 'react-router-dom';
function App() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <div >
      {user && <Feed />}
    </div>
  );

}

export default App;
