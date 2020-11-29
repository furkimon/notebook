import React, { useEffect } from 'react'
import './Notes.css'


const Loading = () => {

    var loading = 'loading...'.split('')
    var loadAnimation
    var loadTimer1
    var loadTimer2

    // useEffect(() => {
    //         runAnimation()
    // }, [])

    const animateLoading = () => {  // loading animation
        if (document.getElementById("loading").style.display !== "none") {
            for (let i = 0; i < loading.length; i++) {
                loadTimer1 = setTimeout(() => {
                    document.getElementById(`member${i}`).style.animation = "hop 0.6s ease-in-out"
                }, (i + 1) * 100)

                loadTimer2 = setTimeout(() => {
                    document.getElementById(`member${i}`).style.animation = "none"
                }, (i + 1) * 100 + 600)
            }
        } else {
            document.getElementById('loading').style.display = "none"
            clearTimeout(loadTimer1)
            clearTimeout(loadTimer2)
            clearInterval(loadAnimation)
        }
    }

    const runAnimation = () => {  // "animateLoading" runs right away and with interval afterwards
        animateLoading()
        loadAnimation = setInterval(() => {
            animateLoading()
        }, 1000)
    }

    return (
        <div className="loading" id="loading">
            {loading.map((member, i) => {
                return <h1 id={`member${i}`} className={`loadingMember member${i}`}>{member}</h1>
            })}
        </div>
    )
}

export default Loading
