class FlipTimer {
    // 翻页类应该只有控制卡片翻页和数字
    // 个性化定制样式应该新建一个类，这样只要初始化一边，不然需要反复初始化

    // frontNumber = 0;
    // backNumber = 0;

    frontCard
    backCard

    constructor(options = {}, currentNumber = 0, nextNumber = 0) {
        const defaults = {
            // sizeSetting: {
            //     "--card-width": "25rem",
            //     "--card-height": "50rem",
            //     "--normal-number-size": "40rem",
            //     "--border-radius-up": "25px 25px 0 0",
            //     "--border-radius-down": "0 0 25px 25px",
            //     "--colon-size": "20rem",
            //     "--dash-line-size": "5px"
            // },
            // colorSetting: {
            //     "--page-color": "#000000FF",
            //     "--font-color": "#f0f0f0",
            //     "--card-up-color": "#1D1D1DFF",
            //     "--card-down-color": "#1D1D1DFF",
            //     "--dash-line-color": "#940000FF"
            // },
            // false 一格显示一个数字， true 一个显示两个数字
            row: false,
            // 动画持续时间
            duration: 600,
            // 需要操纵的时钟卡片
        }
        this.currentNumber = currentNumber
        this.nextNumber = nextNumber
        //单个卡片的数字内容
        this.card = options.card
        this.isFlipping = false
        this.frontCard = undefined
        this.backCard = undefined
        Object.assign(this, defaults, options)
        this._init()
    }

    _init() {
        this.selectNumberNode()
        this.flip('down')
        // this.flip('up')
        // this._initializeStyle()
    }

    static initializeStyle(styleSetting = {}) {
        const root = document.querySelector(":root")
        styleSetting = Object.assign(styleSetting.colorSetting, styleSetting.sizeSetting)
        if (styleSetting === null) return
        console.log(styleSetting)
        for (const styleK in styleSetting) {
            root.style.setProperty(styleK, styleSetting[styleK])
        }
    }

    /* todo
        一个class大类是一个单个的卡片数字
        1. 生成容器
        2. 生成单个卡片样式 不需要设置时间！！ 返回卡片
        3. 返回的卡片安装到容器内，还可以安装冒号 （可一次性安装 或 单个方法调用 一个个安装）
        4. 1-3基本骨架生成，然后调用flip方法， 生成卡片时间，并且控制翻页(可以在clock类中分开实现)
    */

    static createCardContainer(parentNode) {
        //传入父级节点，生成卡片容器
        const layoutElement = document.createElement('div')
        layoutElement.className = 'layout'
        parentNode.appendChild(layoutElement)
        return layoutElement
    }

    static cardTemplate() {
        const htmlClip = `
          <div class="layout__box card flip--down">
            <!--     前   -->
            <div class="layout__piece card__digit--box front">
                <!--      上      -->
                <span class="layout__content card__number  card__number--up">0</span>
                <!--     下       -->
                <span class="layout__content card__number card__number--down">0</span>
            </div>

            <hr class="splitLine">
            <!--     后-->
            <div class="card__digit--box back">
                <!--      上      -->
                <span class="layout__content card__number card__number--up">0</span>
                <!--     下       -->
                <span class="layout__content card__number card__number--down">0</span>
            </div>
        </div>
`
        const doc = new DOMParser().parseFromString(htmlClip, 'text/html');

        return doc.querySelector(".card");

    }

    static colonTemplate() {
        const htmlClip =
            `
        <div class="colon">:</div>
        `
        const doc = new DOMParser().parseFromString(htmlClip, 'text/html');
        return doc.querySelector(".colon");
    }

    selectNumberNode() {
        // node： 需要装配的节点内
        //创建layout布局，将时钟装入其内c
        this.frontCard = this.card.querySelectorAll('.front>.layout__content')
        this.backCard = this.card.querySelectorAll('.back>.layout__content')
    }

    updateNumber(direction, number) {
        //更新数字 传入对应的前后，与需要更新的数字
        let updateCard
        let updateNumber = number
        if (direction === 'front') {
            updateCard = this.frontCard
            // updateNumber = this.currentNumber
        }

        if (direction === 'back') {
            updateCard = this.backCard
            // updateNumber = this.nextNumber
        }
        updateCard.forEach(
            function (element) {
                element.innerText = updateNumber
            })
    }

    controlFlipAnimation(position, option) {
        // 控制动画添加与删除
        if (option === 'addAnimation') {
            if (position === 'down') {
                this.card.setAttribute('class', 'layout__box card flip--down go')
            }
            if (position === 'up') {
                this.card.setAttribute('class', 'layout__box card flip--up go')
            }
        }
        if (option === 'removeAnimation') {
            this.card.classList.remove('go')
        }
    }

    resetFlip(direction) {
        // 重置前景需要显示的数字
        setTimeout(() => {
            // 去掉动画标签
            this.controlFlipAnimation(direction, 'removeAnimation')
            //正在执行为否
            this.isFlipping = false
            // 前排文字 + 1
            this.updateNumber('front', this.nextNumber)
            // 更新前排文字 与当前显示的后排文字 相同
            this.currentNumber = this.nextNumber;
        }, this.duration);
    }

// 翻牌
    flip(direction) {
        // 初始化，开始更新数字
        // console.log(this.currentNumber)
        // console.log(this.nextNumber)
        // console.log(this.card)
        if (this.isFlipping) return;
        this.isFlipping = true
        // 更新前后数字数字
        this.updateNumber('front', this.currentNumber);
        this.updateNumber('back', this.nextNumber)
        // 设置前排动画
        this.controlFlipAnimation(direction, 'addAnimation')

        //重置卡片 更新前景数字 front
        this.resetFlip(direction)
    }

    set Number({currentNumber, nextNumber}) {
        this.currentNumber = currentNumber
        this.nextNumber = nextNumber
    }
}