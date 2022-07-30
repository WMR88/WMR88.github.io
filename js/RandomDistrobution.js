const runButton2 = document.getElementById("runButton2");
const inputField1 = document.getElementById("inputField1");

var totalPicks = 300;
var myArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const ctx2 = document.getElementById('MainWeekZeroCanvas2').getContext('2d');
var myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'Random Distrobution',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(66, 66, 66, 0.6)'

            ],
            borderColor: [
                'rgba(20, 20, 20, 1)'

            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 50
            }
        }
    }
});

function makePicks() {
    for(let i = 0; i < totalPicks; i++) {
        let rand = Math.floor(Math.random() * 10);
        myArray[rand] += 1;       
    }
    myChart.data.datasets[0].data = myArray;
    myChart.update();
}

runButton2.addEventListener('click', ()=> {
    myArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    makePicks();
})
