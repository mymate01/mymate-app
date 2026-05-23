// A simple Node.js script to fetch a Linear ticket by its ID 
// Usage: node scripts/linear-fetch.js MYM-12
// Requires LINEAR_API_KEY environment variable.

const https = require('https');

const ticketId = process.argv[2];
const apiKey = process.env.LINEAR_API_KEY;

if (!ticketId) {
    console.error("Error: Please provide a ticket ID (e.g., node linear-fetch.js MYM-12)");
    process.exit(1);
}

if (!apiKey) {
    console.error("Error: LINEAR_API_KEY environment variable is missing.");
    console.error("Please generate a Personal API Key in Linear and set it in your environment.");
    process.exit(1);
}

const query = `
query Issue($id: String!) {
  issue(id: $id) {
    title
    description
    state { name }
  }
}`;

const data = JSON.stringify({
    query: query,
    variables: { id: ticketId }
});

const options = {
    hostname: 'api.linear.app',
    path: '/graphql',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
        try {
            const response = JSON.parse(body);
            if (response.errors) {
                console.error("Linear API Error:", response.errors[0].message);
                return;
            }
            const issue = response.data.issue;
            if (!issue) {
                console.error(`Ticket ${ticketId} not found or you do not have permission to view it.`);
                return;
            }
            console.log(`\n### [${ticketId}] ${issue.title} (State: ${issue.state.name})`);
            console.log(`\n${issue.description || 'No description provided.'}\n`);
        } catch (e) {
            console.error("Failed to parse Linear response:", e);
        }
    });
});

req.on('error', (e) => {
    console.error("Request failed:", e);
});

req.write(data);
req.end();
