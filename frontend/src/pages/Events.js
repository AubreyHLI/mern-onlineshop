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
			<div className='section min-h-[60vh] mt-6'>
				{ allEvents?.length === 0 
				? <div className='normalFlex justify-center h-[60vh]'>
					<h4 className='text-[24px]'>No events have!</h4>
				</div>
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