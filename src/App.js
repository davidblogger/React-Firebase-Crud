import React, {Fragment} from 'react';
import Links from './components/Links';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

return (
    <Fragment>
    	<div className="container p-4">
    		<div className="row">
    			<Links />
    		</div>
    	</div>
    	<ToastContainer />
    </Fragment>
  );
}

export default App;
