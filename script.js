async function fetchWorldwideData() {
    try {
        // Fetch historical COVID-19 data for the world from the start
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check if data is properly fetched
        if (!data.cases) {
            throw new Error('No cases data found');
        }

        // Extract dates and cases from the data
        const dates = Object.keys(data.cases); // Dates are the keys
        const cases = Object.values(data.cases); // Cases are the values

        console.log('Worldwide Data:', { dates, cases }); // Log to verify

        const ctx = document.getElementById('worldwideChart').getContext('2d');
        new Chart(ctx, {
            type: 'line', // Line chart for trend over time
            data: {
                labels: dates, // Dates for x-axis
                datasets: [{
                    label: 'Confirmed COVID-19 Cases Worldwide',
                    data: cases, // Cases for y-axis
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)', // Line color
                    tension: 0.1 // Smooth line
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `Cases: ${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cases'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString(); // Format numbers with commas
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching worldwide data: ", error);
    }
}

async function fetchUKScotlandData() {
    try {
        // Fetch historical COVID-19 data for the UK (including Scotland)
        const responseUK = await fetch('https://disease.sh/v3/covid-19/historical/UK?lastdays=all');
        if (!responseUK.ok) {
            throw new Error('Network response was not ok for UK data');
        }
        const ukData = await responseUK.json();

        // Log the raw response to inspect its structure
        console.log('UK Data (Raw):', ukData);

        // Ensure data is not undefined or null
        if (!ukData || !ukData.timeline) {
            throw new Error('Invalid data structure for UK cases');
        }

        // Extract dates and cases from the data
        const dates = Object.keys(ukData.timeline.cases);
        const ukCases = Object.values(ukData.timeline.cases);

        // Check if data is properly fetched
        if (dates.length === 0 || ukCases.length === 0) {
            throw new Error('No cases data found for UK');
        }

        // Log the processed data to verify
        console.log('UK and Scotland Combined Data:', { dates, ukCases });

        const ctx = document.getElementById('ukScotlandChart').getContext('2d');
        new Chart(ctx, {
            type: 'line', // Line chart for trend over time
            data: {
                labels: dates, // Dates for x-axis
                datasets: [{
                    label: 'Confirmed COVID-19 Cases in the UK & Scotland',
                    data: ukCases, // UK cases for y-axis
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)', // Line color
                    tension: 0.1 // Smooth line
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `Cases: ${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cases'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString(); // Format numbers with commas
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching UK and Scotland data: ", error);
    }
}

// Call functions to fetch and display data
fetchWorldwideData();
fetchUKScotlandData();