import React, { Component } from 'react'
import { GoogleMap, LoadScript, Polygon, InfoWindow, Marker, Polyline } from '@react-google-maps/api'
import IconButton from '@mui/material/IconButton'
import GpsFixed from '@mui/icons-material/GpsFixed'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import ReactDOM from 'react-dom'

//Estilo CSS para infowindow
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
    zoom: 17,
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
        tipo: 'poligono',
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
        tipo: 'poligono',
        name: 'Molienda',
        peligro: [
          'Energía Mecánica',
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.268611, lng: -69.05639 },
          { lat: -24.266175, lng: -69.056492 },
          { lat: -24.266166, lng: -69.05573 },
          { lat: -24.265853, lng: -69.055725 },
          { lat: -24.265892, lng: -69.054158 },
          { lat: -24.268679, lng: -69.054678 }
        ],
        tipo: 'poligono',
        name: 'Taller de Camiones',
        peligro: [
          'Energía Mecánica',
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.26437, lng: -69.060401 },
          { lat: -24.267429, lng: -69.05926 },
          { lat: -24.268722, lng: -69.057091 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.264806, lng: -69.059092 },
          { lat: -24.264936, lng: -69.05935 },
          { lat: -24.26446, lng: -69.059132 },
          { lat: -24.264828, lng: -69.058781 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.26368, lng: -69.059291 },
          { lat: -24.264444, lng: -69.059099 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Laguna Seca 1',
    centro: { lat: -24.3429, lng: -69.064 },
    zoom: 17,
    areas: [
      {
        paths: [
          { lat: -24.345462, lng: -69.069127 },
          { lat: -24.347056, lng: -69.065716 },
          { lat: -24.340793, lng: -69.062342 },
          { lat: -24.339379, lng: -69.065175 }
        ],
        tipo: 'poligono',
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
        tipo: 'poligono',
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
        tipo: 'poligono',
        name: '5863 - Area',
        peligro: ['Energía Térmica'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Chancado y Correas',
    centro: { lat: -24.272899, lng: -69.050887 },
    zoom: 17,
    areas: [
      {
        paths: [
          { lat: -24.275178, lng: -69.055543 },
          { lat: -24.27418, lng: -69.046187 },
          { lat: -24.268948, lng: -69.046649 },
          { lat: -24.269124, lng: -69.056712 }
        ],
        tipo: 'poligono',
        name: '4000 - Chancado',
        peligro: ['Energía Térmica'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Puerto Coloso',
    centro: { lat: -23.7627, lng: -70.468 },
    zoom: 17,
    areas: [
      {
        paths: [
          { lat: -23.758688, lng: -70.465906 },
          { lat: -23.757156, lng: -70.464977 },
          { lat: -23.756836, lng: -70.464944 },
          { lat: -23.75683, lng: -70.464985 },
          { lat: -23.757145, lng: -70.465031 },
          { lat: -23.758671, lng: -70.465947 }
        ],
        tipo: 'poligono',
        name: 'Correa Transportadora',
        peligro: ['Energía Mecánica', 'Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.758786, lng: -70.466032 },
          { lat: -23.758383, lng: -70.466131 },
          { lat: -23.758572, lng: -70.467727 },
          { lat: -23.759017, lng: -70.467671 }
        ],
        tipo: 'poligono',
        name: 'Stock Pile',
        peligro: ['Energía Mecánica', 'Energía Hidráulica', 'Energía Neumática'],
        visible: true
      }
    ]
  },
  {
    nombre: 'Catodos',
    centro: { lat: -24.234813, lng: -69.128289 },
    zoom: 17,
    areas: [
      {
        paths: [
          { lat: -24.236574, lng: -69.131625 },
          { lat: -24.236496, lng: -69.128686 },
          { lat: -24.233414, lng: -69.126164 },
          { lat: -24.232328, lng: -69.129061 }
        ],
        tipo: 'poligono',
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
  'Energía Neumática': '#EED202',
  'Energía Térmica': 'red'
}

class LocationButton extends Component {
  render() {
    return (
      <div className='location-button'>
        <IconButton
          style={{
            backgroundColor: 'white',
            color: 'black',
            zIndex: 1000,
            width: '40px',
            left: '10px',
            bottom: '10px'
          }}
          onClick={this.props.onClick}
        >
          <GpsFixed />
        </IconButton>
      </div>
    )
  }
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: { lat: -24.261986, lng: -69.060333 },
      zoom: 13,
      showInfoWindow: false,
      infoWindowPosition: null,
      plantasVisible: Array(plantas.length).fill(true),
      userLocation: null
    }
    this.handlePolygonClick = this.handlePolygonClick.bind(this)
    this.togglePlantaVisibility = this.togglePlantaVisibility.bind(this)
  }

  handleMapClick() {
    if (this.state.showInfoWindow) {
      this.setState({ showInfoWindow: false })
    }
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

  handlePolylineClick(e, index) {
    let peligros = []
    plantas.forEach(planta => {
      planta.areas.forEach(area => {
        if (area.name === index) {
          area.peligro.forEach(peligro => {
            if (!peligros.some(e => e.text === peligro)) {
              peligros.push({ text: peligro, color: peligroColors[peligro] })
            }
          })
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
          this.setState({
            position: plantas[index].centro,
            zoom: plantas[index].zoom
          })
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

  addLocationButton(map) {
    const locationButtonDiv = document.createElement('div')
    ReactDOM.render(
      <LocationButton
        onClick={() => {
          if (this.state.userLocation) {
            this.setState({ position: this.state.userLocation })
          }
        }}
      />,
      locationButtonDiv
    )
    map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(locationButtonDiv)
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={apiKey}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FormGroup row>
            <Grid container spacing={0}>
              {plantas.map((planta, index) => (
                <Grid item xs={4} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.plantasVisible[index]}
                        onChange={() => this.togglePlantaVisibility(index)}
                        sx={{
                          '& .MuiSvgIcon-root': {
                            width: '0.8em', // Cambia el tamaño de la casilla aquí
                            height: '0.8em' // Cambia el tamaño de la casilla aquí
                          }
                        }}
                      />
                    }
                    label={planta.nombre}
                    sx={{
                      fontSize: '0.8rem' // Cambia el tamaño de la letra aquí
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
          <GoogleMap
            mapContainerStyle={{ height: '700px', width: '100%' }}
            center={this.state.position}
            zoom={this.state.zoom}
            mapTypeId='satellite'
            onLoad={this.addLocationButton.bind(this)}
            onClick={this.handleMapClick.bind(this)}
          >
            {plantas.map((planta, plantaIndex) =>
              planta.areas.map((area, areaIndex) => {
                return area.tipo === 'poligono' ? (
                  <Polygon
                    key={`${plantaIndex}-${areaIndex}`}
                    paths={area.paths}
                    onClick={e => this.handlePolygonClick(e, area.name)}
                    visible={this.state.plantasVisible[plantaIndex]}
                    options={{
                      fillColor: 'red',
                      fillOpacity: 0.1,
                      strokeColor: 'red',
                      strokeOpacity: 0.5,
                      strokeWeight: 3
                    }}
                  />
                ) : (
                  <Polyline
                    key={`${plantaIndex}-${areaIndex}`}
                    path={area.paths}
                    onClick={e => this.handlePolylineClick(e, area.name)}
                    visible={this.state.plantasVisible[plantaIndex]}
                    options={{
                      strokeColor: peligroColors[area.peligro],
                      strokeOpacity: 0.5,
                      strokeWeight: 8
                    }}
                  />
                )
              })
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
          </GoogleMap>
        </div>
      </LoadScript>
    )
  }
}

export default Map
