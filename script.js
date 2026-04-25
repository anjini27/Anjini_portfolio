document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.boxShadow = "0 0 15px #38bdf8";
    });

    card.addEventListener('mouseout', () => {
        card.style.boxShadow = "none";
    });
});

const elements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
});

const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    cards.forEach(card => {
        const pos = card.getBoundingClientRect().top;
        if (pos < window.innerHeight - 50) {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }
    });
});

const skills = document.querySelectorAll(".progress");

function animateSkills() {
    skills.forEach(skill => {
        const position = skill.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 50) {
            skill.style.width = skill.getAttribute("data-width");
        }
    });
}

window.addEventListener("scroll", animateSkills);

const skillBlocks = document.querySelectorAll(".skill");

skillBlocks.forEach(skill => {
    const position = skill.getBoundingClientRect().top;
    if (position < window.innerHeight - 50) {
        skill.style.opacity = 1;
        skill.style.transform = "translateY(0)";
    }
});

