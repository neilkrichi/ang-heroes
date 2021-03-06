import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { VolcanoLocationMarker, WildfireLocationMarker } from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const markers = eventData.map(ev => {
        if (ev.categories[0].id === 8) {
            return <WildfireLocationMarker key={ev.id} 
                lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} 
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title})}/>
        } else if (ev.categories[0].id === 12 && ev.geometries[0].type === "Point") {
            return <VolcanoLocationMarker key={ev.id} 
                lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} 
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title, lastActive: ev.geometries[0].date})}/>
        }
        return null
    })
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyD0dfASvdDW04blXc9Vs8Te2gvAyiLhqMc' }}
                defaultCenter={ center }
                defaultZoom={ zoom }
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} onClick={() => setLocationInfo(null)} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -112.8756
    },
    zoom: 6
}

export default Map
