const arrSize = 100
let numbers = []
let timeStart
for (let i = 1; i <= arrSize; i++) numbers.push(i)
numbers.sort(() => Math.random() - .5)
drawArray(numbers)

document.getElementById('btn-start').addEventListener('click', () => {
    (async () => {
        timeStart = Date.now()
        await bubbleSort(numbers)
        drawArray(numbers)
        const time = Date.now() - timeStart
        document.getElementById('time').textContent = (time / 1000).toFixed(2) + ' sec'
    })()
})

document.getElementById('btn-reset').addEventListener('click', () => {
    numbers = []
    for (let i = 1; i <= arrSize; i++) numbers.push(i)
    numbers.sort(() => Math.random() - .5)
    drawArray(numbers)
})

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let isSort = true
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                isSort = false
                const tmp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = tmp
            }
            drawArray(numbers, j + 1)
            await sleep(1)
        }
        if (isSort) break
    }
}

function drawArray(arr, curr = -1) {
    const chart = document.getElementById('chart')
    chart.innerHTML = ''
    chart.style.width = '100%'
    chart.style.height = '500px'
    chart.style.display = 'flex'
    chart.style.alignItems = 'flex-end'
    const biggest = arr.reduce((prev, curr) => curr > prev ? prev = curr : prev = prev)
    arr.forEach((n, i) => {
        const nElement = document.createElement('div')
        const heightSize = (n / biggest) * 100
        nElement.style.height = heightSize + '%'
        if (curr === i) {
            nElement.style.backgroundColor = '#0F0'
        } else {
            nElement.style.backgroundColor = `rgb(${0}, ${0}, ${(heightSize / 100) * 255})`
        }
        nElement.style.flexGrow = 1
        chart.appendChild(nElement)
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
