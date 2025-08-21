// Données de l'application
const appData = {
  "cv_types": [
    {
      "type": "chronologique",
      "title": "CV Chronologique",
      "description": "Idéal pour un parcours linéaire avec une progression claire",
      "best_for": "Professionnels expérimentés, évolution de carrière stable",
      "advantages": ["Facile à lire", "Montre la progression", "Privilégié par les recruteurs"],
      "disadvantages": ["Met en évidence les trous", "Moins adapté aux reconversions"]
    },
    {
      "type": "fonctionnel", 
      "title": "CV Fonctionnel",
      "description": "Met l'accent sur les compétences plutôt que sur la chronologie",
      "best_for": "Reconversion, parcours atypiques, jeunes diplômés",
      "advantages": ["Cache les trous", "Focus sur les compétences", "Flexible"],
      "disadvantages": ["Moins familier aux RH", "Peut susciter des questions"]
    },
    {
      "type": "mixte",
      "title": "CV Mixte",
      "description": "Combine les avantages du chronologique et du fonctionnel",
      "best_for": "Professionnels polyvalents, candidats expérimentés",
      "advantages": ["Équilibre compétences/expérience", "Très complet", "Polyvalent"],
      "disadvantages": ["Plus long", "Peut être complexe à structurer"]
    },
    {
      "type": "creatif",
      "title": "CV Créatif/Digital",
      "description": "Design moderne avec éléments visuels et interactifs",
      "best_for": "Secteurs créatifs, marketing, tech, startups",
      "advantages": ["Se démarque", "Montre la créativité", "Moderne"],
      "disadvantages": ["Pas compatible tous ATS", "Pas adapté à tous secteurs"]
    }
  ],
  "skills_by_sector": {
    "tech": ["JavaScript", "Python", "React", "Node.js", "Cloud Computing", "DevOps", "Agile", "Machine Learning"],
    "marketing": ["SEO/SEM", "Analytics", "Social Media", "Content Marketing", "Email Marketing", "CRM", "Adobe Creative", "Marketing Automation"],
    "finance": ["Excel Avancé", "Analyse Financière", "Comptabilité", "SAP", "Power BI", "Risk Management", "Audit", "Réglementation"],
    "rh": ["Recrutement", "Formation", "SIRH", "Paie", "Droit Social", "Gestion des Talents", "Communication", "Médiation"],
    "commercial": ["Prospection", "Négociation", "CRM", "Closing", "Account Management", "Business Development", "Vente B2B/B2C", "Retail"]
  },
  "phrases_accroches": [
    "Professionnel dynamique avec X années d'expérience en [domaine], spécialisé dans [spécialité] et passionné par [passion]",
    "Expert [métier] orienté résultats, avec un track record prouvé dans [réalisations] et une expertise en [compétences]",
    "Manager expérimenté combinant leadership, expertise technique en [domaine] et vision stratégique pour [objectifs]",
    "[Métier] créatif et analytique, avec une forte capacité à [compétence clé] et [autre compétence] dans des environnements [type d'environnement]"
  ],
  "trends_2025": [
    {
      "trend": "Design Épuré",
      "description": "Mise en page minimaliste avec beaucoup d'espace blanc",
      "tip": "Utilisez au maximum 2-3 couleurs et une police sans-serif moderne"
    },
    {
      "trend": "Optimisation ATS",
      "description": "Format compatible avec les systèmes de tri automatique", 
      "tip": "Évitez les tableaux, utilisez des mots-clés du secteur, format PDF ou DOCX"
    },
    {
      "trend": "Personal Branding",
      "description": "CV qui reflète votre marque personnelle et vos valeurs",
      "tip": "Cohérence avec LinkedIn, ton professionnel mais authentique"
    },
    {
      "trend": "Focus Réalisations",
      "description": "Emphasis sur les résultats quantifiés plutôt que les tâches",
      "tip": "Utilisez des chiffres, pourcentages, montants pour illustrer vos succès"
    },
    {
      "trend": "Formats Hybrides",
      "description": "Combinaison CV traditionnel + portfolio numérique",
      "tip": "Ajoutez un QR code vers votre portfolio ou profil LinkedIn optimisé"
    }
  ],
  "ats_tips": [
    "Utilisez des mots-clés de l'offre d'emploi",
    "Évitez les éléments graphiques complexes", 
    "Utilisez des titres standards (Expérience, Formation, Compétences)",
    "Format PDF ou DOCX uniquement",
    "Police standard (Arial, Calibri, Times New Roman)",
    "Évitez les tableaux et colonnes multiples",
    "Structurez avec des puces et sections claires"
  ]
};

