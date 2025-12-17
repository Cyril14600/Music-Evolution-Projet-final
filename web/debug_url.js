const http = require('http');

http.get('http://localhost:3000/api/debug-partners', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.data && json.data.length > 0) {
                const p = json.data[0];
                let url;
                if (Array.isArray(p.logo)) url = p.logo[0].url;
                else url = p.logo.url; // Flattened
                // Try invalid legacy path too just in case
                if (!url && p.logo && p.logo.data && p.logo.data.attributes) url = p.logo.data.attributes.url;

                console.log("FINAL URL: " + url);
                console.log("RAW LOGO: " + JSON.stringify(p.logo));
            } else {
                console.log("NO DATA or EMPTY ARRAY");
                console.log(JSON.stringify(json));
            }
        } catch (e) {
            console.error(e);
            console.log(data);
        }
    });
}).on('error', (e) => {
    console.error("HTTP ERROR: " + e.message);
});
