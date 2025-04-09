document.addEventListener('DOMContentLoaded', function () {
    const clockSound = document.getElementById('sound');
    let interactedDoc;
    sndBtn=document.getElementById('sound-button')
    sndBtn.addEventListener('click', function(){
        interactedDoc=!interactedDoc;
        interactedDoc? clockSound.play():clockSound.pause();
        interactedDoc?sndBtn.textContent="Sound Off":sndBtn.textContent="Sound On";
    });
    function generateTickMarks() {
        const tickMarksContainer = document.getElementById('tick-marks');
        const textMarksContainer=document.getElementById('text-marks');
        

        // Clear any existing tick marks
        tickMarksContainer.innerHTML = '';

        // Total number of tick marks
        const totalTicks = 60;

        // Loop through each tick mark
        for (let i = 1; i <= totalTicks; i++) {
            const angle = (i * 360) / totalTicks; // Angle in degrees
            const radians = (angle * Math.PI) / 180; // Convert to radians

            // Create a new <li> element for the tick mark
            const tickMark = document.createElement('li');
            const tickText=document.createElement('span');
            tickMark.className = 'tick-mark';

            tickText.className="tick-text";
            tickText.textContent =i;
            // tickText.style.color="gold";
            tickText.style.zIndex="2";
            
            // Position the tick mark using CSS transforms
            tickMark.style.transform = `rotate(${angle}deg) translateY(-300px)`;
            // tickText.style.transform = `rotate(${angle}deg) translateY(-140px) `;
            tickText.style.transform = `
                    rotate(${angle}deg) 
                    translateY(-180px)
                `;
            // Append the tick mark to the container
            // tickMarksContainer.appendChild(tickMark);
            textMarksContainer.appendChild(tickText);
        }
    }

            // Function to generate hour marks
    function generateHourMarks() {
        const hourMarksContainer = document.getElementById('hour-marks');

        // Clear any existing hour marks
        hourMarksContainer.innerHTML = '';

        // Total number of hour marks (12 hours)
        const totalHours = 12;

        // Loop through each hour mark
        for (let i = 0; i < totalHours; i++) {
            const angle = (i * 360) / totalHours; // Angle in degrees
            const radians = (angle * Math.PI) / 180; // Convert to radians

            // Create a new <li> element for the hour mark
            const hourMark = document.createElement('div');
            hourMark.className = 'hour-mark';

            // Position the hour mark using CSS transforms
            hourMark.style.transform = `rotate(${angle}deg) translateY(-190px)`;

            // Append the hour mark to the container
            hourMarksContainer.appendChild(hourMark);
        }
    }

    function setClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDegrees = (seconds / 60) * 360;
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hourDegrees = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

        document.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
        document.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
        document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
        let hr = now.getHours().toString().padStart(2, '0'); // Get the hours in 24-hour format
        let min = now.getMinutes().toString().padStart(2, '0'); // Get the minutes
        let secs = now.getSeconds().toString().padStart(2, '0')
        // Format the time string
        const timeString = `${hr}:${min}:${secs}`;
        document.querySelector('.digitalf').textContent = timeString
        // clockSound.play()
    }
    generateHourMarks();
    generateTickMarks();
    setInterval(()=>{
            setClock();
            if(interactedDoc){
                clockSound.play();
            }
    }, 1000);
    setClock();
});