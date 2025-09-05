 // Update Donuts
function getColor(progress) {
    if (progress < 40) return "#ef4444"; 
    if (progress < 70) return "#f59e0b"; 
    return "#22c55e";                    
}

function updateDonut(donut) {
    const styles = getComputedStyle(donut);
    const progress = parseInt(styles.getPropertyValue("--progress"));
    const color = getColor(progress);

    donut.style.background = `
        conic-gradient(${color} ${progress}%, #0a067d 0)
    `;
    // donut.querySelector(".donut-percentage").textContent = progress + "%";
    // donut.querySelector(".donut-note").textContent = "₹" + saved_amount
}

document.querySelectorAll(".donut").forEach(donut => updateDonut(donut));


// Chart Variables
const left_section_breakpoint = 500;
const right_section_breakpoint = 325;


// Monthly Cashflow Chart
const mcc = document.getElementById('monthly-cashflow-chart').getContext('2d');

const incomeExpenseChart = new Chart(mcc, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Income',
                data: [1200, 1500, 1800, 1700, 2000, 2200],
                backgroundColor: 'rgba(34,197,94, 0.7)',  // green
                borderRadius: 8
            },
            {
                label: 'Expense',
                data: [800, 1200, 1100, 1300, 1600, 1400],
                backgroundColor: 'rgba(239,68,68, 0.7)',  // red
                borderRadius: 8
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                labels: {
                    boxWidth: 15,
                    font: {
                        family: 'Inter',
                        size: 11,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                }
            },

            title: {
                display: true,
                text: 'Monthly Cashflow',
                font: {
                    family: 'Inter',
                    size: 18,
                    weight: 600
                },
                color: '#ffffff'
            },
        },

        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    },
                    color: '#ddd'
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)', //  grid line color
                    borderColor: '#666',            //  axis line color
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                }
            },

            y: {
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    },
                    color: '#ddd'
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                    borderColor: '#666',
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                }
            }
        },

        onResize: (chart, size) => {
            if (size.width < left_section_breakpoint) { 
                chart.options.plugins.title.font.size = 14;
                chart.options.plugins.legend.labels.font.size = 10;  
                chart.options.plugins.legend.labels.boxWidth = 10;   
                chart.options.scales.x.ticks.font.size = 10;
                chart.options.scales.y.ticks.font.size = 10;
            } else {
                chart.options.plugins.title.font.size = 16;
                chart.options.plugins.legend.labels.font.size = 12; 
                chart.options.plugins.legend.labels.boxWidth = 16; 
                chart.options.scales.x.ticks.font.size = 12;
                chart.options.scales.y.ticks.font.size = 12; 
            }
            chart.update();
        },
    }
});


// Expense Breakdown Pie chart
const exp = document.getElementById('expense-chart');

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment"];
const amounts = [2500, 1200, 1800, 2200, 800];
const total = amounts.reduce((a, b) => a + b, 0);

const expenseOverview = new Chart(exp, {
    type: 'pie',
    data: {
        labels: categories,
        datasets: [{
            data: amounts,
            backgroundColor: [
                "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"
            ],
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let category = context.label;
                        let value = context.raw;
                        let percentage = ((value / total) * 100).toFixed(1);
                        return `${category}: ₹${value} (${percentage}%)`;
                    }
                }
            },

            title: {
                display: true,
                text: 'Expense Overview',
                font: {
                    family: 'Inter',
                    size: 18,
                    weight: 'bold'
                },
                color: '#ffffff'
            },

            legend: {
                labels: {
                    boxWidth: 12,   
                    boxHeight: 12, 
                    color: '#ffffff',
                    font: {
                        size: 12,   
                        family: "Inter",
                    }
                }, 
                position: "top"  
            } 
        },

        onResize: (chart, size) => {
            if (size.width < right_section_breakpoint) { 
                chart.options.plugins.title.font.size = 14;
                chart.options.plugins.legend.labels.font.size = 10;  
                chart.options.plugins.legend.labels.boxWidth = 10;   
            } else {
                chart.options.plugins.title.font.size = 16;
                chart.options.plugins.legend.labels.font.size = 12; 
                chart.options.plugins.legend.labels.boxWidth = 16; 
            }
            // Update Legend Position
            if (size.width < 350) {
                chart.options.plugins.legend.position = "top";
            } else {
                chart.options.plugins.legend.position = "left"
            }
            chart.update();
        },
    }
});


// Monthly Cashflow LineChart
const lnc = document.getElementById('line-chart').getContext('2d');
const data = {
    labels: [
        "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "11", "12", "13",
        "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "24", "25",
        "26", "27", "28", "29", "30"
    ],
    datasets: [
        {
            label: "Income",
            data: [200, 400, 500, 700, 300, 600, 800, 900, 1200, 1000, 950, 1100, 1300, 1250, 1400, 1600, 1500, 1700, 1650, 1800, 1900, 2100, 2200, 2000, 2300, 2400, 2500, 2600, 2700, 2800],
            borderColor: "#4caf50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            tension: 0.3,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8,
        },
        {
            label: "Expense",
            data: [150, 200, 300, 400, 250, 500, 600, 700, 900, 850, 800, 950, 1000, 1050, 1100, 1200, 1250, 1300, 1400, 1450, 1500, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000],
            borderColor: "#f44336",
            backgroundColor: "rgba(244, 67, 54, 0.2)",
            tension: 0.3,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8,
        }
    ]
};

