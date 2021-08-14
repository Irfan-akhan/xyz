import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import FleetBookingForm from './FleetBookingForm';
// import styles from '../../styles/BookingForm.module.css';
import styles from '../../styles/Dashboard.module.css';

const FleetManagementBooking = () => {
	const [editMode] = useState(false);
	const [fleets, setFleets] = useState([]);
	useEffect(() => {
		fetch('https://shuttlelanee.herokuapp.com/api/booking/fleet')
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setFleets(result.data);
			})
			.catch((err) => console.log(err));
	}, []);
	const onClickHandler = () => {
		setEditMode(true);
	};
	return (
		<>
			<Grid item sm={12}>
				<h2 style={{ textAlign: 'center', color: '#554986' }}>
					Fleet Management Overview
				</h2>
			</Grid>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<FleetBookingForm />
				</Modal>
			)}
			<Grid item xs={12}>
				<main style={{ width: '98%' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: '1rem',
						}}
					>
						<h3>Existing Bookings</h3>
						<button
							className={styles.button}
							onClick={onClickHandler}
						>
							Add Booking
						</button>
					</div>

					<table className={styles.table}>
						<thead style={{ backgroundColor: 'red' }}>
							<tr className={styles.theading}>
								<th>#</th>
								<th>Booking Reference</th>
								<th>Company Details</th>
								<th>Fleet Details</th>
								<th>Contact Details</th>
								<th>Booking Date</th>
							</tr>
						</thead>
						<tbody className={styles.tableContent}>
							{fleets.map((fleet, idx) => {
								return (
									<tr>
										<td>{idx + 1}</td>
										<td>{fleet.bookingReference}</td>
										<td>
											<p>
												<strong>Company: </strong>
												{fleet.companyName}
											</p>
											<p>
												<strong>Email: </strong>{' '}
												{fleet.bookingEmail}
											</p>
											<p>
												<strong>
													Booking Number:{' '}
												</strong>
												{fleet.bookingNumber}
											</p>
											<p>
												<strong>Address: </strong>
												{fleet.address}
											</p>
											<p>
												<strong>City: </strong>
												{fleet.city}
											</p>
											<p>
												<strong>Country: </strong>
												{fleet.country}
											</p>
											<p>
												<strong>Open 24* 7: </strong>
												{fleet.openHours == true
													? 'Yes'
													: 'No'}
											</p>
										</td>
										<td>
											<p>
												<strong>Size: </strong>{' '}
												{fleet.fleetSize}
											</p>
											<p style={{ width: '200px' }}>
												<strong>Type: </strong>
												{fleet.vehicleType}
											</p>
											<p>
												<strong>
													Available 24 * 7:{' '}
												</strong>
												{fleet.operatingHours == true
													? 'Yes'
													: 'No'}
											</p>
											<p>
												<strong>Cities: </strong>
												{fleet.operatingCities}
											</p>
											<p>
												<strong>Airports: </strong>
												{fleet.operatingAirports}
											</p>
										</td>
										<td>
											<p>
												<strong>Name: </strong>{' '}
												{fleet.name}
											</p>
											<p>
												<strong>Email: </strong>
												{fleet.contactEmail}
											</p>
											<p>
												<strong>Phone: </strong>
												{fleet.mobile}
											</p>
										</td>
										<td>{fleet?.createdAt.slice(0, 10)}</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr>
								<td>Sum</td>
								<td>$180</td>
							</tr>
						</tfoot>
					</table>
				</main>
			</Grid>
		</>
	);
};

export default FleetManagementBooking;
