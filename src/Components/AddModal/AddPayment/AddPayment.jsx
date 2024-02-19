import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useToken from '../../../Hooks/useToken';
import http from '../../../axios.config';

function AddPayment({ addSlider, setAddSlider, api, name }) {
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [token, setToken] = useToken();
	const [formattedInput, setFormattedInput] = useState('');
	const [textareaValue, setTextareaValue] = useState('');

	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		const title = e.target.elements.title.value;
		const image_count = e.target.elements.image_count.value;
		if (!textareaValue.trim()) {
			alert('Please enter a description.');
			return;
		}

		const data = {
			title: title,
			price: formattedInput,
			desc: textareaValue,
			lang: selectedLanguage,
			image_count: image_count,
		};

		http
			.post('price/list/add', data, {
				headers: {
					token: token,
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					navigate('/payment');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const closeModal = () => {
		setAddSlider(false);
	};

	const stopPropagation = (e) => {
		e.stopPropagation();
	};

	const handleLanguageChange = (event) => {
		setSelectedLanguage(event.target.value);
	};

	const handleInputChange = (e) => {
		const inputValue = e.target.value || '';

		// Проверяем, есть ли уже точка в значении
		if (inputValue.includes('.')) {
			setFormattedInput(inputValue);
		} else {
			const inputDigitsOnly = inputValue.replace(/\D/g, '');

			// Добавляем точку после каждых двух цифр, кроме последних двух
			let formattedValue = inputDigitsOnly.replace(
				/(\d{2})(?=\d{2}(?!\d))/g,
				'$1.',
			);

			setFormattedInput(formattedValue);
		}
	};

	return (
		<div className='wrapper payment_add'>
			<div className='add_page'>
				<div className='add_page_wrapper'>
					<h1>Add payment item</h1>
					<form onSubmit={handleSubmit}>
						<input
							required
							type='text'
							name='title'
							placeholder='Title'
						/>{' '}
						<div className='form_wrapper'>
							<input
								required
								type='text'
								value={formattedInput}
								onChange={handleInputChange}
								placeholder='Price'
							/>{' '}
							<select
								className='language'
								value={selectedLanguage}
								onChange={handleLanguageChange}
								required>
								<option value=''>-- Select language --</option>
								<option value='en'>English</option>
								<option value='gr'>Germany</option>
								<option value='fr'>French</option>
								<option value='ru'>Russia</option>
								<option value='pol'>Polish</option>
								<option value='sp'>Spanish</option>
								<option value='sw'>Swedish</option>
							</select>
							<input
								type='number'
								name='image_count'
								placeholder='Image count'
							/>{' '}
						</div>
						<div className='textarea'>
							<textarea
								name='textarea'
								placeholder='Description'
								onChange={(e) => setTextareaValue(e.target.value)}
							/>
						</div>
						<button className='submit' type='submit'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddPayment;
