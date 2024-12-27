import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Title = () => {
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    let pageTitle = 'CineScope';

    if (pathName === '/') {
      pageTitle = 'ServiceSphere - Home';
    } else if (pathName === '/login') {
      pageTitle = 'ServiceSphere - Login';
    } else if (pathName === '/register') {
      pageTitle = 'ServiceSphere - Register';
    } else if (pathName === '/services') {
      pageTitle = 'ServiceSphere - All Services';
    } else if (pathName === '/add-service') {
      pageTitle = 'ServiceSphere - Add Service';
    } else if (pathName === '/my-services'){
      pageTitle = 'ServiceSphere - My Service';
    } else if (pathName === '/my-reviews'){
      pageTitle = 'ServiceSphere - My Reviews';
    } else if (pathName.includes('/service')) {
      pageTitle = 'ServiceSphere - Service Details';
    }

    document.title = pageTitle;
  }, [location]);
};

export default Title;