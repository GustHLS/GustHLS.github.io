const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})


modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function typeEffect(element, items, delay = 100, typingSpeed = 100, deleteSpeed = 50) {
        let currentItemIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let text = '';
        let interval;
        const underline = element.parentElement.querySelector('.underline');

        function type() {
            if (isDeleting) {
                text = items[currentItemIndex].substring(0, currentCharIndex--);
            } else {
                text = items[currentItemIndex].substring(0, currentCharIndex++);
            }
            
            element.textContent = text;
            underline.style.width = `${element.offsetWidth}px`; // Ajusta a largura do sublinhado
            
            if (currentCharIndex === items[currentItemIndex].length + 1) {
                isDeleting = true;
                interval = setTimeout(type, delay);
            } else if (currentCharIndex === 0) {
                isDeleting = false;
                currentItemIndex = (currentItemIndex + 1) % items.length;
                interval = setTimeout(type, delay);
            } else {
                interval = setTimeout(type, typingSpeed);
            }
        }

        interval = setTimeout(type, delay);
    }

    const typedElement = document.querySelector('.typed');
    const typedItems = typedElement.getAttribute('data-typed-items').split(', ').map(item => item.trim());

    typeEffect(typedElement, typedItems);
});


document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.github.com/users/gusthls/repos')
        .then(response => response.json())
        .then(data => {
            const projectsDiv = document.getElementById('github-projects');
            data.forEach(repo => {
                const project = document.createElement('div');
                project.classList.add('project');
  
                reposvisual = ['GustHLS', 'GustHLS.github.io']
  
                if (!reposvisual.includes(repo.name)){
                    project.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank"">${repo.name}</a></h3>
                        <p>${repo.description || 'No description'}</p>
                    `;
                    projectsDiv.appendChild(project);
                }
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
  });
  
  const birthDate = new Date(2002, 2, 10); // Mês é 2 porque em JavaScript os meses começam de 0 (Janeiro é 0, Fevereiro é 1, etc)
  
  const currentDate = new Date();
  
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  
  const isBeforeBirthday = (currentDate.getMonth() < birthDate.getMonth()) || 
                           (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
  
  if (isBeforeBirthday) {
    age--;
  }
  
  document.getElementById('age').textContent = age;

window.onscroll = function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 150) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};