const lineChart = new Chart(lnc, {
    type: "line",
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                label: function(context) {
                    const value = context.raw;
                    const category = context.dataset.label;
                    return `${category}: $${value}`;
                },
                title: function(context) {
                    return `Day ${context[0].label}`;
                }
                }
            },
            legend: {
                position: "top",
                labels: {
                    boxWidth: 15,
                    font: { 
                        family: 'Inter',
                        size: 12,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                }
            },
            title: {
                display: true,
                text: "Income vs Expense - Monthly Trend",
                font: {
                    family: 'Inter',
                    size: 14,
                    weight: 'bold'
                },
                color: '#ffffff'
            }
        },

        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    },
                    color: '#ddd'
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)', //  grid line color
                    borderColor: '#666',            //  axis line color
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                }
            },

            y: {
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    },
                    color: '#ddd'
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                    borderColor: '#666',
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                }
            }
        },
        
        onResize: (chart, size) => {
            if (size.width < left_section_breakpoint) { 
                chart.options.plugins.title.font.size = 14;
                chart.options.plugins.legend.labels.font.size = 10;  
                chart.options.plugins.legend.labels.boxWidth = 10;   
                chart.options.scales.x.ticks.font.size = 10;
                chart.options.scales.y.ticks.font.size = 10;
            } else {
                chart.options.plugins.title.font.size = 16;
                chart.options.plugins.legend.labels.font.size = 12; 
                chart.options.plugins.legend.labels.boxWidth = 16; 
                chart.options.scales.x.ticks.font.size = 12;
                chart.options.scales.y.ticks.font.size = 12; 
            }
            chart.update();
        },
    }
});


// Savings Line Chart
const scc = document.getElementById('savingsChart').getContext('2d');
const savingsChart = new Chart(scc, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
        {
            label: 'Savings Balance',
            data: [500, 800, 1200, 1600, 2000, 2700, 3500],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#4CAF50'
        },
        {
            label: 'Investments Value',
            data: [200, 400, 700, 1000, 1400, 2000, 2800],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#2196F3'
        }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    boxWidth: 12,   
                    boxHeight: 12, 
                    color: '#ffffff',
                    font: {
                        size: 12,   
                        family: "Inter",
                    }
                }, 
                position: "top"  
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            title: {
                display: true,
                text: "Savings Growth",
                font: {
                    size: 12,
                    weight: "bold",
                },
                color: "#ffffff"
            },
        },

        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    },
                    color: '#ddd'
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)', //  grid line color
                    borderColor: '#666',            //  axis line color
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                }
            },

            y: {
                title: {
                    display: true,
                    text: 'Amount (₹)'
                },
                beginAtZero: true,
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    },
                    color: '#ddd'
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                    borderColor: '#666',
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                }
            }
        },

        onResize: (chart, size) => {
            if (size.width < right_section_breakpoint) { 
                chart.options.plugins.title.font.size = 14;
                chart.options.plugins.legend.labels.font.size = 10;  
                chart.options.plugins.legend.labels.boxWidth = 10;   
                chart.options.scales.x.ticks.font.size = 10;
                chart.options.scales.y.ticks.font.size = 10;
            } else {
                chart.options.plugins.title.font.size = 16;
                chart.options.plugins.legend.labels.font.size = 12; 
                chart.options.plugins.legend.labels.boxWidth = 16; 
                chart.options.scales.x.ticks.font.size = 12;
                chart.options.scales.y.ticks.font.size = 12; 
            }
            chart.update();
        },
    }
});




// Saving Goals
// const drawer = document.getElementById('drawer');
// let currentId = null;
// function openDrawer(id){
//     currentId = id; const g = goals.find(x=>x.id===id); if(!g) return;
//     document.getElementById('d-title').innerText = g.title;
//     document.getElementById('d-meta').innerText = `Target ₹${number(g.target)} • Saved ₹${number(totalSaved(g))} • ${progress(g)}%`;
//     drawer.style.display='flex';
//     renderBigChart(g);
//     renderHistory(g);
// }
// document.getElementById('d-close').addEventListener('click',()=>{drawer.style.display='none'; currentId=null});
// document.getElementById('d-edit').addEventListener('click',()=> openModal(currentId));


// function openModal(id){ 
//     modal.style.display='block'; 
//     document.getElementById('modal-title').innerText = id? 'Edit Goal' : 'New Goal';
//     if(id){
//         const g = goals.find(x=>x.id===id);
//         document.getElementById('g-title').value=g.title;
//         document.getElementById('g-target').value=g.target; 
//         document.getElementById('g-start').value=totalSaved(g); 
//         document.getElementById('g-tags').value=(g.tags||[]).join(','); document.getElementById('save').dataset.id=id 
//     } else { 
//         document.getElementById('g-title').value=''; 
//         document.getElementById('g-target').value=''; 
//         document.getElementById('g-start').value=0; document.getElementById('g-tags').value=''; 
//         document.getElementById('save').removeAttribute('data-id') 
//     }
// }

// function closeModal(){ 
//     modal.style.display='none'; 
//     document.getElementById('save').removeAttribute('data-id') 
// }



// const card = document.createElement('article'); card.className='card'; card.tabIndex=0;

// // Saving Goals actions
// card.querySelector('[data-action=open]').addEventListener('click',()=>openDrawer(goal.id));
// card.querySelector('[data-action=edit]').addEventListener('click',()=>openModal(goal.id));
// card.querySelector('[data-action=delete]').addEventListener('click',()=> { 
//     if(confirm('Delete this goal?')){
//         goals = goals.filter(g=>g.id!==goal.id); 
//         save(goals); 
//         renderGoals(document.getElementById('filter').value)
//     }; 
// });