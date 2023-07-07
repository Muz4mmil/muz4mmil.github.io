function typename(){
    const typed = new Typed('#typed', {
    strings: ['Muzammil ;)'],
    typeSpeed: 200
      });
}

setTimeout(function(){typename();}, 1500);

// -------------------------------------------------------------------------------

const skillContainer = document.querySelector('.skillpart')

skillSet.map((si)=>{
    let skilli = `<div class="skilli reveal" >
                        <img src="./images/${si.name}.png">
                        <div class="abskill">
                            <p>${si.name}</p>
                            <div class="level">`;
                            for(let i = 0; i < si.level; i++) {
                                skilli+=`<i class="fa-solid fa-star"></i>`
                            };
                            for(let i = 0; i < 3 - si.level; i++) {
                                skilli+=`<i class="fa-regular fa-star"></i>`
                            };
                                
                    skilli+=`  </div>
                            </div>
                        </div>`

    skillContainer.insertAdjacentHTML('beforeend', skilli);
})

// -------------------------------------------------------------------------------

window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for(var i=0; i<reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}

// -------------------------------------------------------------------------------

function changeTheme(){
    document.body.classList.toggle("lightmode");
}

// -------------------------------------------------------------------------------

function sendMail(){

    document.querySelector(".contact-btn").textContent = 'Sending...';

    var params = {
        name: document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    };
    
    const serviceID = "service_vw3axyh";
    const templateID = "template_pp6qbsa";
    
    emailjs.send(serviceID,templateID,params).then(
        res =>{
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            document.querySelector(".contact-btn").textContent = 'Send';
            alert("Message Sent successfully. I'll get back to you ASAP ;)");
        }
    )

    .catch(err=>console.log(err));
}