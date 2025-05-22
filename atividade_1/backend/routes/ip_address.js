function ip_address() {

  const os = require('os');

  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // console.log('IP local:', iface.address);
        return iface.address
      }
    }
  }

}

export default ip_address