// État de l'application
let currentPage = 'home-page';
let selectedCvType = null;
let currentTabIndex = 0;
let cvData = {
  personal: {},
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  interests: ''
};

// Gestion de la navigation
function showPage(pageId) {
  // Cacher toutes les pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });
  
  // Afficher la page demandée
  document.getElementById(pageId).classList.remove('hidden');
  currentPage = pageId;
  
  // Gérer la navigation fixe
  const bottomNav = document.getElementById('bottom-nav');
  if (pageId === 'cv-creation-page' || pageId === 'resources-page') {
    bottomNav.style.display = 'flex';
    // Mettre à jour les boutons actifs
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (pageId === 'cv-creation-page') {
      document.querySelector('[data-page="cv-creation"]').classList.add('active');
    } else if (pageId === 'resources-page') {
      document.querySelector('[data-page="resources"]').classList.add('active');
    }
  } else {
    bottomNav.style.display = 'none';
  }
  
  // Scroll vers le haut
  window.scrollTo(0, 0);
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  loadCvTypes();
  loadSummarysuggestions();
  loadResourcesContent();
  updateProgress();
}

function setupEventListeners() {
  // Navigation principale
  document.getElementById('start-btn').addEventListener('click', () => showPage('cv-type-page'));
  document.getElementById('back-to-home').addEventListener('click', () => showPage('home-page'));
  document.getElementById('back-to-types').addEventListener('click', () => showPage('cv-type-page'));
  document.getElementById('continue-btn').addEventListener('click', () => {
    if (selectedCvType) {
      showPage('cv-creation-page');
    }
  });
  
  // Navigation fixe
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetPage = e.currentTarget.dataset.page;
      if (targetPage === 'cv-creation') {
        showPage('cv-creation-page');
      } else if (targetPage === 'resources') {
        showPage('resources-page');
      }
    });
  });
  
  // Navigation ressources
  document.getElementById('back-to-cv').addEventListener('click', () => showPage('cv-creation-page'));
  
  // Onglets du formulaire
  document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      switchToTab(index);
    });
  });
  
  // Formulaire personnel
  setupPersonalFormListeners();
  
  // Gestion des expériences
  document.getElementById('add-experience').addEventListener('click', addExperience);
  
  // Gestion de la formation
  document.getElementById('add-education').addEventListener('click', addEducation);
  
  // Gestion des compétences
  document.getElementById('sector-select').addEventListener('change', showSkillsSuggestions);
  document.getElementById('add-skill').addEventListener('click', addSkill);
  document.getElementById('skill-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  });
  
  // Gestion des langues
  document.getElementById('add-language').addEventListener('click', addLanguage);
  
  // Export et modal
  document.getElementById('export-pdf').addEventListener('click', () => showModal('export-modal'));
  document.getElementById('copy-content').addEventListener('click', copyContent);
  
  // Modal
  document.querySelector('.modal-close').addEventListener('click', () => hideModal('export-modal'));
  document.getElementById('download-pdf').addEventListener('click', downloadPDF);
  document.getElementById('copy-formatted').addEventListener('click', copyFormattedContent);
  
  // Fermer modal en cliquant à l'extérieur
  document.getElementById('export-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      hideModal('export-modal');
    }
  });
}

function setupPersonalFormListeners() {
  const fields = ['full-name', 'job-title', 'email', 'phone', 'city', 'linkedin'];
  fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', (e) => {
        cvData.personal[fieldId.replace('-', '_')] = e.target.value;
        updatePreview();
        generateDynamicTips();
      });
    }
  });
  
  // Résumé professionnel
  document.getElementById('professional-summary').addEventListener('input', (e) => {
    cvData.summary = e.target.value;
    updatePreview();
    generateDynamicTips();
  });
  
  // Centres d'intérêt
  document.getElementById('interests').addEventListener('input', (e) => {
    cvData.interests = e.target.value;
    updatePreview();
  });
}

