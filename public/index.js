async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


// API = 1240993e7b15419eb1016ed41f387095

// async function stockRequest() {
//     const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=15min&format=JSON&apikey=1240993e7b15419eb1016ed41f387095');
//     const responseJson = await response.json();
//     console.log(responseJson);

// }

const { GME, MSFT, DIS, BNTX } = mockData;

const stocks = [GME, MSFT, DIS, BNTX];

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

stocks.forEach(stock => stock.values.reverse())

new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
    }))
        }
    });
new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest Stock',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    highestStock(stock.values)
                ))
            }]
        }
    });

function highestStock(values) {
    let highestValue = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highestValue) {
            highestValue = value.high
        }
        })
        return highestValue
    }    

}

main()


