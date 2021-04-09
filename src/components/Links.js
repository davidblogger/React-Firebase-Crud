import React, {useEffect, useState} from "react";
import LinkForm from "./LinkForm";
import {toast} from 'react-toastify';

//Importar firebase
import {db} from '../firebase';

const Links = () => {

//State para mostrar los datos desde firebase
	const [links, setLinks] = useState([])

//State para editar registro
    const [currentId, setCurrentId] = useState('');

//Agregar datos a firebase
const addOrEditLink = async (linkObject) => {
    if(currentId === ''){
        await db.collection('links').doc().set(linkObject);
        toast('Datos guardados', {
            type: 'info',
            autoclose: 1000
        });
    } else {
        await db.collection('links').doc(currentId).update(linkObject);
        toast('Datos actualizados', {
            type: 'success',
            autoclose: 1000
        });
        //reiniciar formulario y id
        setCurrentId('');
    }
};

//Borrar un registro
const onDeleteLink = async (id) => {
	if(window.confirm("Are you sure want to delete this link?")){
		await db.collection('links').doc(id).delete();
        toast('Registro eliminado', {
        type: 'warning',
        autoclose: 1000
    })
	}
};

//Leer datos desde firebase

//Funcion que hará una petición a firebase
const getLinks = () => {
	db.collection('links').onSnapshot((querySnapshot) => {
		const docs = [];
		querySnapshot.forEach(doc => {
		docs.push({...doc.data(), id:doc.id});
		});
		setLinks(docs);
	});

}

useEffect(() => {
	getLinks();
}, []);

  return (
    <div>
    	<div className="col-md-12">
    		<LinkForm {...{addOrEditLink, currentId, links}}/>
    	</div>
    	<div className="col-md-12">
    		{links.map(link => (
    			<div className="card mb-1 mt-1" key={link.id}>
    				<div className="card-body">
    					<div className="d-flex justify-content-between">
    						<h4>{link.name}</h4>
                            <div>
                                <i className="material-icons"
                                onClick={() => setCurrentId(link.id)}
                                >create</i>
                                <i className="material-icons text-danger"
                                onClick={() => onDeleteLink(link.id)}
                                >close</i>
                            </div>
    					</div>
    					<p>{link.description}</p>
    					<a href={link.url} target="_blank" rel="noopener noreferrer">Ir al sitio web</a>
    				</div>
    			</div>
    		))}
    	</div>
    </div>
  )
}

export default Links;