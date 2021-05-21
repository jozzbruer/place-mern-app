import React from 'react'
import Button from './Button'
import './ImageUpload.css'

function ImageUpload(props) {
	// The event in picked Handler retu

	return (
		<div className='form-control'>
			<input
				id={props.id}
				ref={props.reference}
				style={{ display: 'none' }}
				type='file'
				accept='.jpg, .png,.jpeg,'
				onChange={props.pickedHandler}
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className='image-upload__preview'>
					{props.preview && <img src={props.preview} alt='preview' />}
					{!props.preview && <p>Add image</p>}
				</div>
				<Button type='button' onClick={props.pickImageHandler}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	)
}

export default ImageUpload
