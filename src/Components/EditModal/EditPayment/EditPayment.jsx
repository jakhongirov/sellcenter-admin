import { useEffect, useState } from 'react';

import Close from '../../../assets/images/icons/close.svg';
import http from '../../../axios.config';
import File from '../../../assets/images/icons/file.svg';
import '../../AddModal/AddSlider/AddSlider';
import useToken from '../../../Hooks/useToken';

function EditPayment({
	editModal,
	setEditModal,
	api,
	id,
	titleValue,
	priceValue,
	descValue,
	langValue,
}) {
	const [selectedImage, setSelectedImage] = useState(null); // Состояние для хранения выбранного изображения
	const [selectedLanguage, setSelectedLanguage] = useState(null);
	const [formattedInput, setFormattedInput] = useState('');
	const [token, setToken] = useToken();

	useEffect(() => {
		setSelectedLanguage(langValue);
		setFormattedInput(priceValue);
	}, [langValue, priceValue]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { price, title, desc } = e.target.elements;

		const data = {
			id: id,
			title: title.value,
			price: formattedInput,
			desc: desc.value,
			lang: selectedLanguage,
		};
		console.log(data);

		http
			.put(api, data, {
				headers: {
					token: token,
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log(response.status);
				if (response.status === 200) {
					window.location.reload();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const closeModal = () => {
		setEditModal(false);
	};

	const stopPropagation = (e) => {
		e.stopPropagation();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0]; // Получаем выбранный файл
		setSelectedImage(URL.createObjectURL(file)); // Отображаем выбранное изображение
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
		<>
			{editModal ? (
				<div className='modal_bg' onClick={closeModal}>
					<div className='payment_edit' onClick={stopPropagation}>
						<div className='add_page'>
							<div className='add_page_wrapper'>
								<h1>Edit</h1>
								<form onSubmit={handleSubmit}>
									<div className='form_wrapper'>
										<input
											required
											type='text'
											name='title'
											placeholder='Title'
											defaultValue={titleValue}
										/>{' '}
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
											onChange={handleLanguageChange}>
											<option value=''>-- Select language --</option>
											<option value='en'>English</option>
											<option value='gr'>Germany</option>
											<option value='fr'>French</option>
											<option value='ru'>Russia</option>
											<option value='pol'>Polish</option>
											<option value='sp'>Spanish</option>
											<option value='sw'>Swedish</option>
										</select>
									</div>
									<div className='textarea'>
										<textarea
											defaultValue={descValue}
											name='desc'
											placeholder='Description'></textarea>
									</div>
									<button className='submit' type='submit'>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</>
	);
}

export default EditPayment;