// Gestion des types de CV
function loadCvTypes() {
  const grid = document.getElementById('cv-types-grid');
  grid.innerHTML = '';
  
  appData.cv_types.forEach(type => {
    const card = document.createElement('div');
    card.className = 'cv-type-card';
    card.dataset.type = type.type;
    
    card.innerHTML = `
      <h3>${type.title}</h3>
      <p>${type.description}</p>
      <div class="best-for">Idéal pour : ${type.best_for}</div>
    `;
    
    card.addEventListener('click', () => selectCvType(type));
    grid.appendChild(card);
  });
}

function selectCvType(type) {
  selectedCvType = type;
  
  // Mettre à jour l'interface
  document.querySelectorAll('.cv-type-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`[data-type="${type.type}"]`).classList.add('selected');
  
  // Afficher les détails
  const infoSection = document.getElementById('selected-type-info');
  document.getElementById('selected-type-title').textContent = type.title;
  document.getElementById('selected-type-description').textContent = type.description;
  
  const advantagesList = document.getElementById('type-advantages');
  advantagesList.innerHTML = '';
  type.advantages.forEach(advantage => {
    const li = document.createElement('li');
    li.textContent = advantage;
    advantagesList.appendChild(li);
  });
  
  const disadvantagesList = document.getElementById('type-disadvantages');
  disadvantagesList.innerHTML = '';
  type.disadvantages.forEach(disadvantage => {
    const li = document.createElement('li');
    li.textContent = disadvantage;
    disadvantagesList.appendChild(li);
  });
  
  infoSection.style.display = 'block';
}

// Gestion des onglets
function switchToTab(index) {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  
  // Désactiver tous les onglets
  tabs.forEach(tab => tab.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));
  
  // Activer l'onglet sélectionné
  tabs[index].classList.add('active');
  contents[index].classList.add('active');
  
  currentTabIndex = index;
  updateProgress();
}

function updateProgress() {
  const progress = ((currentTabIndex + 1) / 7) * 100;
  document.getElementById('progress-fill').style.width = `${progress}%`;
}

// Suggestions d'accroche
function loadSummarysuggestions() {
  const container = document.getElementById('summary-suggestions');
  container.innerHTML = '';
  
  appData.phrases_accroches.forEach(phrase => {
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion-item';
    suggestion.textContent = phrase;
    suggestion.addEventListener('click', () => {
      document.getElementById('professional-summary').value = phrase;
      cvData.summary = phrase;
      updatePreview();
    });
    container.appendChild(suggestion);
  });
}

// Gestion des expériences
function addExperience() {
  const experience = {
    id: Date.now(),
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  };
  
  cvData.experiences.push(experience);
  renderExperiences();
  updatePreview();
}

