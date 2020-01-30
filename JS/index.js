 window.onload = function () {

        document.getElementById("seaPong").style.display = "none"
        document.getElementById("start-button").onclick = () => {
            document.getElementById("startScreen").style.display = "none"
            document.getElementById("seaPong").style.display = "block"
            seaPong.init('seaPong')

    };
    
}
