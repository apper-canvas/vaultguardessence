import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import { routes, routeArray } from './config/routes';

function App() {
  return (
    <BrowserRouter>
<div className="min-h-screen bg-background text-text-primary">
        <Routes>
<Route path="/" element={<Layout />}>
              <Route index element={<routes.home.component />} />
            {routeArray.map((route) => (
              <Route
                key={route.id}
path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<routes.notFound.component />} />
          </Route>
        </Routes>
        
<ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
toastClassName="!bg-white !text-black !border !border-surface-300"
          progressClassName="!bg-primary"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;