import React, { useEffect } from 'react'
import EventCard from '../components/Events/EventCard'
import Header from '../components/Layout/Header/Header2'
import { useSelector } from 'react-redux'
import { getIsLoadingEvents, selectAllEvents } from '../redux/features/eventsSlice'
import Footer from '../components/Layout/Footer'

const Events = () => {
	const allEvents = useSelector(selectAllEvents);
	const isLoadingEvents = useSelector(getIsLoadingEvents);

	useEffect(() => {
		window.scrollTo(0,0);
	}, [])

	return (
	<>
		{!isLoadingEvents && 
		<div>
			<Header activeHeading={4} />
			<div className='section'>
				{ allEvents.length === 0 ? <h4>'No Events have!'</h4>
				: <>
					{allEvents && allEvents.map(event => 
					<div key={event._id}>
						<EventCard eventData={event}/>
					</div>
					)}
				</>
				}
			</div>
			<Footer />
		</div>}
	</>
	)
}

export default Events