const base = process.env.GH ? '/vuepress/' : '/'

module.exports = {
  // title: 'openHAB',
  description: 'openHAB - a vendor and technology agnostic open source automation software for your home',
  dest: 'vuepress',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  serviceWorker: true,
  themeConfig: {
    logo: `/openhab-logo-top.png`,
    repo: 'openhab',
    editLinks: false,
    docsDir: 'docs',
    nav: [
      {
        text: 'Download',
        link: '/download/',
      },
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Add-on Reference',
        link: '/addons/'
      },
      {
        text: 'myopenHAB',
        link: '/myopenhab/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'User Guide',
          collapsable: false,
          children: [
            '',
            'concepts',
            'installation',
            'tutorial',
            'migrating',
            'configuration',
            'user-interfaces',
            'administration',
            'community'
          ]
        },
        {
          title: 'Developer guide',
          collapsable: true,
          children: [
            'developer',
            'developer-contributing',
            'developer-prerequisites',
            'developer-basics',
            'developer-migrating',
          ]
        }
      ],
      '/addons/': [
        {
          title: 'Bindings',
          collapsible: false,
          children: [
            'bindings/airquality/',
            'bindings/akm8681/',
            'bindings/alarmdecoder1/',
            'bindings/allplay/',
            'bindings/amazondashbutton/',
            'bindings/anel1/',
            'bindings/asterisk1/',
            'bindings/astro/',
            'bindings/astro1/',
            'bindings/atlona/',
            'bindings/autelis/',
            'bindings/autelis1/',
          ]
        },
        {
          title: 'System Integrations',
          collapsible: false,
          children: [
            'integrations/alexa-skill/',
            'integrations/dropbox/',
            'integrations/gcal/',
            'integrations/homekit/',
            'integrations/hueemulation/',
            'integrations/imperihome/',
            'integrations/mycroft-skill/',
            'integrations/openhabcloud/',
          ]
        },
        {
          title: 'Actions',
          collapsible: false,
          children: [
            'actions/astro/',
            'actions/ciscospark/',
            'actions/dscalarm/',
            'actions/ecobee/',
            'actions/harmonyhub/',
            'actions/homematic/',
            'actions/mail/',
            'actions/mios/',
            'actions/mqtt/',
            'actions/nma/',
            'actions/openwebif/',
            'actions/pebble/',
            'actions/prowl/',
            'actions/pushbullet/',
            'actions/pushover/',
            'actions/pushsafer/',
            'actions/satel/',
            'actions/squeezebox/',
            'actions/telegram/',
            'actions/tinkerforge/',
            'actions/twitter/',
            'actions/weather/',
            'actions/xbmc/',
            'actions/xmpp/',
            'actions/xpl/',
          ]                      
        },
        {
          title: 'Voice',
          collapsible: false,
          children: [
            'voice/mactts/',
            'voice/marytts/',
            'voice/voicerss/',
          ]
        }
        
      ]
    }
  }
}
