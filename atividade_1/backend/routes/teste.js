import axios from 'axios';

async function getPublicIp() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error("Erro ao pegar IP público:", error);
    return null;
  }
}

// Since top-level await is available in ES modules, you can do:
console.log(await getPublicIp());
