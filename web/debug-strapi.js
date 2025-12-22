
async function debugHomePage() {
    const urlPublished = 'http://localhost:1337/api/home-page?populate[events][populate]=*';

    try {
        console.log('--- Checking PUBLISHED State (Detailed) ---');
        const res = await fetch(urlPublished);
        const data = await res.json();

        if (data.data) {
            const events = data.data.events || data.data.attributes?.events;
            console.log(`Events found: ${events ? events.length : 0}`);
            if (events && events.length > 0) {
                console.log('First Event Image Object:', JSON.stringify(events[0].image, null, 2));
            }
        } else {
            console.log('No data found:', data);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

debugHomePage();
