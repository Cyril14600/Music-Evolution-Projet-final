const fs = require('fs');

async function fetchData() {
    try {
        const res = await fetch('http://localhost:1337/api/partners?populate=*');
        const data = await res.json();
        fs.writeFileSync('strapi_debug_partners.json', JSON.stringify(data, null, 2));
        console.log('Data saved to strapi_debug_partners.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();
