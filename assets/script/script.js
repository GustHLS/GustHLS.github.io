document.addEventListener('DOMContentLoaded', function () {
    // Variáveis para elementos da interface
    const body = document.querySelector('body');
    const sidebar = body.querySelector('nav');
    const toggle = body.querySelector(".toggle");
    const modeSwitch = body.querySelector(".toggle-switch");
    const modeText = body.querySelector(".mode-text");

    // Toggle da sidebar
    if (toggle) {
        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("close");
        });
    }

    // Toggle do modo escuro/claro
    if (modeSwitch) {
        modeSwitch.addEventListener("click", () => {
            body.classList.toggle("dark");
            
            if (body.classList.contains("dark")) {
                modeText.innerText = translations[currentLanguage]?.lightMode || "Light mode";
            } else {
                modeText.innerText = translations[currentLanguage]?.darkMode || "Dark mode";
            }
        });
    }

    // Efeito de digitação
    function typeEffect(element, items, delay = 100, typingSpeed = 100, deleteSpeed = 50) {
        if (!element) return; // Verifica se o elemento existe
        
        let currentItemIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let text = '';
        let interval;

        function type() {
            if (isDeleting) {
                text = items[currentItemIndex].substring(0, currentCharIndex--);
            } else {
                text = items[currentItemIndex].substring(0, currentCharIndex++);
            }
            
            element.textContent = text;
            
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
    if (typedElement) {
        const typedItems = typedElement.getAttribute('data-typed-items').split(', ').map(item => item.trim());
        typeEffect(typedElement, typedItems);
    }

    // Carregamento de projetos do GitHub
    const projectsDiv = document.getElementById('github-projects');
    if (projectsDiv) { // Verifica se o elemento existe antes de tentar usá-lo
        fetch('https://api.github.com/users/gusthls/repos')
            .then(response => response.json())
            .then(data => {
                data.forEach(repo => {
                    const project = document.createElement('div');
                    project.classList.add('project');
      
                    const reposvisual = ['GustHLS', 'GustHLS.github.io'];
      
                    if (!reposvisual.includes(repo.name)) {
                        project.innerHTML = `
                            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                            <p>${repo.description || 'No description'}</p>
                        `;
                        projectsDiv.appendChild(project);
                    }
                });
            })
            .catch(error => console.error('Error fetching repos:', error));
    }
      
    // Cálculo de idade
    const ageElement = document.getElementById('age');
    if (ageElement) {
        const birthDate = new Date(2002, 2, 10); // Mês é 2 porque em JavaScript os meses começam de 0
        const currentDate = new Date();
        
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        
        const isBeforeBirthday = (currentDate.getMonth() < birthDate.getMonth()) || 
                               (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
        
        if (isBeforeBirthday) {
            age--;
        }
        
        ageElement.textContent = age;
    }

    // Variáveis para controle de idioma
    let currentLanguage = 'pt'; // Idioma padrão: português
    
    // Incorporando as traduções diretamente no JavaScript para evitar problemas de CORS
    let translations = {
        "en": {
            "home": "Home",
            "about": "About",
            "skills": "Skills",
            "projects": "Projects",
            "contact": "Contact",
            "langLabel": "Português",
            "darkMode": "Dark mode",
            "lightMode": "Light mode",
            "profession": "Full-Stack Developer",
            "containerTxt": "I'm <span class='typed-container'> <span class='typed' data-typed-items='creating bugs since 2020., Full-Stack Developer.'></span></span>"
        },
        "pt": {
            "home": "Início",
            "about": "Sobre",
            "skills": "Habilidades",
            "projects": "Projetos",
            "contact": "Contato",
            "langLabel": "English",
            "darkMode": "Modo escuro",
            "lightMode": "Modo claro",
            "profession": "Dev Full-Stack",
            "containerTxt": "Estou <span class='typed-container'> <span class='typed' data-typed-items='criando bugs desde 2020., Desenvolvedor Full-Stack.'></span></span>"
        }
    };

    // Função para inicializar idiomas (sem carregar arquivo externo)
    function loadLanguages() {
        try {
            // Recupera a preferência de idioma salva (se existir)
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage) {
                currentLanguage = savedLanguage;
            }
            
            applyLanguage(currentLanguage);
        } catch (error) {
            console.error('Erro ao inicializar idiomas:', error);
        }
    }

    // Função para aplicar o idioma selecionado
    function applyLanguage(lang) {
        if (!translations || !translations[lang]) {
            console.error('Traduções não disponíveis para o idioma:', lang);
            return;
        }
        
        currentLanguage = lang;
        
        // Atualiza os textos
        const homeLink = document.querySelector('a[href="#top"] .nav-text');
        if (homeLink) homeLink.textContent = translations[lang].home;
        
        const aboutLink = document.querySelector('a[href="#about"] .nav-text');
        if (aboutLink) aboutLink.textContent = translations[lang].about;
        
        const skillsLink = document.querySelector('a[href="#resume"] .nav-text');
        if (skillsLink) skillsLink.textContent = translations[lang].skills;
        
        const projectsLink = document.querySelector('a[href="#projects"] .nav-text');
        if (projectsLink) projectsLink.textContent = translations[lang].projects;
        
        const contactLink = document.querySelector('a[href="#footer"] .nav-text');
        if (contactLink) contactLink.textContent = translations[lang].contact;
        
        const langSwitchText = document.querySelector('#language-switch .nav-text');
        if (langSwitchText) langSwitchText.textContent = translations[lang].langLabel;

        const professionText = document.querySelector('.profession');
        if (professionText) professionText.textContent = translations[lang].profession;
        
        const containerText = document.querySelector('.container p');
        if (containerText) {
            containerText.innerHTML = translations[lang].containerTxt;
            
            // Reinicializa o efeito de digitação após alterar o HTML
            const newTypedElement = document.querySelector('.typed');
            if (newTypedElement) {
                const typedItems = newTypedElement.getAttribute('data-typed-items').split(', ').map(item => item.trim());
                typeEffect(newTypedElement, typedItems);
            }
        }
        
        // Atualiza o texto do modo escuro/claro
        if (modeText) {
            modeText.textContent = body.classList.contains('dark') ? 
                translations[lang].lightMode : 
                translations[lang].darkMode;
        }
        
        // Atualiza o atributo lang do HTML
        document.documentElement.lang = lang;
        
        // Salva a preferência de idioma no localStorage
        localStorage.setItem('language', lang);
    }

    // Função para alternar entre idiomas
    function toggleLanguage(e) {
        if (e) e.preventDefault();
        const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
        applyLanguage(newLang);
    }

    // Configuração do botão de troca de idioma
    const languageSwitch = document.getElementById('language-switch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', toggleLanguage);
    }

    // Botão de voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
    }

    // Carrega os idiomas ao iniciar
    loadLanguages();
});