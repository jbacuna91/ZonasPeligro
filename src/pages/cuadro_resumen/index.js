// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'

const columns = [
  {
    minWidth: 200,
    field: 'avatar',
    headerName: 'Energía Predominante',
    renderCell: params => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <img src={params.value} alt='avatar' style={{ width: '100px', height: '100px', borderRadius: '0%' }} />
      </div>
    )
  },
  {
    flex: 0.15,
    minWidth: 300,
    field: 'equipos',
    headerName: 'Equipos y dispositivos de referencia',
    renderCell: params => (
      <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <ul>
          {params.value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  },
  {
    flex: 0.15,
    minWidth: 300,
    field: 'formas',
    headerName: 'Formas de liberación de energía',
    renderCell: params => (
      <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <ul>
          {params.value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
]

const rows = [
  {
    id: 1,
    avatar: '/images/avatars/mecanica.png',
    equipos: [
      'Elementos tensionados: Corazas feeder, paneles estructurales, resortes, pernos, lanzas.',
      'Elementos utilizados para Tiro y arrastre: Estrobos, eslingas, ganchos, grilletes.',
      'Elementos de Protección: Guarda acoples.'
    ],
    formas: [
      'La energía Potencial acumulada en los cuerpos debido a la Tensión y/o compresión, se libera mediante la “relajación” de los mismos.',
      'La energía potencial se puede transformar en energía cinética y se puede manifestar en forma de movimiento (eyección de acoples o componentes).'
    ]
  },
  {
    id: 2,
    avatar: '/images/avatars/hidraulica.png',
    equipos: [
      'Bombas Centrífugas Horizontales, Verticales.',
      'Bombas desplazamiento positivo.',
      'Válvulas',
      'Recipientes a presión (Filtros, Estanques, Tuberías).'
    ],
    formas: [
      'La energía liberada se manifiesta como impulsión o eyección del fluido presurizado.',
      'Energía mecánica residual, durante proceso de despresurización o despiche, que produzca movimiento no deseado y riesgoso de componentes.'
    ]
  },
  {
    id: 3,
    avatar: '/images/avatars/oleo-hidraulica.png',
    equipos: [
      'Sistema de elevación.',
      'Unidad hidráulica de para accionamiento actuadores.',
      'Unidad de lubricación (Bombas volumétricas).',
      'Herramientas oleo-hidráulicas.'
    ],
    formas: [
      'La energía liberada se manifiesta como impulsión o eyección del fluido presurizado.',
      'Energía mecánica residual, durante proceso de despresurización o despiche, que produzca movimiento no deseado y riesgoso de componentes.'
    ]
  },
  {
    id: 4,
    avatar: '/images/avatars/neumatica.png',
    equipos: [
      'Acumuladores y Compresores de aire.',
      'Manómetros, Válvulas de seguridad y Reguladores de presión.',
      'Líneas de aire y Mangueras flexibles.',
      'Herramientas neumáticas.',
      'Lanzas de aire.'
    ],
    formas: [
      'La energía liberada se manifiesta como impulsión o eyección del fluido presurizado.',
      'Energía mecánica residual, durante proceso de despresurización o despiche, que produzca movimiento no deseado y riesgoso de componentes.'
    ]
  },
  {
    id: 5,
    avatar: '/images/avatars/termica.png',
    equipos: ['Calderas.', 'Intercambiadores de calor.', 'Líneas de vapor.', 'Equipos oxicorte'],
    formas: [
      'La energía liberada se manifiesta como impulsión o eyección del fluido presurizado a alta temperatura.',
      'Energía mecánica residual, durante proceso de despresurización o despiche, que produzca movimiento no deseado y riesgoso de componentes.'
    ]
  }
]

const cuadroResumen = () => {
  return (
    <Grid container spacing={6}>
      <Grid>
        <Card>
          <CardHeader title='Cuadro resumen de equipos de referencia según Energías potencialmente liberadas durante actividades de operación y/o mantenimiento de sistemas.' />
          <Box sx={{ height: 850 }}>
            <DataGrid columns={columns} rows={rows.slice(0, 10)} rowHeight={'auto'} disableColumnMenu />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default cuadroResumen
