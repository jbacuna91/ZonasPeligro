const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    },
    {
      path: '/mapa',
      title: 'Mapa',
      icon: 'mdi:map-marker'
    },
    {
      path: '/mapa_v2',
      title: 'Mapa v2',
      icon: 'mdi:map-marker'
    },
    {
      path: '/cuadro_resumen',
      title: 'Cuadro Resumen',
      icon: 'mdi:grid'
    },
    {
      path: '/mapa_mp',
      title: 'Mapa MP',
      icon: 'mdi:map-marker'
    }
  ]
}

export default navigation
