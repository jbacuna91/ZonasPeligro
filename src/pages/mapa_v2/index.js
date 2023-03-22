import React, { Component } from 'react'
import { GoogleMap, LoadScript, Polygon, InfoWindow, Marker } from '@react-google-maps/api'
import IconButton from '@mui/material/IconButton'
import GpsFixed from '@mui/icons-material/GpsFixed'
import styles from './infowindow.module.css'

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY

const UserLocationIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" class="css-i6dzq1">
  <circle cx="12" cy="12" r="10" stroke="blue" fill="blue" fill-opacity="0.3"></circle>
  <circle cx="12" cy="12" r="3" stroke="white" fill="blue"></circle>
</svg>
`

const plantas = [
  {
    nombre: 'Los Colorados',
    centro: { lat: -24.2625, lng: -69.059 },
    areas: [
      {
        paths: [
          { lat: -24.262744, lng: -69.061243 },
          { lat: -24.263945, lng: -69.060934 },
          { lat: -24.264065, lng: -69.060857 },
          { lat: -24.264151, lng: -69.060741 },
          { lat: -24.264177, lng: -69.060554 },
          { lat: -24.264067, lng: -69.060154 },
          { lat: -24.264023, lng: -69.060028 },
          { lat: -24.263918, lng: -69.059918 },
          { lat: -24.263752, lng: -69.059856 },
          { lat: -24.262473, lng: -69.060253 }
        ],
        name: 'Stock Pile',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.26196, lng: -69.060318 },
          { lat: -24.262877, lng: -69.060007 },
          { lat: -24.262862, lng: -69.05991 },
          { lat: -24.263786, lng: -69.059628 },
          { lat: -24.263635, lng: -69.059183 },
          { lat: -24.262894, lng: -69.059406 },
          { lat: -24.262908, lng: -69.059489 },
          { lat: -24.261854, lng: -69.059843 }
        ],
        name: 'Molienda',
        peligro: [
          'Energía Mecánica',
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica'
        ],
        visible: true
      }
    ]
  },
  {
    nombre: 'Laguna Seca 1',
    centro: { lat: -24.3429, lng: -69.064 },
    areas: [
      {
        paths: [
          { lat: -24.345462, lng: -69.069127 },
          { lat: -24.347056, lng: -69.065716 },
          { lat: -24.340793, lng: -69.062342 },
          { lat: -24.339379, lng: -69.065175 }
        ],
        name: '3800 - Espesadores',
        peligro: ['Energía Térmica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.347056, lng: -69.065716 },
          { lat: -24.340793, lng: -69.062342 },
          { lat: -24.342486, lng: -69.059275 },
          { lat: -24.34847, lng: -69.062468 }
        ],
        name: '4500 - Flotacion',
        peligro: ['Energía Térmica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.340793, lng: -69.062342 },
          { lat: -24.339379, lng: -69.065175 },
          { lat: -24.337287, lng: -69.06391 },
          { lat: -24.338807, lng: -69.061023 }
        ],
        name: '5863 - Area',
        peligro: ['Energía Térmica'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Chancado y Correas',
    centro: { lat: -24.272899, lng: -69.050887 },
    areas: [
      {
        paths: [
          { lat: -24.275178, lng: -69.055543 },
          { lat: -24.27418, lng: -69.046187 },
          { lat: -24.268948, lng: -69.046649 },
          { lat: -24.269124, lng: -69.056712 }
        ],
        name: '4000 - Chancado',
        peligro: ['Energía Térmica'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Puerto Coloso',
    centro: { lat: -23.7627, lng: -70.468 },
    areas: [
      {
        paths: [
          { lat: -23.768948, lng: -70.472057 },
          { lat: -23.766141, lng: -70.471642 },
          { lat: -23.758825, lng: -70.464623 },
          { lat: -23.756331, lng: -70.463956 },
          { lat: -23.75595, lng: -70.46763 },
          { lat: -23.764409, lng: -70.476489 }
        ],
        name: '6000 - Puerto Coloso',
        peligro: ['Energía Térmica'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Catodos',
    centro: { lat: -24.234813, lng: -69.128289 },
    areas: [
      {
        paths: [
          { lat: -24.236574, lng: -69.131625 },
          { lat: -24.236496, lng: -69.128686 },
          { lat: -24.233414, lng: -69.126164 },
          { lat: -24.232328, lng: -69.129061 }
        ],
        name: '3259 - Catodos',
        peligro: ['Energía Térmica'],
        visible: true
      }
    ]
  }
]

// Define un objeto con los colores para cada tipo de peligro
const peligroColors = {
  'Energía Mecánica': 'green',
  'Energía Hidráulica': 'blue',
  'Energía Oleo-hidráulica': 'cyan',
  'Energía Neumática': 'yellow',
  'Energía Térmica': 'red'
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: { lat: -24.261986, lng: -69.060333 },
      showInfoWindow: false,
      infoWindowPosition: null,
      plantasVisible: Array(plantas.length).fill(false),
      userLocation: null
    }
    this.handlePolygonClick = this.handlePolygonClick.bind(this)
    this.togglePlantaVisibility = this.togglePlantaVisibility.bind(this)
  }

  handlePolygonClick(e, index) {
    let peligros = []
    plantas.forEach(planta => {
      planta.areas.forEach(area => {
        if (google.maps.geometry.poly.containsLocation(e.latLng, new google.maps.Polygon({ paths: area.paths }))) {
          if (area.name === index) {
            area.peligro.forEach(peligro => {
              peligros.push({ text: peligro, color: peligroColors[peligro] })
            })
          }
        }
      })
    })

    const content = (
      <div className={styles['info-window']}>
        <div className={styles['info-window-title']}>Área: {index}</div>
        <div className={styles['info-window-subtitle']}>Peligros:</div>
        <ul className={styles['info-window-content']}>
          {peligros.map(peligro => (
            <li key={peligro.text} style={{ color: peligro.color }}>
              {peligro.text}
            </li>
          ))}
        </ul>
      </div>
    )

    this.setState({
      showInfoWindow: true,
      infoWindowPosition: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      infoWindowContent: content
    })
  }

  togglePlantaVisibility(index) {
    this.setState(
      prevState => {
        const plantasVisible = [...prevState.plantasVisible]
        plantasVisible[index] = !plantasVisible[index]

        return { plantasVisible }
      },
      () => {
        if (this.state.plantasVisible[index]) {
          this.setState({ position: plantas[index].centro })
        }
      }
    )
  }

  //
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          this.setState({
            userLocation: { lat: position.coords.latitude, lng: position.coords.longitude }
          })
        },
        error => {
          console.error(error)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={apiKey}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: '5px',
              borderRadius: '0px',
              marginRight: '0px',
              marginBottom: '5px'
            }}
          >
            {plantas.map((planta, index) => (
              <div key={index}>
                <label>
                  <input
                    type='checkbox'
                    checked={this.state.plantasVisible[index]}
                    onChange={() => this.togglePlantaVisibility(index)}
                  />
                  {planta.nombre}
                </label>
                <br />
              </div>
            ))}
          </div>
          <GoogleMap
            mapContainerStyle={{ height: '700px', width: '100%' }}
            center={this.state.position}
            zoom={13}
            mapTypeId='satellite'
          >
            {plantas.map((planta, plantaIndex) =>
              planta.areas.map((area, areaIndex) => (
                <Polygon
                  key={`${plantaIndex}-${areaIndex}`}
                  paths={area.paths}
                  onClick={e => this.handlePolygonClick(e, area.name)}
                  visible={this.state.plantasVisible[plantaIndex]}
                  options={{
                    fillColor: area.color,
                    fillOpacity: 0.1,
                    strokeColor: area.color,
                    strokeOpacity: 0.5,
                    strokeWeight: 3
                  }}
                />
              ))
            )}
            {this.state.showInfoWindow && (
              <InfoWindow
                position={this.state.infoWindowPosition}
                onCloseClick={() => this.setState({ showInfoWindow: false })}
              >
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                  {this.state.infoWindowContent}
                </div>
              </InfoWindow>
            )}
            {this.state.userLocation && (
              <Marker
                position={this.state.userLocation}
                icon={{
                  url: `data:image/svg+xml,${encodeURIComponent(UserLocationIcon)}`
                }}
              />
            )}
            <IconButton
              style={{
                position: 'absolute',
                left: '10px',
                bottom: '10px',
                backgroundColor: 'white',
                color: 'black',
                zIndex: 1,
                width: '40px'
              }}
              onClick={() => {
                if (this.state.userLocation) {
                  this.setState({ position: this.state.userLocation })
                }
              }}
            >
              <GpsFixed />
            </IconButton>
          </GoogleMap>
        </div>
      </LoadScript>
    )
  }
}

export default Map