function renderExperiences() {
  const container = document.getElementById('experience-list');
  container.innerHTML = '';
  
  cvData.experiences.forEach(exp => {
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `
      <div class="item-header">
        <h4>Expérience professionnelle</h4>
        <button class="remove-item" onclick="removeExperience(${exp.id})">×</button>
      </div>
      <div class="form-group">
        <label class="form-label">Poste</label>
        <input type="text" class="form-control" value="${exp.position}" onchange="updateExperience(${exp.id}, 'position', this.value)">
      </div>
      <div class="form-group">
        <label class="form-label">Entreprise</label>
        <input type="text" class="form-control" value="${exp.company}" onchange="updateExperience(${exp.id}, 'company', this.value)">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="form-group">
          <label class="form-label">Date de début</label>
          <input type="month" class="form-control" value="${exp.startDate}" onchange="updateExperience(${exp.id}, 'startDate', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Date de fin</label>
          <input type="month" class="form-control" value="${exp.endDate}" onchange="updateExperience(${exp.id}, 'endDate', this.value)" ${exp.current ? 'disabled' : ''}>
        </div>
      </div>
      <div class="form-group">
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" ${exp.current ? 'checked' : ''} onchange="updateExperience(${exp.id}, 'current', this.checked)">
          <span>Poste actuel</span>
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">Description des missions</label>
        <textarea class="form-control" rows="3" onchange="updateExperience(${exp.id}, 'description', this.value)">${exp.description}</textarea>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateExperience(id, field, value) {
  const experience = cvData.experiences.find(exp => exp.id === id);
  if (experience) {
    experience[field] = value;
    if (field === 'current' && value) {
      experience.endDate = '';
    }
    updatePreview();
    generateDynamicTips();
  }
}

function removeExperience(id) {
  cvData.experiences = cvData.experiences.filter(exp => exp.id !== id);
  renderExperiences();
  updatePreview();
}

// Gestion de la formation
function addEducation() {
  const education = {
    id: Date.now(),
    degree: '',
    school: '',
    year: '',
    description: ''
  };
  
  cvData.education.push(education);
  renderEducation();
  updatePreview();
}

function renderEducation() {
  const container = document.getElementById('education-list');
  container.innerHTML = '';
  
  cvData.education.forEach(edu => {
    const div = document.createElement('div');
    div.className = 'education-item';
    div.innerHTML = `
      <div class="item-header">
        <h4>Formation</h4>
        <button class="remove-item" onclick="removeEducation(${edu.id})">×</button>
      </div>
      <div class="form-group">
        <label class="form-label">Diplôme</label>
        <input type="text" class="form-control" value="${edu.degree}" onchange="updateEducation(${edu.id}, 'degree', this.value)">
      </div>
      <div class="form-group">
        <label class="form-label">École/Université</label>
        <input type="text" class="form-control" value="${edu.school}" onchange="updateEducation(${edu.id}, 'school', this.value)">
      </div>
      <div class="form-group">
        <label class="form-label">Année</label>
        <input type="number" class="form-control" value="${edu.year}" onchange="updateEducation(${edu.id}, 'year', this.value)">
      </div>
      <div class="form-group">
        <label class="form-label">Description (optionnel)</label>
        <textarea class="form-control" rows="2" onchange="updateEducation(${edu.id}, 'description', this.value)">${edu.description}</textarea>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateEducation(id, field, value) {
  const education = cvData.education.find(edu => edu.id === id);
  if (education) {
    education[field] = value;
    updatePreview();
  }
}

function removeEducation(id) {
  cvData.education = cvData.education.filter(edu => edu.id !== id);
  renderEducation();
  updatePreview();
}

// Gestion des compétences
function showSkillsSuggestions() {
  const sector = document.getElementById('sector-select').value;
  const suggestionsDiv = document.getElementById('skills-suggestions');
  
  if (sector && appData.skills_by_sector[sector]) {
    const container = document.getElementById('suggested-skills');
    container.innerHTML = '';
    
    appData.skills_by_sector[sector].forEach(skill => {
      if (!cvData.skills.includes(skill)) {
        const span = document.createElement('span');
        span.className = 'skill-suggestion';
        span.textContent = skill;
        span.addEventListener('click', () => {
          addSkillFromSuggestion(skill);
        });
        container.appendChild(span);
      }
    });
    
    suggestionsDiv.style.display = 'block';
  } else {
    suggestionsDiv.style.display = 'none';
  }
}

function addSkillFromSuggestion(skill) {
  if (!cvData.skills.includes(skill)) {
    cvData.skills.push(skill);
    renderSkills();
    showSkillsSuggestions(); // Refresh suggestions
    updatePreview();
  }
}

function addSkill() {
  const input = document.getElementById('skill-input');
  const skill = input.value.trim();
  
  if (skill && !cvData.skills.includes(skill)) {
    cvData.skills.push(skill);
    renderSkills();
    input.value = '';
    updatePreview();
    generateDynamicTips();
  }
}

function renderSkills() {
  const container = document.getElementById('skills-list');
  container.innerHTML = '';
  
  cvData.skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'skill-tag';
    span.innerHTML = `
      ${skill}
      <button class="remove-skill" onclick="removeSkill('${skill}')">×</button>
    `;
    container.appendChild(span);
  });
}

function removeSkill(skill) {
  cvData.skills = cvData.skills.filter(s => s !== skill);
  renderSkills();
  showSkillsSuggestions();
  updatePreview();
}

// Gestion des langues
function addLanguage() {
  const language = {
    id: Date.now(),
    name: '',
    level: ''
  };
  
  cvData.languages.push(language);
  renderLanguages();
  updatePreview();
}

function renderLanguages() {
  const container = document.getElementById('languages-list');
  container.innerHTML = '';
  
  cvData.languages.forEach(lang => {
    const div = document.createElement('div');
    div.className = 'language-item';
    div.innerHTML = `
      <div class="item-header">
        <h4>Langue</h4>
        <button class="remove-item" onclick="removeLanguage(${lang.id})">×</button>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="form-group">
          <label class="form-label">Langue</label>
          <input type="text" class="form-control" value="${lang.name}" onchange="updateLanguage(${lang.id}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Niveau</label>
          <select class="form-control" onchange="updateLanguage(${lang.id}, 'level', this.value)">
            <option value="">Sélectionner</option>
            <option value="Débutant" ${lang.level === 'Débutant' ? 'selected' : ''}>Débutant</option>
            <option value="Intermédiaire" ${lang.level === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
            <option value="Courant" ${lang.level === 'Courant' ? 'selected' : ''}>Courant</option>
            <option value="Bilingue" ${lang.level === 'Bilingue' ? 'selected' : ''}>Bilingue</option>
            <option value="Langue maternelle" ${lang.level === 'Langue maternelle' ? 'selected' : ''}>Langue maternelle</option>
          </select>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateLanguage(id, field, value) {
  const language = cvData.languages.find(lang => lang.id === id);
  if (language) {
    language[field] = value;
    updatePreview();
  }
}

function removeLanguage(id) {
  cvData.languages = cvData.languages.filter(lang => lang.id !== id);
  renderLanguages();
  updatePreview();
}

// Aperçu du CV
function updatePreview() {
  const preview = document.getElementById('cv-preview');
  const personal = cvData.personal;
  
  let html = '';
  
  // En-tête
  if (personal.full_name || personal.job_title) {
    html += '<div class="cv-header">';
    if (personal.full_name) {
      html += `<div class="cv-name">${personal.full_name}</div>`;
    }
    if (personal.job_title) {
      html += `<div class="cv-title">${personal.job_title}</div>`;
    }
    
    const contactInfo = [];
    if (personal.email) contactInfo.push(personal.email);
    if (personal.phone) contactInfo.push(personal.phone);
    if (personal.city) contactInfo.push(personal.city);
    if (personal.linkedin) contactInfo.push(personal.linkedin);
    
    if (contactInfo.length > 0) {
      html += `<div class="cv-contact">${contactInfo.join(' • ')}</div>`;
    }
    html += '</div>';
  }
  
  // Résumé
  if (cvData.summary) {
    html += `
      <div class="cv-section">
        <div class="cv-section-title">RÉSUMÉ PROFESSIONNEL</div>
        <p>${cvData.summary}</p>
      </div>
    `;
  }
  
  // Expériences
  if (cvData.experiences.length > 0) {
    html += '<div class="cv-section"><div class="cv-section-title">EXPÉRIENCE PROFESSIONNELLE</div>';
    cvData.experiences.forEach(exp => {
      if (exp.position || exp.company) {
        html += '<div class="cv-item">';
        html += '<div class="cv-item-header">';
        html += `<span>${exp.position || 'Poste'}</span>`;
        const dates = exp.current ? 
          `${formatDate(exp.startDate)} - Présent` : 
          `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`;
        html += `<span class="cv-dates">${dates}</span>`;
        html += '</div>';
        if (exp.company) {
          html += `<div class="cv-company">${exp.company}</div>`;
        }
        if (exp.description) {
          html += `<div class="cv-description">${exp.description}</div>`;
        }
        html += '</div>';
      }
    });
    html += '</div>';
  }
  
  // Formation
  if (cvData.education.length > 0) {
    html += '<div class="cv-section"><div class="cv-section-title">FORMATION</div>';
    cvData.education.forEach(edu => {
      if (edu.degree || edu.school) {
        html += '<div class="cv-item">';
        html += '<div class="cv-item-header">';
        html += `<span>${edu.degree || 'Diplôme'}</span>`;
        html += `<span class="cv-dates">${edu.year || ''}</span>`;
        html += '</div>';
        if (edu.school) {
          html += `<div class="cv-company">${edu.school}</div>`;
        }
        if (edu.description) {
          html += `<div class="cv-description">${edu.description}</div>`;
        }
        html += '</div>';
      }
    });
    html += '</div>';
  }
  
  // Compétences
  if (cvData.skills.length > 0) {
    html += `
      <div class="cv-section">
        <div class="cv-section-title">COMPÉTENCES</div>
        <div class="cv-skills">
          ${cvData.skills.map(skill => `<span class="cv-skill">${skill}</span>`).join('')}
        </div>
      </div>
    `;
  }
  
  // Langues
  if (cvData.languages.length > 0 && cvData.languages.some(lang => lang.name && lang.level)) {
    html += '<div class="cv-section"><div class="cv-section-title">LANGUES</div>';
    cvData.languages.forEach(lang => {
      if (lang.name && lang.level) {
        html += `<div class="cv-item">${lang.name} - ${lang.level}</div>`;
      }
    });
    html += '</div>';
  }
  
  // Centres d'intérêt
  if (cvData.interests) {
    html += `
      <div class="cv-section">
        <div class="cv-section-title">CENTRES D'INTÉRÊT</div>
        <p>${cvData.interests}</p>
      </div>
    `;
  }
  
  preview.innerHTML = html || '<p style="text-align: center; color: #666; padding: 40px;">Votre CV apparaîtra ici au fur et à mesure que vous remplissez les informations.</p>';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// Conseils dynamiques
function generateDynamicTips() {
  const tipsContainer = document.getElementById('dynamic-tips');
  const tips = [];
  
  // Conseils basés sur le contenu
  if (!cvData.personal.full_name) {
    tips.push({
      type: 'warning',
      text: 'Ajoutez votre nom complet pour personnaliser votre CV.'
    });
  }
  
  if (!cvData.summary) {
    tips.push({
      type: 'warning',
      text: 'Rédigez un résumé professionnel accrocheur pour capter l\'attention des recruteurs.'
    });
  }
  
  if (cvData.experiences.length === 0) {
    tips.push({
      type: 'warning',
      text: 'Ajoutez au moins une expérience professionnelle pour valoriser votre parcours.'
    });
  }
  
  if (cvData.skills.length < 5) {
    tips.push({
      type: 'tip',
      text: 'Ajoutez plus de compétences (5-10 recommandées) pour montrer votre polyvalence.'
    });
  }
  
  if (cvData.experiences.some(exp => !exp.description)) {
    tips.push({
      type: 'tip',
      text: 'Décrivez vos missions et réalisations avec des chiffres pour plus d\'impact.'
    });
  }
  
  if (cvData.skills.length > 0) {
    tips.push({
      type: 'success',
      text: 'Excellent ! Vos compétences sont bien mises en valeur.'
    });
  }
  
  // Conseils ATS
  if (selectedCvType && selectedCvType.type !== 'creatif') {
    tips.push({
      type: 'tip',
      text: 'Votre format de CV est compatible ATS. Utilisez des mots-clés du secteur pour optimiser votre visibilité.'
    });
  }
  
  tipsContainer.innerHTML = '';
  tips.forEach(tip => {
    const div = document.createElement('div');
    div.className = `tip-item ${tip.type}`;
    div.textContent = tip.text;
    tipsContainer.appendChild(div);
  });
}

// Contenu des ressources
function loadResourcesContent() {
  // Tendances design
  const trendsContainer = document.getElementById('design-trends');
  trendsContainer.innerHTML = '';
  
  appData.trends_2025.forEach(trend => {
    const div = document.createElement('div');
    div.className = 'trend-item';
    div.innerHTML = `
      <h4>${trend.trend}</h4>
      <p>${trend.description}</p>
      <div class="trend-tip">${trend.tip}</div>
    `;
    trendsContainer.appendChild(div);
  });
  
  // Conseils ATS
  const atsContainer = document.getElementById('ats-tips-list');
  const atsList = document.createElement('ul');
  appData.ats_tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    atsList.appendChild(li);
  });
  atsContainer.appendChild(atsList);
}

// Export et modal
function showModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function copyContent() {
  const previewText = document.getElementById('cv-preview').textContent;
  navigator.clipboard.writeText(previewText).then(() => {
    alert('Contenu copié dans le presse-papier !');
  });
}

function copyFormattedContent() {
  copyContent();
  hideModal('export-modal');
}

function downloadPDF() {
  // Simulation du téléchargement PDF
  alert('Fonctionnalité de téléchargement PDF simulée.\n\nDans une vraie application, cela générerait un fichier PDF avec votre CV formaté.');
  hideModal('export-modal');
}

// Fonctions globales pour les événements inline
window.updateExperience = updateExperience;
window.removeExperience = removeExperience;
window.updateEducation = updateEducation;
window.removeEducation = removeEducation;
window.updateLanguage = updateLanguage;
window.removeLanguage = removeLanguage;
window.removeSkill = removeSkill;