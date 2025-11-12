document.addEventListener('DOMContentLoaded', () => {
  // ====== STEP NAVIGATION ======
  const startBtn = document.getElementById('start');
  const app = document.getElementById('app');
  const steps = [1, 2, 3, 4, 5];

  function showStep(stepNum) {
    steps.forEach(n => {
      const s = document.getElementById('step' + n);
      const nav = document.getElementById('stepNav' + n);
      if (n === stepNum) {
        s.classList.remove('hidden');
        nav.classList.remove('muted');
        nav.classList.add('selected');
      } else {
        s.classList.add('hidden');
        nav.classList.add('muted');
        nav.classList.remove('selected');
      }
    });
  }

  startBtn.addEventListener('click', () => {
    app.classList.remove('hidden');
    showStep(1);
  });

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    showStep(2);
  });

  document.getElementById('toService').addEventListener('click', () => showStep(3));
  document.getElementById('backTo1').addEventListener('click', () => showStep(1));
  document.getElementById('backTo2').addEventListener('click', () => showStep(2));
  document.getElementById('toDrinks').addEventListener('click', () => showStep(4));
  document.getElementById('backTo3').addEventListener('click', () => showStep(3));
  document.getElementById('toFinish').addEventListener('click', () => updateSummary());

  // ====== COCKTAILS ======
  const cocktails = [
    {
      "id": "GnZ",
      "name": "GnZ",
      "description": "A bold coffee-infused gin cocktail.",
      "ingredients": [
        "Gin (Gilbeys)", "Coffee", "Simple Syrup", "Lime Cordial", "Tonic", "Garnish (Coffee Beans)", "Ice"
      ]
    },
    {
      "id": "WheZee",
      "name": "WheZee",
      "description": "Smooth whiskey blend with Amarula.",
      "ingredients": [
        "Whiskey (Highland Queen)", "Coffee", "Amarula", "Lime Cordial", "Choco Syrup", "Tonic", "Garnish (Coffee Beans)", "Ice"
      ]
    },
    {
      "id": "Gin_Tonic",
      "name": "Gin & Tonic",
      "description": "Classic refreshing gin & tonic.",
      "ingredients": [
        "Gin (Beefeater London Dry)", "Simple Syrup", "Tonic", "Garnish (Lime Wheel & Cucumber)", "Ice"
      ]
    },
    {
      "id": "Ms_Steak",
      "name": "Ms Steak",
      "description": "Citrusy whiskey cocktail for steak lovers.",
      "ingredients": [
        "Whiskey (Highland Queen)", "Ginger Syrup", "Lime", "Soda Water", "Garnish (Salt & Pepper)", "Ice"
      ]
    },
    {
      "id": "Beef_In",
      "name": "Beef In",
      "description": "Refreshing vodka cucumber cocktail.",
      "ingredients": [
        "Vodka (Absolute)", "Cucumber Syrup", "Lime", "Hibiscus Syrup", "Soda Water", "Garnish (Cucumber Strip)", "Ice"
      ]
    },
    {
      "id": "Pink_Lady",
      "name": "Pink Lady",
      "description": "Sweet vodka strawberry cocktail.",
      "ingredients": [
        "Vodka (Absolute)", "Strawberry Puree", "Lime", "Soda Water", "Garnish (Strawberry)", "Ice"
      ]
    },
    {
      "id": "Margarita",
      "name": "Margarita",
      "description": "Tequila-based classic cocktail.",
      "ingredients": [
        "Tequila (Jose Cuervo)", "Triple Sec", "Lime", "Garnish (Salt & Pepper)", "Ice"
      ]
    },
    {
      "id": "Long_Island",
      "name": "Long Island",
      "description": "Powerful mix of five spirits.",
      "ingredients": [
        "Rum (KC)", "Tequila (Jose Cuervo)", "Vodka (Absolute)", "Whiskey (Highland Queen)",
        "Gin (Gilbeys)", "Lime Cordial", "Coke", "Garnish (Lime Wheel & Cucumber)", "Ice"
      ]
    },
    {
      "id": "Mojito",
      "name": "Mojito",
      "description": "Classic rum, mint & lime refresher.",
      "ingredients": [
        "Rum (KC)", "Lime", "Syrup", "Soda Water", "Garnish (Cucumber & Mint)", "Ice"
      ]
    },
    {
      "id": "Strawberry_Fizz",
      "name": "Strawberry Fizz",
      "description": "Fruity mocktail with strawberry & lime.",
      "ingredients": [
        "Strawberry Puree", "Lime Juice", "Soda Water", "Garnish (Strawberry)"
      ]
    },
    {
      "id": "Tropical_Breeze",
      "name": "Tropical Breeze",
      "description": "Light tropical mocktail with pineapple.",
      "ingredients": [
        "Pineapple Juice", "Passion Puree", "Lemon Juice", "Mint", "Soda Water"
      ]
    }
  ];

  const cocktailList = document.getElementById('cocktailList');
  let selectedCocktails = [];

  cocktails.forEach(c => {
    const div = document.createElement('div');
    div.className = "p-2 border rounded cursor-pointer hover:bg-gray-100";

    const title = document.createElement('div');
    title.textContent = c.name;
    title.className = "font-semibold";
    div.appendChild(title);

    const desc = document.createElement('div');
    desc.textContent = c.description;
    desc.className = "text-sm text-gray-500 mb-1";
    div.appendChild(desc);

    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.className = "text-sm text-gray-600 hidden pl-2 mb-1";
    ingredientsDiv.innerHTML = c.ingredients.map(i => `• ${i}`).join('<br>');
    div.appendChild(ingredientsDiv);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "Show ingredients";
    toggleBtn.className = "text-xs text-blue-600 underline mb-1";
    toggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      ingredientsDiv.classList.toggle('hidden');
      toggleBtn.textContent = ingredientsDiv.classList.contains('hidden') ? "Show ingredients" : "Hide ingredients";
    });
    div.appendChild(toggleBtn);

    div.addEventListener('click', () => {
      if (!selectedCocktails.includes(c.name)) {
        selectedCocktails.push(c.name);
        div.classList.add('bg-yellow-50', 'border-yellow-400');
      } else {
        selectedCocktails = selectedCocktails.filter(x => x !== c.name);
        div.classList.remove('bg-yellow-50', 'border-yellow-400');
      }
    });

    cocktailList.appendChild(div);
  });

  // ====== SPIRITS ======
  const beverageType = document.getElementById('beverageType');
  const productName = document.getElementById('productName');
  const addSpiritBtn = document.getElementById('addSpirit');
  const spiritList = document.getElementById('spiritList');
  let selectedSpirits = [];
  let spiritsData = [];

  fetch('./data/spirits.json')
    .then(res => res.json())
    .then(data => {
      spiritsData = data;
      data.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.beverageType;
        opt.textContent = item.beverageType;
        beverageType.appendChild(opt);
      });
    })
    .catch(err => console.error("Error loading spirits.json:", err));

  beverageType.addEventListener('change', () => {
    productName.innerHTML = '<option value="">Select Product</option>';
    const selectedType = spiritsData.find(s => s.beverageType === beverageType.value);
    if (selectedType) {
      selectedType.products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        productName.appendChild(opt);
      });
    }
  });

  addSpiritBtn.addEventListener('click', e => {
    e.preventDefault();
    const prod = productName.value;
    if (prod && !selectedSpirits.includes(prod)) {
      selectedSpirits.push(prod);
      const div = document.createElement('div');
      div.textContent = prod;
      div.className = 'p-2 border rounded bg-gray-50';
      spiritList.appendChild(div);
    }
  });

  // ====== SUMMARY ======
  const summaryArea = document.getElementById('summaryArea');

  function updateSummary() {
    summaryArea.innerHTML = '';

    // Event details
    const eventDetails = {
      name: document.getElementById('eventName').value,
      date: document.getElementById('eventDate').value,
      start: document.getElementById('startTime').value,
      end: document.getElementById('endTime').value,
      venue: document.getElementById('venue').value,
      guests: document.getElementById('guestCount').value
    };

    const selectedService = document.querySelector('input[name="serviceTier"]:checked')?.value;
    let serviceText = '';
    if (selectedService === 'serviceOnly')
      serviceText = 'Service Only — 1 bartender, client provides ingredients. (Ksh 4,500–6,000)';
    else if (selectedService === 'servicePrep')
      serviceText = 'Service + Prep — Bartender provides syrups, garnishes & service. (Ksh 6,000–8,000)';
    else if (selectedService === 'fullExperience')
      serviceText = 'Full Experience — Includes setup, décor, bar & alcohol (Negotiable).';

    const eventHeader = document.createElement('h4');
    eventHeader.textContent = "Event Details:";
    eventHeader.className = "font-bold mt-2";
    summaryArea.appendChild(eventHeader);

    summaryArea.innerHTML += `
      <p><strong>Event:</strong> ${eventDetails.name}</p>
      <p><strong>Date:</strong> ${eventDetails.date}</p>
      <p><strong>Time:</strong> ${eventDetails.start} - ${eventDetails.end}</p>
      <p><strong>Venue:</strong> ${eventDetails.venue}</p>
      <p><strong>Guests:</strong> ${eventDetails.guests}</p>
      <p><strong>Service Tier:</strong> ${serviceText}</p>
    `;

    // Cocktails
    const cocktailsHeader = document.createElement('h4');
    cocktailsHeader.textContent = "Cocktails Selected:";
    cocktailsHeader.className = "font-bold mt-4";
    summaryArea.appendChild(cocktailsHeader);

    if (selectedCocktails.length === 0) {
      summaryArea.innerHTML += "<p class='text-sm text-gray-500'>No cocktails selected.</p>";
    } else {
      selectedCocktails.forEach(cName => {
        const cocktail = cocktails.find(c => c.name === cName);
        const div = document.createElement('div');
        div.innerHTML = `<strong>${cocktail.name}</strong>: ${cocktail.ingredients.join(', ')}`;
        summaryArea.appendChild(div);
      });
    }

    // Spirits
    const spiritsHeader = document.createElement('h4');
    spiritsHeader.textContent = "Spirits & Products Selected:";
    spiritsHeader.className = "font-bold mt-4";
    summaryArea.appendChild(spiritsHeader);

    if (selectedSpirits.length === 0) {
      summaryArea.innerHTML += "<p class='text-sm text-gray-500'>No spirits added.</p>";
    } else {
      selectedSpirits.forEach(s => {
        const div = document.createElement('div');
        div.textContent = s;
        summaryArea.appendChild(div);
      });
    }

    showStep(5);
  }

  // ====== WHATSAPP ======
  document.getElementById('sendWhatsApp').addEventListener('click', () => {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const venue = document.getElementById('venue').value;
    const guestCount = document.getElementById('guestCount').value;

    const selectedService = document.querySelector('input[name="serviceTier"]:checked')?.value;
    let serviceDesc = '';
    if (selectedService === 'serviceOnly')
      serviceDesc = 'Service Only — 1 bartender, client provides ingredients. (Ksh 4,500–6,000)';
    else if (selectedService === 'servicePrep')
      serviceDesc = 'Service + Prep — Bartender provides syrups, garnishes & service. (Ksh 6,000–8,000)';
    else if (selectedService === 'fullExperience')
      serviceDesc = 'Full Experience — Includes setup, décor, bar & alcohol (Negotiable).';

    let message = `🍸 *OMPO Cocktail Experience Summary* 🍸\n\n`;
    message += `*Event:* ${eventName}\n*Date:* ${eventDate}\n*Time:* ${startTime} - ${endTime}\n*Venue:* ${venue}\n*Guests:* ${guestCount}\n\n*Service Tier:* ${serviceDesc}\n\n`;
    message += '*Cocktails:*\n' + (selectedCocktails.length
      ? selectedCocktails.map(cName => {
          const cocktail = cocktails.find(c => c.name === cName);
          return `• ${cocktail.name} — ${cocktail.ingredients.join(', ')}`;
        }).join('\n')
      : 'None selected.') + '\n\n';
    message += '*Spirits:* ' + (selectedSpirits.length ? selectedSpirits.join(', ') : 'None selected.');

    const url = `https://wa.me/254113552476?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
});
