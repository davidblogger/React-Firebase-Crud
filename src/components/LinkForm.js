import React, {Fragment, useState, useEffect} from 'react';

//Importar firebase
import {db} from '../firebase';

const LinkForm = ({addOrEditLink, currentId, links}) => {

	//DEfinir el state
	const initialStateValues = {
		url:'',
		name:'',
		description:''
	}
	const [values, setValues] = useState(initialStateValues)

	//Manejar los datos de envio del formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		addOrEditLink(values);
		setValues({...initialStateValues})
	}

	//Funcion para tomar los datos que se van escribiendo en el formulario y actualizar el state
	const handleInputChange = e => {
		const { name, value } = e.target;
		setValues({...values, [name]: value})
	}

	//Funcion para obtener enlace por id para el registro a modificar
	const getLinkById = async (id) => {
		const doc = await db.collection('links').doc(id).get();
		setValues({...doc.data()});
	}

	//useEffect
	useEffect(() => {
		if(currentId === ''){
			setValues({...initialStateValues});
		}else{
			getLinkById(currentId);
		}
	}, [currentId]);

  return (
  	<Fragment>
  		<form className="card card-body" onSubmit={handleSubmit}>
  			<div className="form-group input-group">
  				<div className="input-group-text bg-light">
  					<i className="material-icons">insert_link</i>
  				</div>

		    	<input
		    	type="text"
		    	className="form-control"
		    	placeholder="Ingresa la URL"
		    	name="url"
		    	onChange={handleInputChange}
		    	value={values.url}
		    	/>

  			</div>

  			<div className="form-group input-group">
  				<div className="input-group-text bg-light">
  					<i className="material-icons">create</i>
  				</div>
  				<input
		    	type="text"
		    	className="form-control"
		    	placeholder="Nombre URL"
		    	name="name"
				onChange={handleInputChange}
				value={values.name}
		    	/>
  			</div>

  			<div className="form-group">
  				<textarea
  					name="description"
  					rows="3"
  					className="form-control"
  					placeholder="Escribe una descripción"
  					onChange={handleInputChange}
  					value={values.description}
  				>

  				</textarea>
  			</div>

  			<button className="btn btn-primary btn-block">
  				{currentId === '' ? 'Guardar': 'Actualizar'}
  			</button>
  		</form>
  	</Fragment>
  )
}

export default LinkForm;