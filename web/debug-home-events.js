
const qs = require('qs');

async function getStrapiData() {
    const baseUrl = 'http://localhost:1337';
    const query = qs.stringify({
        populate: {
            events: {
                populate: 'image'
            },
            animationSection: { populate: 'features' },
            decorIntSection: { populate: 'features' },
            decorExtSection: { populate: 'features' },
            testimonials: true
        },
    });

    const url = `${baseUrl}/api/home-page?${query}`;
    console.log('Fetching:', url);

    try {
        const res = await fetch(url, { cache: 'no-store' });
        const json = await res.json();

        // Log specifically the events and their images
        if (json.data && json.data.events) {
            console.log('Events found:', json.data.events.length);
            json.data.events.forEach((evt, i) => {
                console.log(`Event ${i} [${evt.title}]:`);
                console.log(JSON.stringify(evt.image, null, 2));
            });
        } else {
            console.log('No events found or data structure mismatch');
            console.log(JSON.stringify(json, null, 2));
        }

        // Write to file for agent reading
        const fs = require('fs');
        fs.writeFileSync('debug_events.json', JSON.stringify(json, null, 2));
        console.log('Full response written to debug_events.json');

    } catch (error) {
        console.error('Error:', error);
    }
}

getStrapiData();
