import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, showLogged }) => {
    const isLoggedIn = useSelector(state => !!state.log.userName);

    if(showLogged){
        return isLoggedIn ? element : <Navigate to="/error" replace />;
    }
    return isLoggedIn ? <Navigate to="/error" replace /> : element;

};

export default ProtectedRoute;