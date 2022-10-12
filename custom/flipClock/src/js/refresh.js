const refresh = document.getElementById('refresh')

console.log(refresh)
let isRefresh = false
refresh.addEventListener('click', ()=> {
    if (isRefresh) return
    refreshClock()
    refresh.classList.add('rotate-center')
    isRefresh = true
    setTimeout(()=> {
        refresh.classList.remove('rotate-center')
        isRefresh = false
    }, 1000)
})