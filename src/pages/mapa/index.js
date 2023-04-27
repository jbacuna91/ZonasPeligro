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

const EB_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
<rect x="2" y="2" width="20" height="20" fill="none" stroke="#7E2811" stroke-width="2"/>
<line x1="12" y1="8" x2="12" y2="16" stroke="#7E2811" stroke-width="2"/>
<line x1="8" y1="12" x2="16" y2="12" stroke="#7E2811" stroke-width="2"/>
<line x1="12" y1="2" x2="12" y2="4" stroke="#7E2811" stroke-width="2"/>
<line x1="12" y1="20" x2="12" y2="22" stroke="#7E2811" stroke-width="2"/>
<line x1="2" y1="12" x2="4" y2="12" stroke="#7E2811" stroke-width="2"/>
<line x1="20" y1="12" x2="22" y2="12" stroke="#7E2811" stroke-width="2"/>
</svg>`

const plantas = [
  {
    // Los Colorados
    nombre: 'Los Colorados',
    centro: { lat: -24.264036, lng: -69.057469 },
    zoom: 16,
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
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
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
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.264268, lng: -69.059722 },
          { lat: -24.264493, lng: -69.059657 },
          { lat: -24.264402, lng: -69.059362 },
          { lat: -24.264184, lng: -69.059435 }
        ],
        tipo: 'poligono',
        name: 'Chancadores Pebbler',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.263919, lng: -69.059141 },
          { lat: -24.263771, lng: -69.058615 },
          { lat: -24.263102, lng: -69.058843 },
          { lat: -24.263242, lng: -69.059342 }
        ],
        tipo: 'poligono',
        name: 'Flotación Scavenger',
        peligro: ['Energía Hidráulica', 'Energía Oleo-hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.263102, lng: -69.058843 },
          { lat: -24.263606, lng: -69.058681 },
          { lat: -24.263542, lng: -69.058442 },
          { lat: -24.263041, lng: -69.058604 }
        ],
        tipo: 'poligono',
        name: 'Remolienda',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.263542, lng: -69.058442 },
          { lat: -24.263041, lng: -69.058604 },
          { lat: -24.262989, lng: -69.058412 },
          { lat: -24.263489, lng: -69.058259 }
        ],
        tipo: 'poligono',
        name: 'Celdas columnares',
        peligro: ['Energía Hidráulica', 'Energía Oleo-hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.263489, lng: -69.058259 },
          { lat: -24.263471, lng: -69.058178 },
          { lat: -24.263019, lng: -69.058314 },
          { lat: -24.263037, lng: -69.058396 }
        ],
        tipo: 'poligono',
        name: 'Batería Hidrociclones',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.26266, lng: -69.059368 },
          { lat: -24.263201, lng: -69.059196 },
          { lat: -24.262998, lng: -69.058478 },
          { lat: -24.262462, lng: -69.058651 }
        ],
        tipo: 'poligono',
        name: 'Flotación Rougher',
        peligro: ['Energía Hidráulica', 'Energía Oleo-hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262997, lng: -69.058207 },
          { lat: -24.263263, lng: -69.058126 },
          { lat: -24.263232, lng: -69.058006 },
          { lat: -24.262973, lng: -69.05809 }
        ],
        tipo: 'poligono',
        name: 'Lechada de cal',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262933, lng: -69.058049 },
          { lat: -24.262801, lng: -69.05809 },
          { lat: -24.262875, lng: -69.058334 },
          { lat: -24.262999, lng: -69.058297 }
        ],
        tipo: 'poligono',
        name: 'Sala de Compresores',
        peligro: ['Energía Oleo-hidráulica', 'Energía Neumática', 'Energía Térmica', 'Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262345, lng: -69.058147 },
          { lat: -24.261904, lng: -69.05829 },
          { lat: -24.262004, lng: -69.05868 },
          { lat: -24.262456, lng: -69.058538 }
        ],
        tipo: 'poligono',
        name: 'TK - Concentrado',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262345, lng: -69.058147 },
          { lat: -24.261904, lng: -69.05829 },
          { lat: -24.261856, lng: -69.058094 },
          { lat: -24.262187, lng: -69.057989 },
          { lat: -24.262206, lng: -69.058046 },
          { lat: -24.262314, lng: -69.058009 }
        ],
        tipo: 'poligono',
        name: 'Estación Bombas',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.261872, lng: -69.059019 },
          { lat: -24.261586, lng: -69.059122 },
          { lat: -24.261625, lng: -69.059302 },
          { lat: -24.26192, lng: -69.059203 }
        ],
        tipo: 'poligono',
        name: 'Sopladores Rougher',
        peligro: ['Energía Oleo-hidráulica', 'Energía Neumática', 'Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.261802, lng: -69.059243 },
          { lat: -24.261577, lng: -69.059319 },
          { lat: -24.261647, lng: -69.0596 },
          { lat: -24.261878, lng: -69.059531 }
        ],
        tipo: 'poligono',
        name: 'Estanques de almacenamiento de Lechada de Cal ',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262984, lng: -69.057857 },
          { lat: -24.263462, lng: -69.057847 },
          { lat: -24.263468, lng: -69.057922 },
          { lat: -24.262981, lng: -69.057919 }
        ],
        tipo: 'poligono',
        name: 'Estación Bombas',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262984, lng: -69.057857 },
          { lat: -24.262983, lng: -69.057613 },
          { lat: -24.262621, lng: -69.057616 },
          { lat: -24.262629, lng: -69.057868 }
        ],
        tipo: 'poligono',
        name: 'Estación Bombas',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262565, lng: -69.057796 },
          { lat: -24.262568, lng: -69.057614 },
          { lat: -24.26251, lng: -69.057338 },
          { lat: -24.26219, lng: -69.057326 },
          { lat: -24.26218, lng: -69.057509 },
          { lat: -24.261517, lng: -69.057507 },
          { lat: -24.261526, lng: -69.057788 }
        ],
        tipo: 'poligono',
        name: 'Planta Reactivos',
        peligro: ['Energía Hidráulica'],
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
      },
      {
        paths: [
          { lat: -24.26427, lng: -69.059646 },
          { lat: -24.265004, lng: -69.059398 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.262667, lng: -69.060055 },
          { lat: -24.263842, lng: -69.059676 },
          { lat: -24.264962, lng: -69.059261 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.263629, lng: -69.059608 },
          { lat: -24.264625, lng: -69.060194 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      }
    ]
  },
  {
    // Laguna Seca 1
    nombre: 'Laguna Seca 1',
    centro: { lat: -24.343223, lng: -69.061348 },
    zoom: 16,
    areas: [
      {
        paths: [
          { lat: -24.340787, lng: -69.062412 },
          { lat: -24.339572, lng: -69.064683 },
          { lat: -24.342614, lng: -69.066589 },
          { lat: -24.343756, lng: -69.064205 }
        ],
        tipo: 'poligono',
        name: 'Espesado de Relaves',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.340787, lng: -69.062412 },
          { lat: -24.339679, lng: -69.0617 },
          { lat: -24.33932, lng: -69.062409 },
          { lat: -24.340415, lng: -69.063095 }
        ],
        tipo: 'poligono',
        name: 'Espesado de Concentrado',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.340415, lng: -69.063095 },
          { lat: -24.340128, lng: -69.063625 },
          { lat: -24.339349, lng: -69.063113 },
          { lat: -24.339639, lng: -69.062611 }
        ],
        tipo: 'poligono',
        name: 'Espesado de Concentrado',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.339772, lng: -69.063511 },
          { lat: -24.339498, lng: -69.063311 },
          { lat: -24.339278, lng: -69.063679 },
          { lat: -24.33956, lng: -69.063875 }
        ],
        tipo: 'poligono',
        name: 'Estación de Bombeo PS2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.343025, lng: -69.062141 },
          { lat: -24.341463, lng: -69.061134 },
          { lat: -24.340888, lng: -69.062225 },
          { lat: -24.342409, lng: -69.063174 }
        ],
        tipo: 'poligono',
        name: 'Flotación y Remolienda',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.343248, lng: -69.062269 },
          { lat: -24.342277, lng: -69.061632 },
          { lat: -24.342764, lng: -69.060763 },
          { lat: -24.34378, lng: -69.061366 }
        ],
        tipo: 'poligono',
        name: 'Molienda',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.343255, lng: -69.059487 },
          { lat: -24.344357, lng: -69.060178 },
          { lat: -24.344838, lng: -69.05943 },
          { lat: -24.343683, lng: -69.058713 }
        ],
        tipo: 'poligono',
        name: 'Stock Pile 1',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.344647, lng: -69.06015 },
          { lat: -24.345461, lng: -69.060668 },
          { lat: -24.346303, lng: -69.059324 },
          { lat: -24.345502, lng: -69.058823 }
        ],
        tipo: 'poligono',
        name: 'Stock Pile 2',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.343314, lng: -69.058578 },
          { lat: -24.34432, lng: -69.056894 },
          { lat: -24.341666, lng: -69.055297 },
          { lat: -24.340681, lng: -69.056864 }
        ],
        tipo: 'poligono',
        name: 'Sistema de almacenamiento de agua recuperada',
        peligro: ['Energía Hidráulica'],
        visible: true
      }
    ]
  },
  {
    // Laguna Agua Clara
    nombre: 'Laguna Agua Clara',
    centro: { lat: -24.416825, lng: -69.123137 },
    zoom: 13,
    areas: [
      {
        paths: [
          { lat: -24.338291, lng: -69.065393 },
          { lat: -24.338174, lng: -69.065797 },
          { lat: -24.338149, lng: -69.06591 },
          { lat: -24.338138, lng: -69.066038 },
          { lat: -24.338143, lng: -69.066189 },
          { lat: -24.338178, lng: -69.066347 },
          { lat: -24.338227, lng: -69.066495 },
          { lat: -24.338293, lng: -69.066604 },
          { lat: -24.338359, lng: -69.06671 },
          { lat: -24.340371, lng: -69.069501 },
          { lat: -24.342482, lng: -69.072417 },
          { lat: -24.342675, lng: -69.072692 },
          { lat: -24.342859, lng: -69.072984 },
          { lat: -24.342986, lng: -69.073214 },
          { lat: -24.343108, lng: -69.073468 },
          { lat: -24.343305, lng: -69.073968 },
          { lat: -24.343708, lng: -69.075029 },
          { lat: -24.344166, lng: -69.076228 },
          { lat: -24.344558, lng: -69.077277 },
          { lat: -24.345031, lng: -69.078517 },
          { lat: -24.345444, lng: -69.07959 },
          { lat: -24.345879, lng: -69.080723 },
          { lat: -24.346306, lng: -69.081829 },
          { lat: -24.346744, lng: -69.082958 },
          { lat: -24.347198, lng: -69.084166 },
          { lat: -24.347534, lng: -69.08505 },
          { lat: -24.348018, lng: -69.086296 },
          { lat: -24.348048, lng: -69.086403 },
          { lat: -24.348052, lng: -69.086475 },
          { lat: -24.34806, lng: -69.087835 },
          { lat: -24.34805, lng: -69.088381 },
          { lat: -24.348055, lng: -69.088466 },
          { lat: -24.348062, lng: -69.088545 },
          { lat: -24.348079, lng: -69.088639 },
          { lat: -24.348093, lng: -69.088694 },
          { lat: -24.348247, lng: -69.089202 },
          { lat: -24.348418, lng: -69.089793 },
          { lat: -24.348579, lng: -69.090315 },
          { lat: -24.348603, lng: -69.090397 },
          { lat: -24.348617, lng: -69.090474 },
          { lat: -24.348652, lng: -69.090758 },
          { lat: -24.348656, lng: -69.090797 },
          { lat: -24.34866, lng: -69.090998 },
          { lat: -24.348656, lng: -69.09105 },
          { lat: -24.348647, lng: -69.091125 },
          { lat: -24.348517, lng: -69.09175 },
          { lat: -24.348478, lng: -69.09198 },
          { lat: -24.348446, lng: -69.092233 },
          { lat: -24.348435, lng: -69.092431 },
          { lat: -24.348462, lng: -69.092886 },
          { lat: -24.34848, lng: -69.093151 },
          { lat: -24.348505, lng: -69.093357 },
          { lat: -24.34853, lng: -69.093501 },
          { lat: -24.348596, lng: -69.093729 },
          { lat: -24.348666, lng: -69.09392 },
          { lat: -24.348774, lng: -69.094154 },
          { lat: -24.348875, lng: -69.094337 },
          { lat: -24.34913, lng: -69.094765 },
          { lat: -24.349826, lng: -69.095917 },
          { lat: -24.349943, lng: -69.096107 },
          { lat: -24.350051, lng: -69.096309 },
          { lat: -24.350242, lng: -69.096672 },
          { lat: -24.350468, lng: -69.0971 },
          { lat: -24.350592, lng: -69.097335 },
          { lat: -24.350699, lng: -69.097563 },
          { lat: -24.35087, lng: -69.097991 },
          { lat: -24.351004, lng: -69.098354 },
          { lat: -24.351126, lng: -69.098677 },
          { lat: -24.351188, lng: -69.098836 },
          { lat: -24.351283, lng: -69.099027 },
          { lat: -24.351375, lng: -69.099206 },
          { lat: -24.351606, lng: -69.099531 },
          { lat: -24.351768, lng: -69.099787 },
          { lat: -24.351916, lng: -69.100015 },
          { lat: -24.352151, lng: -69.100334 },
          { lat: -24.352445, lng: -69.100653 },
          { lat: -24.353096, lng: -69.10134 },
          { lat: -24.353422, lng: -69.101739 },
          { lat: -24.353698, lng: -69.102102 },
          { lat: -24.353954, lng: -69.102457 },
          { lat: -24.354205, lng: -69.102859 },
          { lat: -24.354431, lng: -69.10326 },
          { lat: -24.354653, lng: -69.103666 },
          { lat: -24.354872, lng: -69.10407 },
          { lat: -24.355095, lng: -69.104475 },
          { lat: -24.355332, lng: -69.104882 },
          { lat: -24.355466, lng: -69.105064 },
          { lat: -24.355595, lng: -69.105223 },
          { lat: -24.355913, lng: -69.105522 },
          { lat: -24.356258, lng: -69.105834 },
          { lat: -24.356604, lng: -69.106128 },
          { lat: -24.357306, lng: -69.106669 },
          { lat: -24.357653, lng: -69.106955 },
          { lat: -24.357983, lng: -69.107261 },
          { lat: -24.358933, lng: -69.108189 },
          { lat: -24.359573, lng: -69.108802 },
          { lat: -24.35991, lng: -69.109093 },
          { lat: -24.360615, lng: -69.109648 },
          { lat: -24.360869, lng: -69.109869 },
          { lat: -24.36111, lng: -69.110086 },
          { lat: -24.361344, lng: -69.110312 },
          { lat: -24.36166, lng: -69.110654 },
          { lat: -24.361943, lng: -69.110988 },
          { lat: -24.362222, lng: -69.111348 },
          { lat: -24.362475, lng: -69.111713 },
          { lat: -24.36272, lng: -69.112103 },
          { lat: -24.362951, lng: -69.11252 },
          { lat: -24.363162, lng: -69.112925 },
          { lat: -24.363352, lng: -69.113352 },
          { lat: -24.363513, lng: -69.113753 },
          { lat: -24.363676, lng: -69.114214 },
          { lat: -24.363805, lng: -69.114653 },
          { lat: -24.364059, lng: -69.115585 },
          { lat: -24.364163, lng: -69.116003 },
          { lat: -24.36425, lng: -69.116451 },
          { lat: -24.364303, lng: -69.116916 },
          { lat: -24.364347, lng: -69.117605 },
          { lat: -24.364353, lng: -69.117936 },
          { lat: -24.36434, lng: -69.118291 },
          { lat: -24.364322, lng: -69.11864 },
          { lat: -24.364307, lng: -69.118976 },
          { lat: -24.364303, lng: -69.119316 },
          { lat: -24.364331, lng: -69.119685 },
          { lat: -24.364455, lng: -69.120742 },
          { lat: -24.364494, lng: -69.121087 },
          { lat: -24.364525, lng: -69.12143 },
          { lat: -24.364562, lng: -69.12178 },
          { lat: -24.364605, lng: -69.122135 },
          { lat: -24.364656, lng: -69.122493 },
          { lat: -24.364703, lng: -69.122925 },
          { lat: -24.364736, lng: -69.123301 },
          { lat: -24.364775, lng: -69.123616 },
          { lat: -24.364848, lng: -69.123959 },
          { lat: -24.36502, lng: -69.124481 },
          { lat: -24.365151, lng: -69.124813 },
          { lat: -24.365295, lng: -69.125134 },
          { lat: -24.365536, lng: -69.125548 },
          { lat: -24.365736, lng: -69.125831 },
          { lat: -24.366373, lng: -69.126736 },
          { lat: -24.366928, lng: -69.127527 },
          { lat: -24.367218, lng: -69.127943 },
          { lat: -24.367517, lng: -69.128349 },
          { lat: -24.36783, lng: -69.128723 },
          { lat: -24.368137, lng: -69.12905 },
          { lat: -24.368521, lng: -69.129409 },
          { lat: -24.368851, lng: -69.129675 },
          { lat: -24.369245, lng: -69.129955 },
          { lat: -24.369626, lng: -69.130198 },
          { lat: -24.36992, lng: -69.130356 },
          { lat: -24.370224, lng: -69.130499 },
          { lat: -24.370512, lng: -69.130626 },
          { lat: -24.370947, lng: -69.130778 },
          { lat: -24.371334, lng: -69.130893 },
          { lat: -24.372219, lng: -69.131166 },
          { lat: -24.372815, lng: -69.131343 },
          { lat: -24.373321, lng: -69.131498 },
          { lat: -24.374691, lng: -69.131908 },
          { lat: -24.376161, lng: -69.132354 },
          { lat: -24.377401, lng: -69.132725 },
          { lat: -24.378357, lng: -69.133024 },
          { lat: -24.379186, lng: -69.133267 },
          { lat: -24.379685, lng: -69.13342 },
          { lat: -24.380226, lng: -69.133589 },
          { lat: -24.380681, lng: -69.133722 },
          { lat: -24.381018, lng: -69.133721 },
          { lat: -24.381424, lng: -69.133808 },
          { lat: -24.381799, lng: -69.133919 },
          { lat: -24.382229, lng: -69.134054 },
          { lat: -24.382585, lng: -69.134158 },
          { lat: -24.383577, lng: -69.134456 },
          { lat: -24.384721, lng: -69.134801 },
          { lat: -24.38531, lng: -69.134989 },
          { lat: -24.386363, lng: -69.135306 },
          { lat: -24.387115, lng: -69.135531 },
          { lat: -24.388902, lng: -69.136075 },
          { lat: -24.389519, lng: -69.136258 },
          { lat: -24.389994, lng: -69.13639 },
          { lat: -24.390299, lng: -69.136261 },
          { lat: -24.390573, lng: -69.136156 },
          { lat: -24.392023, lng: -69.136171 }
        ],
        tipo: 'linea',
        name: 'Recuperación de agua a CLS',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.348064, lng: -69.086814 }],
        tipo: 'marcador',
        name: 'BSP3',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.380993, lng: -69.13375 }],
        tipo: 'marcador',
        name: 'BSP2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.390383, lng: -69.136595 }],
        tipo: 'marcador',
        name: 'BSP1',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.391999, lng: -69.136166 }],
        tipo: 'marcador',
        name: 'Torre de Captación',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.347985, lng: -69.086587 },
          { lat: -24.347976, lng: -69.087036 },
          { lat: -24.348138, lng: -69.087054 },
          { lat: -24.348138, lng: -69.086597 }
        ],
        tipo: 'poligono',
        name: 'BSP3',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.380895, lng: -69.133662 },
          { lat: -24.380864, lng: -69.133797 },
          { lat: -24.381092, lng: -69.133858 },
          { lat: -24.381122, lng: -69.133726 }
        ],
        tipo: 'poligono',
        name: 'BSP2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.390198, lng: -69.136459 },
          { lat: -24.390167, lng: -69.136599 },
          { lat: -24.390465, lng: -69.136689 },
          { lat: -24.3905, lng: -69.136553 }
        ],
        tipo: 'poligono',
        name: 'BSP1',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.391869, lng: -69.136067 },
          { lat: -24.391867, lng: -69.136246 },
          { lat: -24.39207, lng: -69.136256 },
          { lat: -24.392072, lng: -69.136067 }
        ],
        tipo: 'poligono',
        name: 'Torre de Captación',
        peligro: ['Energía Hidráulica'],
        visible: true
      }
    ]
  },
  {
    // Óxidos
    nombre: 'Óxidos',
    centro: { lat: -24.255361, lng: -69.124783 },
    zoom: 14,
    areas: [
      {
        paths: [
          { lat: -24.256264, lng: -69.092613 },
          { lat: -24.256252, lng: -69.102449 },
          { lat: -24.2694, lng: -69.102441 },
          { lat: -24.27255, lng: -69.099443 },
          { lat: -24.27259, lng: -69.092596 }
        ],
        tipo: 'poligono',
        name: 'Óxido de Lixiviación PAD 1',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.25813, lng: -69.1032 },
          { lat: -24.25832, lng: -69.112106 },
          { lat: -24.279842, lng: -69.112177 },
          { lat: -24.279858, lng: -69.103072 }
        ],
        tipo: 'poligono',
        name: 'Óxido de Lixiviación PAD 2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.279024, lng: -69.102227 },
          { lat: -24.278385, lng: -69.102238 },
          { lat: -24.278387, lng: -69.102685 },
          { lat: -24.279038, lng: -69.102672 }
        ],
        tipo: 'poligono',
        name: 'Chancado',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.27674, lng: -69.102333 },
          { lat: -24.276247, lng: -69.102337 },
          { lat: -24.276238, lng: -69.102688 },
          { lat: -24.276733, lng: -69.10268 }
        ],
        tipo: 'poligono',
        name: 'Chancado',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.278729, lng: -69.097176 },
          { lat: -24.278726, lng: -69.097284 },
          { lat: -24.278888, lng: -69.097279 },
          { lat: -24.27889, lng: -69.097173 }
        ],
        tipo: 'poligono',
        name: 'Chancado primario',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.27853, lng: -69.098947 },
          { lat: -24.278544, lng: -69.100552 },
          { lat: -24.279089, lng: -69.10053 },
          { lat: -24.279097, lng: -69.098928 }
        ],
        tipo: 'poligono',
        name: 'Stock Pile',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.27272, lng: -69.102324 },
          { lat: -24.272705, lng: -69.102709 },
          { lat: -24.272917, lng: -69.10272 },
          { lat: -24.272927, lng: -69.102336 }
        ],
        tipo: 'poligono',
        name: 'Silo Finos',
        peligro: ['Energía Neumática'],
        visible: true
      },
      {
        paths: [
          { lat: -24.27272, lng: -69.102324 },
          { lat: -24.272501, lng: -69.102324 },
          { lat: -24.272501, lng: -69.102577 },
          { lat: -24.27272, lng: -69.102584 }
        ],
        tipo: 'poligono',
        name: 'Tambores aglomeradores',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.275569, lng: -69.097058 },
          { lat: -24.275429, lng: -69.097224 },
          { lat: -24.275497, lng: -69.097285 },
          { lat: -24.275629, lng: -69.097119 }
        ],
        tipo: 'poligono',
        name: 'Estación de Bombeo',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.274858, lng: -69.097903 },
          { lat: -24.274721, lng: -69.098073 },
          { lat: -24.274792, lng: -69.098144 },
          { lat: -24.274924, lng: -69.097983 }
        ],
        tipo: 'poligono',
        name: 'Estación de Bombeo ILS',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.274361, lng: -69.098421 },
          { lat: -24.2742, lng: -69.098594 },
          { lat: -24.274283, lng: -69.098694 },
          { lat: -24.274443, lng: -69.098534 }
        ],
        tipo: 'poligono',
        name: 'Estación de Bombeo PLS',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.257098, lng: -69.102834 },
          { lat: -24.257017, lng: -69.102833 },
          { lat: -24.257015, lng: -69.103038 },
          { lat: -24.257097, lng: -69.103037 }
        ],
        tipo: 'poligono',
        name: 'Estación Booster',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.257063, lng: -69.10325 },
          { lat: -24.256911, lng: -69.103248 },
          { lat: -24.256912, lng: -69.103312 },
          { lat: -24.257065, lng: -69.103316 }
        ],
        tipo: 'poligono',
        name: 'Bomas de Refino',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.25356, lng: -69.105855 },
          { lat: -24.253368, lng: -69.105722 },
          { lat: -24.253218, lng: -69.105964 },
          { lat: -24.253407, lng: -69.106093 }
        ],
        tipo: 'poligono',
        name: 'TK de Combustible',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.253799, lng: -69.094658 },
          { lat: -24.253797, lng: -69.095747 },
          { lat: -24.254235, lng: -69.095758 },
          { lat: -24.254233, lng: -69.094648 }
        ],
        tipo: 'poligono',
        name: 'Estanques de Ácido Sulfúrico',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.25252, lng: -69.096835 },
          { lat: -24.252173, lng: -69.104413 },
          { lat: -24.253257, lng: -69.104473 },
          { lat: -24.253612, lng: -69.096896 }
        ],
        tipo: 'poligono',
        name: 'Electrowinning',
        peligro: ['Energía Oleo-hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.278814, lng: -69.097269 },
          { lat: -24.278793, lng: -69.098989 }
        ],
        tipo: 'linea',
        name: 'Correas transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.278834, lng: -69.100682 },
          { lat: -24.2788, lng: -69.101302 },
          { lat: -24.278785, lng: -69.101723 },
          { lat: -24.278774, lng: -69.102483 },
          { lat: -24.278072, lng: -69.102486 },
          { lat: -24.277531, lng: -69.102442 },
          { lat: -24.276657, lng: -69.102411 }
        ],
        tipo: 'linea',
        name: 'Correas transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.278172, lng: -69.10256 },
          { lat: -24.277065, lng: -69.102614 },
          { lat: -24.276653, lng: -69.102605 }
        ],
        tipo: 'linea',
        name: 'Correas transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.27637, lng: -69.102455 },
          { lat: -24.275997, lng: -69.102476 },
          { lat: -24.275738, lng: -69.102481 },
          { lat: -24.274449, lng: -69.10249 },
          { lat: -24.273908, lng: -69.102524 },
          { lat: -24.273227, lng: -69.102546 },
          { lat: -24.272748, lng: -69.102595 }
        ],
        tipo: 'linea',
        name: 'Correas transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.272544, lng: -69.102565 },
          { lat: -24.272539, lng: -69.102913 },
          { lat: -24.271977, lng: -69.102925 },
          { lat: -24.271612, lng: -69.102929 },
          { lat: -24.271377, lng: -69.102926 },
          { lat: -24.270693, lng: -69.102939 },
          { lat: -24.270324, lng: -69.102933 },
          { lat: -24.269308, lng: -69.102949 },
          { lat: -24.268873, lng: -69.102954 },
          { lat: -24.268334, lng: -69.102943 },
          { lat: -24.267699, lng: -69.102949 },
          { lat: -24.267295, lng: -69.102955 },
          { lat: -24.266388, lng: -69.10296 },
          { lat: -24.266068, lng: -69.102955 },
          { lat: -24.265562, lng: -69.102969 },
          { lat: -24.264819, lng: -69.102966 },
          { lat: -24.264289, lng: -69.102986 },
          { lat: -24.263861, lng: -69.102983 },
          { lat: -24.263324, lng: -69.10297 },
          { lat: -24.262819, lng: -69.102983 },
          { lat: -24.261193, lng: -69.102996 },
          { lat: -24.260528, lng: -69.103008 },
          { lat: -24.259567, lng: -69.103019 },
          { lat: -24.259276, lng: -69.103023 },
          { lat: -24.258802, lng: -69.10302 },
          { lat: -24.258319, lng: -69.103051 },
          { lat: -24.257878, lng: -69.103033 },
          { lat: -24.257881, lng: -69.103689 },
          { lat: -24.257887, lng: -69.104173 },
          { lat: -24.257878, lng: -69.104654 },
          { lat: -24.257879, lng: -69.105472 },
          { lat: -24.257873, lng: -69.106525 }
        ],
        tipo: 'linea',
        name: 'Correas transportadoras post-aglomeradores',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.27547, lng: -69.097396 },
          { lat: -24.274957, lng: -69.098029 },
          { lat: -24.274488, lng: -69.098634 },
          { lat: -24.273831, lng: -69.099297 },
          { lat: -24.273649, lng: -69.099298 },
          { lat: -24.273496, lng: -69.09943 },
          { lat: -24.273429, lng: -69.099458 },
          { lat: -24.273359, lng: -69.099483 },
          { lat: -24.273256, lng: -69.099492 },
          { lat: -24.273157, lng: -69.099474 },
          { lat: -24.272951, lng: -69.099424 },
          { lat: -24.272846, lng: -69.099438 },
          { lat: -24.272732, lng: -69.09949 },
          { lat: -24.272412, lng: -69.099767 },
          { lat: -24.270677, lng: -69.101242 },
          { lat: -24.269723, lng: -69.10206 },
          { lat: -24.268734, lng: -69.102054 },
          { lat: -24.267485, lng: -69.102049 },
          { lat: -24.265944, lng: -69.102038 },
          { lat: -24.265094, lng: -69.10208 },
          { lat: -24.263936, lng: -69.102059 },
          { lat: -24.262312, lng: -69.102043 },
          { lat: -24.26073, lng: -69.10206 },
          { lat: -24.260136, lng: -69.102073 },
          { lat: -24.258269, lng: -69.102044 },
          { lat: -24.257983, lng: -69.102033 },
          { lat: -24.257499, lng: -69.102031 },
          { lat: -24.257481, lng: -69.10346 },
          { lat: -24.257365, lng: -69.103449 },
          { lat: -24.257339, lng: -69.103467 },
          { lat: -24.257235, lng: -69.103469 },
          { lat: -24.25721, lng: -69.104553 },
          { lat: -24.256528, lng: -69.104548 },
          { lat: -24.256519, lng: -69.104341 },
          { lat: -24.256617, lng: -69.10434 }
        ],
        tipo: 'linea',
        name: 'Transporte de Refino',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.257058, lng: -69.103252 },
          { lat: -24.257083, lng: -69.102032 },
          { lat: -24.257503, lng: -69.102014 },
          { lat: -24.257496, lng: -69.103499 },
          { lat: -24.25736, lng: -69.106332 },
          { lat: -24.256335, lng: -69.106339 },
          { lat: -24.255614, lng: -69.106353 },
          { lat: -24.254899, lng: -69.106339 },
          { lat: -24.253815, lng: -69.106331 },
          { lat: -24.252317, lng: -69.106331 },
          { lat: -24.251235, lng: -69.106346 },
          { lat: -24.250875, lng: -69.106339 },
          { lat: -24.25069, lng: -69.106328 },
          { lat: -24.250519, lng: -69.1063 },
          { lat: -24.250166, lng: -69.106215 },
          { lat: -24.24967, lng: -69.106117 },
          { lat: -24.249452, lng: -69.106106 },
          { lat: -24.248673, lng: -69.106097 },
          { lat: -24.248562, lng: -69.106343 },
          { lat: -24.248316, lng: -69.107056 },
          { lat: -24.248077, lng: -69.107801 },
          { lat: -24.247778, lng: -69.108912 },
          { lat: -24.247004, lng: -69.112288 },
          { lat: -24.246824, lng: -69.113037 },
          { lat: -24.246653, lng: -69.113809 },
          { lat: -24.246557, lng: -69.114196 },
          { lat: -24.246459, lng: -69.114567 },
          { lat: -24.246217, lng: -69.115437 },
          { lat: -24.245916, lng: -69.116501 },
          { lat: -24.243794, lng: -69.124113 },
          { lat: -24.240611, lng: -69.127207 },
          { lat: -24.239064, lng: -69.15884 },
          { lat: -24.236443, lng: -69.161412 },
          { lat: -24.236415, lng: -69.162067 }
        ],
        tipo: 'linea',
        name: 'Transporte de Refino',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.239649, lng: -69.127818 },
          { lat: -24.239124, lng: -69.128523 },
          { lat: -24.239796, lng: -69.129129 },
          { lat: -24.240323, lng: -69.128433 }
        ],
        tipo: 'poligono',
        name: 'Piscina Refino',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.240611, lng: -69.127207 },
          { lat: -24.240436, lng: -69.127378 },
          { lat: -24.239892, lng: -69.128122 }
        ],
        tipo: 'linea',
        name: 'Transporte de Refino',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.232044, lng: -69.14054 },
          { lat: -24.231219, lng: -69.157021 },
          { lat: -24.231501, lng: -69.158764 },
          { lat: -24.232203, lng: -69.159881 },
          { lat: -24.233244, lng: -69.160783 },
          { lat: -24.234504, lng: -69.161138 },
          { lat: -24.23602, lng: -69.160948 },
          { lat: -24.237212, lng: -69.160369 },
          { lat: -24.238313, lng: -69.158888 },
          { lat: -24.238675, lng: -69.15749 },
          { lat: -24.239452, lng: -69.140898 },
          { lat: -24.239046, lng: -69.139038 },
          { lat: -24.238233, lng: -69.137828 },
          { lat: -24.236955, lng: -69.136923 },
          { lat: -24.235811, lng: -69.136664 },
          { lat: -24.234156, lng: -69.136962 },
          { lat: -24.233246, lng: -69.137613 },
          { lat: -24.23238, lng: -69.138851 }
        ],
        tipo: 'poligono',
        name: 'Óxido de Lixiviación PAD 3',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.235163, lng: -69.162007 },
          { lat: -24.235128, lng: -69.162939 },
          { lat: -24.236374, lng: -69.16301 },
          { lat: -24.236416, lng: -69.162088 }
        ],
        tipo: 'poligono',
        name: 'Piscina de ILS',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.235133, lng: -69.163013 },
          { lat: -24.235083, lng: -69.163928 },
          { lat: -24.236302, lng: -69.163996 },
          { lat: -24.236356, lng: -69.163085 }
        ],
        tipo: 'poligono',
        name: 'Piscina de PLS',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.236498, lng: -69.162918 },
          { lat: -24.236435, lng: -69.163996 },
          { lat: -24.237418, lng: -69.164049 },
          { lat: -24.237475, lng: -69.162977 }
        ],
        tipo: 'poligono',
        name: 'Piscina de Emergencia 1',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.236535, lng: -69.161735 },
          { lat: -24.236469, lng: -69.162844 },
          { lat: -24.237491, lng: -69.162906 },
          { lat: -24.237545, lng: -69.161796 }
        ],
        tipo: 'poligono',
        name: 'Piscina de Emergencia 2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.237852, lng: -69.163948 },
          { lat: -24.237795, lng: -69.165009 },
          { lat: -24.238739, lng: -69.165063 },
          { lat: -24.238794, lng: -69.163996 }
        ],
        tipo: 'poligono',
        name: 'Piscina Botadero Ripios',
        peligro: ['Energía Hidráulica'],
        visible: true
      }
    ]
  },
  {
    // Chancado y Correas
    nombre: 'Chancado y Correas',
    centro: { lat: -24.272899, lng: -69.050887 },
    zoom: 17,
    areas: [
      {
        paths: [
          { lat: -24.272538, lng: -69.047999 },
          { lat: -24.272957, lng: -69.047803 },
          { lat: -24.272837, lng: -69.047459 },
          { lat: -24.272421, lng: -69.047647 }
        ],
        tipo: 'poligono',
        name: 'Chancado',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.271531, lng: -69.048313 },
          { lat: -24.271673, lng: -69.048546 },
          { lat: -24.272017, lng: -69.04826 },
          { lat: -24.271853, lng: -69.048027 }
        ],
        tipo: 'poligono',
        name: 'Chancado',
        peligro: [
          'Energía Hidráulica',
          'Energía Oleo-hidráulica',
          'Energía Neumática',
          'Energía Térmica',
          'Energía Mecánica'
        ],
        visible: true
      },
      {
        paths: [
          { lat: -24.271824, lng: -69.048299 },
          { lat: -24.272251, lng: -69.048886 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.272664, lng: -69.047725 },
          { lat: -24.272997, lng: -69.048721 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.272891, lng: -69.048718 },
          { lat: -24.273042, lng: -69.048972 },
          { lat: -24.273304, lng: -69.049377 },
          { lat: -24.273627, lng: -69.049833 },
          { lat: -24.273768, lng: -69.050021 },
          { lat: -24.274322, lng: -69.050721 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.272309, lng: -69.04878 },
          { lat: -24.272542, lng: -69.04906 },
          { lat: -24.272687, lng: -69.049251 },
          { lat: -24.272877, lng: -69.049527 },
          { lat: -24.272998, lng: -69.049726 },
          { lat: -24.273281, lng: -69.050249 },
          { lat: -24.273665, lng: -69.051 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.273429, lng: -69.049627 },
          { lat: -24.273673, lng: -69.050077 },
          { lat: -24.273858, lng: -69.050416 },
          { lat: -24.274211, lng: -69.051028 },
          { lat: -24.274522, lng: -69.055436 },
          { lat: -24.273996, lng: -69.055789 },
          { lat: -24.273575, lng: -69.056061 },
          { lat: -24.272866, lng: -69.056507 },
          { lat: -24.272679, lng: -69.056636 },
          { lat: -24.272447, lng: -69.056809 },
          { lat: -24.272026, lng: -69.057139 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.273067, lng: -69.04974 },
          { lat: -24.273442, lng: -69.050262 },
          { lat: -24.273685, lng: -69.050601 },
          { lat: -24.274094, lng: -69.051158 },
          { lat: -24.274409, lng: -69.055525 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.274516, lng: -69.055282 },
          { lat: -24.27425, lng: -69.055421 },
          { lat: -24.273891, lng: -69.055608 },
          { lat: -24.273562, lng: -69.05577 },
          { lat: -24.273206, lng: -69.055937 },
          { lat: -24.272853, lng: -69.056105 },
          { lat: -24.272537, lng: -69.056253 },
          { lat: -24.272359, lng: -69.05635 },
          { lat: -24.27189, lng: -69.056615 },
          { lat: -24.271501, lng: -69.056805 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.271911, lng: -69.057232 },
          { lat: -24.271778, lng: -69.056963 },
          { lat: -24.2716, lng: -69.056627 },
          { lat: -24.271463, lng: -69.056399 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.270413, lng: -69.054467 },
          { lat: -24.270602, lng: -69.054305 },
          { lat: -24.270749, lng: -69.054165 },
          { lat: -24.271199, lng: -69.053701 },
          { lat: -24.271902, lng: -69.053 },
          { lat: -24.272294, lng: -69.052592 },
          { lat: -24.272679, lng: -69.052202 },
          { lat: -24.272936, lng: -69.051949 },
          { lat: -24.273232, lng: -69.051657 },
          { lat: -24.273471, lng: -69.051413 },
          { lat: -24.2737, lng: -69.051178 },
          { lat: -24.27386, lng: -69.051006 },
          { lat: -24.273993, lng: -69.050879 },
          { lat: -24.274518, lng: -69.050365 },
          { lat: -24.275053, lng: -69.049845 },
          { lat: -24.275834, lng: -69.049107 },
          { lat: -24.276409, lng: -69.048583 },
          { lat: -24.276998, lng: -69.048037 },
          { lat: -24.278415, lng: -69.046815 },
          { lat: -24.279858, lng: -69.045625 },
          { lat: -24.28133, lng: -69.044456 },
          { lat: -24.282806, lng: -69.043363 },
          { lat: -24.28433, lng: -69.042295 },
          { lat: -24.285872, lng: -69.041294 },
          { lat: -24.287418, lng: -69.040334 },
          { lat: -24.289012, lng: -69.039386 },
          { lat: -24.290619, lng: -69.038484 },
          { lat: -24.292236, lng: -69.037604 },
          { lat: -24.293887, lng: -69.036738 },
          { lat: -24.294658, lng: -69.036384 },
          { lat: -24.295532, lng: -69.036031 },
          { lat: -24.296981, lng: -69.035433 },
          { lat: -24.297425, lng: -69.035258 },
          { lat: -24.298055, lng: -69.034995 },
          { lat: -24.298776, lng: -69.034714 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.26437, lng: -69.060401 },
          { lat: -24.267429, lng: -69.05926 },
          { lat: -24.268722, lng: -69.057091 },
          { lat: -24.269491, lng: -69.055871 },
          { lat: -24.271011, lng: -69.053485 },
          { lat: -24.271538, lng: -69.053088 },
          { lat: -24.271998, lng: -69.052754 },
          { lat: -24.272858, lng: -69.052102 },
          { lat: -24.273207, lng: -69.051845 },
          { lat: -24.273784, lng: -69.051246 },
          { lat: -24.274112, lng: -69.050912 },
          { lat: -24.274566, lng: -69.050466 },
          { lat: -24.275153, lng: -69.049899 },
          { lat: -24.275904, lng: -69.049189 },
          { lat: -24.276464, lng: -69.048676 },
          { lat: -24.276965, lng: -69.048207 },
          { lat: -24.278454, lng: -69.046913 },
          { lat: -24.279779, lng: -69.045819 },
          { lat: -24.281374, lng: -69.044552 },
          { lat: -24.282717, lng: -69.04356 },
          { lat: -24.284318, lng: -69.042433 },
          { lat: -24.285369, lng: -69.041743 },
          { lat: -24.287961, lng: -69.040129 },
          { lat: -24.288669, lng: -69.039719 },
          { lat: -24.288868, lng: -69.039613 },
          { lat: -24.289093, lng: -69.039461 },
          { lat: -24.290509, lng: -69.038669 },
          { lat: -24.292297, lng: -69.037693 },
          { lat: -24.293771, lng: -69.036915 },
          { lat: -24.294287, lng: -69.036668 },
          { lat: -24.294925, lng: -69.036384 },
          { lat: -24.29573, lng: -69.036067 },
          { lat: -24.296863, lng: -69.035604 },
          { lat: -24.297818, lng: -69.035217 },
          { lat: -24.2985, lng: -69.034956 },
          { lat: -24.298911, lng: -69.034784 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.264336, lng: -69.06025 },
          { lat: -24.267429, lng: -69.05926 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.298419, lng: -69.034575 },
          { lat: -24.299043, lng: -69.034859 },
          { lat: -24.300077, lng: -69.035314 },
          { lat: -24.301172, lng: -69.035799 },
          { lat: -24.302809, lng: -69.036519 },
          { lat: -24.30444, lng: -69.037233 },
          { lat: -24.306071, lng: -69.037927 },
          { lat: -24.307703, lng: -69.038637 },
          { lat: -24.309334, lng: -69.039317 },
          { lat: -24.310944, lng: -69.040027 },
          { lat: -24.312571, lng: -69.040746 },
          { lat: -24.314217, lng: -69.041481 },
          { lat: -24.315845, lng: -69.042199 },
          { lat: -24.317464, lng: -69.042909 },
          { lat: -24.319085, lng: -69.043625 },
          { lat: -24.32073, lng: -69.044363 },
          { lat: -24.322363, lng: -69.045088 },
          { lat: -24.323952, lng: -69.045782 },
          { lat: -24.325585, lng: -69.046497 },
          { lat: -24.326113, lng: -69.04673 },
          { lat: -24.327224, lng: -69.047225 },
          { lat: -24.328861, lng: -69.047955 },
          { lat: -24.329866, lng: -69.0484 },
          { lat: -24.33049, lng: -69.048667 },
          { lat: -24.330715, lng: -69.048757 },
          { lat: -24.33105, lng: -69.048915 },
          { lat: -24.331204, lng: -69.049017 },
          { lat: -24.331651, lng: -69.049283 },
          { lat: -24.332486, lng: -69.049768 },
          { lat: -24.33404, lng: -69.050682 },
          { lat: -24.336079, lng: -69.051868 },
          { lat: -24.336635, lng: -69.052202 },
          { lat: -24.338584, lng: -69.053339 },
          { lat: -24.339576, lng: -69.053931 },
          { lat: -24.339853, lng: -69.054085 },
          { lat: -24.340164, lng: -69.054255 },
          { lat: -24.340443, lng: -69.054425 },
          { lat: -24.341073, lng: -69.054797 },
          { lat: -24.341752, lng: -69.055197 },
          { lat: -24.342588, lng: -69.055678 },
          { lat: -24.343862, lng: -69.056417 },
          { lat: -24.344848, lng: -69.057003 },
          { lat: -24.34558, lng: -69.057429 },
          { lat: -24.34643, lng: -69.057921 },
          { lat: -24.346173, lng: -69.058343 },
          { lat: -24.345883, lng: -69.058726 },
          { lat: -24.345795, lng: -69.058851 },
          { lat: -24.34565, lng: -69.059093 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.298504, lng: -69.034673 },
          { lat: -24.298708, lng: -69.034772 },
          { lat: -24.298897, lng: -69.034869 },
          { lat: -24.299041, lng: -69.034948 },
          { lat: -24.299552, lng: -69.035193 },
          { lat: -24.300214, lng: -69.03552 },
          { lat: -24.301868, lng: -69.036337 },
          { lat: -24.303499, lng: -69.037136 },
          { lat: -24.305155, lng: -69.037937 },
          { lat: -24.306808, lng: -69.038741 },
          { lat: -24.308358, lng: -69.039411 },
          { lat: -24.310044, lng: -69.040247 },
          { lat: -24.311725, lng: -69.041087 },
          { lat: -24.313379, lng: -69.041912 },
          { lat: -24.315017, lng: -69.042715 },
          { lat: -24.316655, lng: -69.043517 },
          { lat: -24.318301, lng: -69.044336 },
          { lat: -24.319944, lng: -69.045145 },
          { lat: -24.321593, lng: -69.045953 },
          { lat: -24.323263, lng: -69.046783 },
          { lat: -24.324865, lng: -69.047562 },
          { lat: -24.326534, lng: -69.048392 },
          { lat: -24.327261, lng: -69.048753 },
          { lat: -24.328152, lng: -69.049183 },
          { lat: -24.328751, lng: -69.049473 },
          { lat: -24.329178, lng: -69.049681 },
          { lat: -24.329296, lng: -69.049774 },
          { lat: -24.329511, lng: -69.049929 },
          { lat: -24.330159, lng: -69.050384 },
          { lat: -24.330727, lng: -69.050787 },
          { lat: -24.332225, lng: -69.051848 },
          { lat: -24.333751, lng: -69.052909 },
          { lat: -24.334726, lng: -69.053567 },
          { lat: -24.335475, lng: -69.054049 },
          { lat: -24.336164, lng: -69.054481 },
          { lat: -24.336766, lng: -69.054854 },
          { lat: -24.337522, lng: -69.055334 },
          { lat: -24.338456, lng: -69.055934 },
          { lat: -24.33898, lng: -69.056257 },
          { lat: -24.339888, lng: -69.05683 },
          { lat: -24.340523, lng: -69.057222 },
          { lat: -24.340796, lng: -69.057394 },
          { lat: -24.341128, lng: -69.057594 },
          { lat: -24.341704, lng: -69.057938 },
          { lat: -24.341986, lng: -69.058105 },
          { lat: -24.342298, lng: -69.058292 },
          { lat: -24.342866, lng: -69.058652 },
          { lat: -24.344271, lng: -69.059488 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.27166, lng: -69.054212 },
          { lat: -24.271347, lng: -69.053872 },
          { lat: -24.27101, lng: -69.053483 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.270793, lng: -69.054736 },
          { lat: -24.27056, lng: -69.054235 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -24.270709, lng: -69.054943 },
          { lat: -24.268571, lng: -69.054483 },
          { lat: -24.267995, lng: -69.054371 },
          { lat: -24.267705, lng: -69.05432 },
          { lat: -24.267239, lng: -69.054213 },
          { lat: -24.265621, lng: -69.053884 },
          { lat: -24.265227, lng: -69.05382 },
          { lat: -24.264463, lng: -69.053679 },
          { lat: -24.263822, lng: -69.053542 },
          { lat: -24.26307, lng: -69.053394 },
          { lat: -24.262274, lng: -69.053263 },
          { lat: -24.261836, lng: -69.053179 },
          { lat: -24.261394, lng: -69.053085 },
          { lat: -24.260668, lng: -69.052974 },
          { lat: -24.259909, lng: -69.052833 },
          { lat: -24.258145, lng: -69.0525 },
          { lat: -24.257488, lng: -69.052362 },
          { lat: -24.256772, lng: -69.052208 },
          { lat: -24.256559, lng: -69.05215 },
          { lat: -24.2564, lng: -69.052096 },
          { lat: -24.256105, lng: -69.052003 },
          { lat: -24.255613, lng: -69.051868 },
          { lat: -24.255187, lng: -69.051741 },
          { lat: -24.25471, lng: -69.051572 },
          { lat: -24.253721, lng: -69.051188 },
          { lat: -24.253001, lng: -69.05089 },
          { lat: -24.252071, lng: -69.050448 },
          { lat: -24.251366, lng: -69.050102 },
          { lat: -24.249775, lng: -69.049215 },
          { lat: -24.248182, lng: -69.048336 },
          { lat: -24.246592, lng: -69.047426 },
          { lat: -24.245631, lng: -69.046889 },
          { lat: -24.245002, lng: -69.046519 },
          { lat: -24.244486, lng: -69.046244 },
          { lat: -24.243868, lng: -69.045921 },
          { lat: -24.243411, lng: -69.045647 },
          { lat: -24.24224, lng: -69.044999 },
          { lat: -24.241824, lng: -69.044748 },
          { lat: -24.240973, lng: -69.044281 },
          { lat: -24.240232, lng: -69.043863 },
          { lat: -24.238623, lng: -69.042969 },
          { lat: -24.237008, lng: -69.042068 },
          { lat: -24.235693, lng: -69.041349 },
          { lat: -24.234852, lng: -69.040894 },
          { lat: -24.234032, lng: -69.040425 },
          { lat: -24.233017, lng: -69.039897 },
          { lat: -24.232585, lng: -69.039698 },
          { lat: -24.232222, lng: -69.039546 },
          { lat: -24.231293, lng: -69.039167 },
          { lat: -24.230346, lng: -69.038835 },
          { lat: -24.228986, lng: -69.038384 },
          { lat: -24.228547, lng: -69.038257 },
          { lat: -24.228349, lng: -69.038208 },
          { lat: -24.227381, lng: -69.037988 },
          { lat: -24.226575, lng: -69.037835 },
          { lat: -24.225568, lng: -69.037682 },
          { lat: -24.224774, lng: -69.037582 },
          { lat: -24.222999, lng: -69.03742 },
          { lat: -24.221826, lng: -69.037317 },
          { lat: -24.221195, lng: -69.037251 },
          { lat: -24.219391, lng: -69.037087 },
          { lat: -24.21858, lng: -69.037018 },
          { lat: -24.218012, lng: -69.036964 },
          { lat: -24.217385, lng: -69.036913 }
        ],
        tipo: 'linea',
        name: 'Correas Transportadoras',
        peligro: ['Energía Mecánica'],
        visible: true
      }
    ]
  },
  {
    // Puerto Coloso
    nombre: 'Puerto Coloso',
    centro: { lat: -23.7627, lng: -70.468 },
    zoom: 16,
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
        peligro: ['Energía Hidráulica', 'Energía Mecánica'],
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
        peligro: ['Energía Hidráulica', 'Energía Neumática', 'Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.759526, lng: -70.46721 },
          { lat: -23.759171, lng: -70.467759 },
          { lat: -23.759711, lng: -70.46817 },
          { lat: -23.760077, lng: -70.467646 }
        ],
        tipo: 'poligono',
        name: 'Planta de Filtros',
        peligro: ['Energía Hidráulica', 'Energía Oleo-hidráulica', 'Energía Neumática', 'Energía Mecánica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.760073, lng: -70.467991 },
          { lat: -23.759897, lng: -70.468259 },
          { lat: -23.760182, lng: -70.468468 },
          { lat: -23.760365, lng: -70.468194 }
        ],
        tipo: 'poligono',
        name: 'Recepción de Concentrado',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.759303, lng: -70.46707 },
          { lat: -23.759312, lng: -70.467141 },
          { lat: -23.75941, lng: -70.467127 },
          { lat: -23.759403, lng: -70.467056 }
        ],
        tipo: 'poligono',
        name: 'VS4',
        peligro: ['Energía Hidráulica', 'Energía Neumática'],
        visible: true
      },
      {
        paths: [
          { lat: -23.760697, lng: -70.468315 },
          { lat: -23.761066, lng: -70.467942 },
          { lat: -23.760703, lng: -70.467553 },
          { lat: -23.760368, lng: -70.467915 }
        ],
        tipo: 'poligono',
        name: 'SIN NOMBRE',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.761594, lng: -70.468475 },
          { lat: -23.761956, lng: -70.46809 },
          { lat: -23.761526, lng: -70.467602 },
          { lat: -23.761165, lng: -70.467998 }
        ],
        tipo: 'poligono',
        name: 'Espesadores',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.76116, lng: -70.468173 },
          { lat: -23.760932, lng: -70.468383 },
          { lat: -23.761556, lng: -70.469103 },
          { lat: -23.761793, lng: -70.46888 }
        ],
        tipo: 'poligono',
        name: 'Clarificadores',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.761122, lng: -70.469495 },
          { lat: -23.76112, lng: -70.469637 },
          { lat: -23.761207, lng: -70.469636 },
          { lat: -23.761313, lng: -70.469538 },
          { lat: -23.761274, lng: -70.469498 }
        ],
        tipo: 'poligono',
        name: 'Succión Agua de Mar',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.761366, lng: -70.469483 },
          { lat: -23.761439, lng: -70.469582 },
          { lat: -23.761746, lng: -70.469665 },
          { lat: -23.762046, lng: -70.469999 },
          { lat: -23.762544, lng: -70.469497 },
          { lat: -23.762498, lng: -70.46945 },
          { lat: -23.762208, lng: -70.469448 },
          { lat: -23.76202, lng: -70.46963 },
          { lat: -23.761641, lng: -70.469212 }
        ],
        tipo: 'poligono',
        name: 'Agua Producto',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.762379, lng: -70.469648 },
          { lat: -23.762158, lng: -70.469876 },
          { lat: -23.762286, lng: -70.470021 },
          { lat: -23.762504, lng: -70.469792 }
        ],
        tipo: 'poligono',
        name: 'EB1',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.762683, lng: -70.468923 },
          { lat: -23.762468, lng: -70.469153 },
          { lat: -23.762713, lng: -70.469436 },
          { lat: -23.762946, lng: -70.469209 }
        ],
        tipo: 'poligono',
        name: 'SIN NOMBRE 2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.763896, lng: -70.469802 },
          { lat: -23.76404, lng: -70.469662 },
          { lat: -23.763235, lng: -70.468778 },
          { lat: -23.763072, lng: -70.468893 }
        ],
        tipo: 'poligono',
        name: 'Osmosis inversa',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.763876, lng: -70.469485 },
          { lat: -23.763923, lng: -70.469415 },
          { lat: -23.763467, lng: -70.468877 },
          { lat: -23.763399, lng: -70.46896 }
        ],
        tipo: 'poligono',
        name: 'Planta Química',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.763265, lng: -70.469107 },
          { lat: -23.763185, lng: -70.469187 },
          { lat: -23.763884, lng: -70.469967 },
          { lat: -23.763972, lng: -70.469887 }
        ],
        tipo: 'poligono',
        name: 'Filtros Bicapa',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.763282, lng: -70.471763 },
          { lat: -23.76293, lng: -70.472113 },
          { lat: -23.76312, lng: -70.472344 },
          { lat: -23.763479, lng: -70.471997 }
        ],
        tipo: 'poligono',
        name: 'Succión Agua de Mar',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.763535, lng: -70.471967 },
          { lat: -23.763272, lng: -70.472223 },
          { lat: -23.763353, lng: -70.472318 },
          { lat: -23.763254, lng: -70.472419 },
          { lat: -23.764092, lng: -70.473362 },
          { lat: -23.764455, lng: -70.472995 }
        ],
        tipo: 'poligono',
        name: 'Planta de Osmosis Inversa',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.763947, lng: -70.471656 },
          { lat: -23.763741, lng: -70.471868 },
          { lat: -23.764063, lng: -70.472228 },
          { lat: -23.764274, lng: -70.47202 }
        ],
        tipo: 'poligono',
        name: 'Planta Química',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.764446, lng: -70.471075 },
          { lat: -23.763998, lng: -70.471546 },
          { lat: -23.765069, lng: -70.47278 },
          { lat: -23.765531, lng: -70.472279 }
        ],
        tipo: 'poligono',
        name: 'Filtros Bicapa',
        peligro: ['Energía Hidráulica'],
        visible: true
      }
    ]
  },
  {
    // Estaciones de Válvulas de Mineroducto
    nombre: 'Estaciones de Val. de Mineroducto',
    centro: { lat: -24.027115, lng: -69.770573 },
    zoom: 10,
    areas: [
      {
        paths: [{ lat: -24.262195, lng: -69.057904 }],
        tipo: 'marcador',
        name: 'PS1',
        peligro: ['Energía Neumática', 'Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.339493, lng: -69.063556 }],
        tipo: 'marcador',
        name: 'PS2',
        peligro: ['Energía Neumática', 'Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.206502, lng: -69.263516 }],
        tipo: 'marcador',
        name: 'VS1',
        peligro: ['Energía Neumática', 'Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.1158, lng: -69.427994 }],
        tipo: 'marcador',
        name: 'VS2',
        peligro: ['Energía Neumática', 'Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -23.913215, lng: -69.777652 }],
        tipo: 'marcador',
        name: 'VS3',
        peligro: ['Energía Neumática', 'Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -23.759348, lng: -70.4671 }],
        tipo: 'marcador',
        name: 'VS4',
        peligro: ['Energía Neumática', 'Energía Hidráulica'],
        visible: true
      }
    ]
  },
  {
    // Estaciones de Bombeo de EWS
    nombre: 'Estaciones de Bombeo de EWS',
    centro: { lat: -24.027115, lng: -69.770573 },
    zoom: 10,
    areas: [
      {
        paths: [{ lat: -24.243811, lng: -69.13817 }],
        tipo: 'marcador',
        name: 'EB5',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.213843, lng: -69.259373 }],
        tipo: 'marcador',
        name: 'EB4',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -24.113187, lng: -69.44126 }],
        tipo: 'marcador',
        name: 'EB3',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -23.855694, lng: -69.868344 }],
        tipo: 'marcador',
        name: 'EB2',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [{ lat: -23.762359, lng: -70.46984 }],
        tipo: 'marcador',
        name: 'EB1',
        peligro: ['Energía Hidráulica'],
        visible: true
      },
      {
        paths: [
          { lat: -23.762359, lng: -70.46984 },
          { lat: -23.761915, lng: -70.467241 },
          { lat: -23.762138, lng: -70.465811 },
          { lat: -23.761601, lng: -70.461303 },
          { lat: -23.76648, lng: -70.434234 },
          { lat: -23.788646, lng: -70.416792 },
          { lat: -23.775134, lng: -70.322027 },
          { lat: -23.746732, lng: -70.22635 },
          { lat: -23.745274, lng: -70.124499 },
          { lat: -23.768863, lng: -70.053259 },
          { lat: -23.788017, lng: -69.970321 },
          { lat: -23.855694, lng: -69.868344 },
          { lat: -24.113187, lng: -69.44126 },
          { lat: -24.213843, lng: -69.259373 },
          { lat: -24.243811, lng: -69.13817 }
        ],
        tipo: 'linea',
        name: 'Linea impulsuón EWS',
        peligro: ['Energía Hidráulica'],
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
      plantasVisible: Array(plantas.length).fill(false),
      userLocation: null,
      mapsInstance: null
    }
    this.handlePolygonClick = this.handlePolygonClick.bind(this)
    this.togglePlantaVisibility = this.togglePlantaVisibility.bind(this)
    this.peligroColors = peligroColors
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

  getPolygonCenter(coords) {
    let latitude = 0
    let longitude = 0
    const numCoords = coords.length

    coords.forEach(coord => {
      latitude += coord.lat
      longitude += coord.lng
    })

    return {
      lat: latitude / numCoords,
      lng: longitude / numCoords
    }
  }

  generateInnerPolygons(area, scale) {
    const paths = area.paths
    const innerPaths = []

    const center = this.getPolygonCenter(paths)

    paths.forEach((coord, index) => {
      const deltaX = coord.lng - center.lng
      const deltaY = coord.lat - center.lat

      const innerCoord = {
        lat: center.lat + deltaY * scale,
        lng: center.lng + deltaX * scale
      }
      innerPaths.push(innerCoord)
    })

    return innerPaths
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={apiKey} onLoad={() => this.setState({ mapsInstance: window.google.maps })}>
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
            onLoad={map => {
              this.addLocationButton(map)
            }}
            onClick={this.handleMapClick.bind(this)}
          >
            {plantas.map((planta, plantaIndex) =>
              planta.areas.map((area, areaIndex) => {
                const originalPolygon = (
                  <Polygon
                    key={`${plantaIndex}-${areaIndex}`}
                    paths={area.paths}
                    onClick={e => this.handlePolygonClick(e, area.name)}
                    visible={this.state.plantasVisible[plantaIndex]}
                    options={{
                      fillColor: peligroColors[area.peligro.slice(-1)[0]],
                      fillOpacity: 0.1,
                      strokeColor: peligroColors[area.peligro.slice(-1)[0]],
                      strokeOpacity: 0.5,
                      strokeWeight: 3
                    }}
                  />
                )

                const innerPolygons = area.peligro.slice(0, -1).map((peligro, idx) => {
                  const scale = 1 - (idx + 1) * 0.05
                  const innerPaths = this.generateInnerPolygons(area, scale)

                  return (
                    <Polygon
                      key={`${plantaIndex}-${areaIndex}-${idx}`}
                      paths={innerPaths}
                      onClick={e => this.handlePolygonClick(e, area.name)}
                      visible={this.state.plantasVisible[plantaIndex]}
                      options={{
                        fillColor: this.peligroColors[peligro],
                        fillOpacity: 0.1,
                        strokeColor: this.peligroColors[peligro],
                        strokeOpacity: 0.5,
                        strokeWeight: 3
                      }}
                    />
                  )
                })

                if (area.tipo === 'poligono') {
                  return [originalPolygon, ...innerPolygons]
                } else if (area.tipo === 'linea') {
                  return (
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
                } else if (area.tipo === 'marcador') {
                  return (
                    this.state.mapsInstance && (
                      <Marker
                        key={`${plantaIndex}-${areaIndex}`}
                        position={area.paths[0]}
                        visible={this.state.plantasVisible[plantaIndex]}
                        icon={{
                          url: `data:image/svg+xml,${encodeURIComponent(EB_Icon)}`,
                          anchor: new this.state.mapsInstance.Point(11, 11) // Centrar el icono en el centro del SVG
                        }}
                        onClick={e => this.handlePolylineClick(e, area.name)}
                      />
                    )
                  )
                }
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
