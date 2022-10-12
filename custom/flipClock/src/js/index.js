/////////////////////////////////////
// colorSetting template
const colorSetting = {sizeSetting: {
        "--card-width": "15rem",
        "--card-height": "30rem",
        "--normal-number-size": "25rem",
        "--border-radius-up": "25px 25px 0 0",
        "--border-radius-down": "0 0 25px 25px",
        "--colon-size": "10rem",
        "--dash-line-size": "3px"
    },
    colorSetting: {
    }}

let flipObjs = []
// 开始计时
//TODO 如果fori = 2 4 则加入冒号

const clock = document.querySelector('.clock')
const layoutContainer = FlipTimer.createCardContainer(clock)
// 初始化样式
FlipTimer.initializeStyle(colorSetting)

// 生成 时钟骨架
let now = new Date()
let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
let nextTimeStr = formatDate(now, 'hhiiss')
for (let i = 0; i < 6; i++) {
    if (i === 2|| i === 4) {
        layoutContainer.appendChild(FlipTimer.colonTemplate())
    }
    const card = FlipTimer.cardTemplate()
    layoutContainer.appendChild(FlipTimer.cardTemplate(card))
}

let cards = clock.querySelectorAll('.card')

for (let i = 0; i < cards.length; i++) {
    flipObjs.push(new FlipTimer( {
        // 每个flipper实例按数组顺序与翻板DOM的顺序一一对应
        card:cards[i],
        // 按数组顺序取时间字符串对应位置的数字
        currentNumber: nowTimeStr[i],
        nextNumber: nextTimeStr[i]

    }))
}

function refreshClock() {
    // 获取当前时间
    let now = new Date()
    let nowTimeStr =  formatDate(now, 'hhiiss')
    let nextTimeStr = formatDate(new Date(now.getTime() + 1000), 'hhiiss')
    for (let i = 0; i < flipObjs.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
        }
        flipObjs[i].Number = {
            currentNumber:nowTimeStr[i],
            nextNumber:nextTimeStr[i]
        }
        flipObjs[i].flip('down')
    }
}

setInterval(function() {
    refreshClock()
}, 1000)