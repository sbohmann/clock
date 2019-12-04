let canvas = document.getElementById('canvas')

function draw() {
    let random = 1 // 0.05 + (Math.random() * Math.random() * Math.random()) * 0.9
    let width = canvas.clientWidth * random
    let height = canvas.clientHeight * random
    canvas.width = width
    canvas.height = height
    let radius = Math.min(width, height) * 0.425
    let centerX = width / 2
    let centerY = height / 2
    let g = canvas.getContext('2d')
    let angles = calculate_angles()
    g.strokeStyle = 'black'
    g.lineWidth = 5 * Math.sqrt(random)
    g.beginPath()
    g.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    g.stroke()
    let long_tick_start = radius * 0.95
    let short_tick_start = radius * 0.96
    let tick_end = radius * 0.975
    g.lineWidth = 3.5
    function draw_tick(long, angle) {
        g.beginPath()
        let start = long ? long_tick_start : short_tick_start
        g.moveTo(centerX + start * Math.sin(angle), centerY - start * Math.cos(angle))
        g.lineTo(centerX + tick_end * Math.sin(angle), centerY - tick_end * Math.cos(angle))
        g.stroke()
    }
    for (let index = 0; index < 60; ++index) {
        draw_tick(index % 5 === 0, 2 * Math.PI * index / 60)
    }
    let hour_length = radius * 0.6
    let minute_length = radius * 0.9
    let second_length = radius * 0.85
    function draw_hand(angle, length) {
        g.beginPath()
        g.moveTo(centerX, centerY)
        g.lineTo(centerX + length * Math.sin(angle), centerY - length * Math.cos(angle))
        g.stroke()
    }
    g.lineWidth = 5
    draw_hand(angles.hour, hour_length)
    draw_hand(angles.minute, minute_length)
    g.strokeStyle = 'red'
    draw_hand(angles.second, second_length)

    let millisecond = (Date.now() + 50) % 1000
    setTimeout(draw, 1000 - millisecond)
}

function calculate_angles() {
    let time_of_day = Date.now() % 86400000
    time_of_day = Math.trunc((time_of_day + 50) / 1000)
    let hour = 2 * Math.PI * (time_of_day % 43200) / 43200
    let minute = 2 * Math.PI * (time_of_day % 3600) / 3600
    let second = 2 * Math.PI * (time_of_day % 60) / 60
    return {
        hour: hour,
        minute: minute,
        second: second
    }
}

window.onload = () => {
    draw()
    document.body.onresize = draw
}
