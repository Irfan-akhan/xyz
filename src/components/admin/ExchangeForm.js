import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/BookingForm.module.css';

// HELPER FUNCTIONS
function updateRates(data) {
	console.log('SUBMOISSSSSSs', data);
	// console.log("id", data.id);
	// const id = data.id;
	// const rates = {};
	// rates.dollar = data.dollar;
	// rates.pound = data.pound;
	// rates.euro = data.euro;
	// console.log("ex cluded", rates, id);
	fetch(`https://shuttlelanee.herokuapp.com/api/rates/${data.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			pound: data.pound,
			euro: data.euro,
			dollar: data.dollar,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('result from server', data);
			return data;
		})
		.catch((err) => {
			console.log('error in catch', err);
		});
	return 'created';
}
function validateData(data) {
	console.log('validate data', data);
	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

// COMPoNENT
const ExchangeForm = () => {
	const [rates, setRates] = useState({});
	useEffect(() => {
		fetch('https://shuttlelanee.herokuapp.com/api/rates')
			.then((res) => res.json())
			.then((data) => {
				console.log('rates', data.data[0]);
				setRates({
					pound: data.data[0].pound,
					euro: data.data[0].euro,
					dollar: data.data[0].dollar,
					id: data.data[0]._id,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('rates are: ', rates);
		const verified = validateData(rates);
		if (!verified) {
			const response = updateRates(rates);
			console.log('VACK', response);
		} else {
			console.log('validation Error');
		}
	};
	const onChangeHandler = (e) => {
		setRates({ ...rates, [e.target.name]: e.target.value });
	};
	return (
		<>
			<Grid item sm={12}>
				<h2
					style={{
						textAlign: 'center',
						marginTop: '0',
					}}
				>
					Update Exchange Rates
				</h2>
			</Grid>
			<Grid xs={12}>
				<main className={styles.formContainer}>
					<form onSubmit={onSubmitHandler} className={styles.form}>
						<div className={styles.inputGroup}>
							<label htmlFor='Euro'>Naira to Euro</label>
							<input
								type='number'
								placeholder='1 NairaEuro'
								id='euro'
								name='euro'
								onChange={onChangeHandler}
								value={rates?.euro}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='pound'>Naira to Pound</label>
							<input
								type='number'
								placeholder='1 Naira to Pound'
								id='pound'
								name='pound'
								onChange={onChangeHandler}
								value={rates?.pound}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='dollar'>Naira to USD</label>
							<input
								type='number'
								placeholder='1 Naira to USD'
								id='dollar'
								name='dollar'
								onChange={onChangeHandler}
								value={rates?.dollar}
							/>
						</div>
						<button type='submit' className={styles.button}>
							Update Rates
						</button>
					</form>
				</main>
			</Grid>
		</>
	);
};

export default ExchangeForm;
