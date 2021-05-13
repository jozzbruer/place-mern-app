import React, { useRef, useState, useEffect } from 'react'
import Button from './Button'
import './ImageUpload.css'

function ImageUpload(props) {
	const [file, setFile] = useState()
	const [preview, setPreview] = useState()
	//const [isValid, setIsValid] = useState()

	const filePickerReference = useRef()

	function pickImageHandler() {
		filePickerReference.current.click()
	}
	useEffect(() => {
		if (!file) {
			return
		}
		const fileReader = new FileReader()
		fileReader.onload = function () {
			setPreview(fileReader.result)
		}
		fileReader.readAsDataURL(file)
	}, [file])

	// The event in picked Handler return a target.files
	function pickedHandler(event) {
		if (event.target.files && event.target.files.length === 1) {
			const pickedFile = event.target.files[0]
			setFile(pickedFile)
			return
		}
	}

	return (
		<div className='form-control'>
			<input
				id={props.id}
				ref={filePickerReference}
				style={{ display: 'none' }}
				type='file'
				accept='.jpg, .png,.jpeg, .pdf'
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className='image-upload__preview'>
					{preview && <img src={preview} alt='preview' />}
					{!preview && <p>Add image</p>}
				</div>
				<Button type='button' onClick={pickImageHandler}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	)
}

export default ImageUpload
