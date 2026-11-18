/**
 * VerdeMetan - Interaktywny Kalkulator Redukcji Emisji i Oszczędności ETS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const sectorRadios = document.querySelectorAll('input[name="sector"]');
  const fuelSourceSelect = document.getElementById('calc-fuel-source');
  const unitSelect = document.getElementById('calc-unit');
  const consumptionRange = document.getElementById('calc-consumption-range');
  const consumptionInput = document.getElementById('calc-consumption-input');
  const etsToggle = document.getElementById('calc-ets-toggle');
  const etsPriceInput = document.getElementById('calc-ets-price');
  const etsPriceWrapper = document.getElementById('calc-ets-price-wrapper');
  const biomethaneShareRange = document.getElementById('calc-share-range');
  const biomethaneShareVal = document.getElementById('calc-share-val');

  // Result displays
  const co2ReductionEl = document.getElementById('res-co2-reduction');
  const etsSavingsPlnEl = document.getElementById('res-ets-savings-pln');
  const etsSavingsEurEl = document.getElementById('res-ets-savings-eur');
  const treeEquivEl = document.getElementById('res-trees-equiv');
  const truckEquivEl = document.getElementById('res-trucks-equiv');
  const ozeShareEl = document.getElementById('res-oze-share');
  const unitLabelEl = document.getElementById('calc-unit-label');

  if (!consumptionRange || !consumptionInput) return;

  // Emission factors (t CO2 / MWh)
  const EMISSION_FACTORS = {
    gas: 0.202,      // Gaz ziemny wysokometanowy E
    lpg: 0.227,      // Gaz płynny LPG
    oil: 0.279,      // Olej opałowy lekki / ciężki
    coal: 0.354,     // Węgiel kamienny (ciepłownictwo)
    diesel: 0.268    // Olej napędowy dla transportu (w przeliczeniu MWh)
  };

  // Unit conversion to MWh
  // 1 m3 gazu E ~= 0.0112 MWh (11.2 kWh)
  // 1 litr oleju opałowego/diesel ~= 0.010 MWh
  // 1 tona węgla ~= 7.0 MWh
  function getMwhEquivalent(value, unit, fuel) {
    if (unit === 'mwh') return value;
    if (unit === 'm3') return value * 0.0112;
    if (unit === 'liters') return value * 0.010;
    if (unit === 'tons') return value * 7.0;
    return value;
  }

  // Update Sector Presets
  function applySectorPreset(sector) {
    if (sector === 'przemysl') {
      fuelSourceSelect.value = 'gas';
      unitSelect.value = 'mwh';
      consumptionRange.min = 2000;
      consumptionRange.max = 120000;
      consumptionRange.step = 1000;
      if (consumptionInput.value < 2000 || consumptionInput.value > 120000) {
        consumptionInput.value = 25000;
      }
      etsToggle.checked = true;
    } else if (sector === 'cieplownictwo') {
      fuelSourceSelect.value = 'gas';
      unitSelect.value = 'mwh';
      consumptionRange.min = 5000;
      consumptionRange.max = 200000;
      consumptionRange.step = 2500;
      consumptionInput.value = 40000;
      etsToggle.checked = true;
    } else if (sector === 'transport') {
      fuelSourceSelect.value = 'diesel';
      unitSelect.value = 'mwh';
      consumptionRange.min = 1000;
      consumptionRange.max = 50000;
      consumptionRange.step = 500;
      consumptionInput.value = 12000;
      etsToggle.checked = false; // standard transport outside ETS1 (until ETS2)
    } else if (sector === 'agro') {
      fuelSourceSelect.value = 'oil';
      unitSelect.value = 'mwh';
      consumptionRange.min = 500;
      consumptionRange.max = 30000;
      consumptionRange.step = 500;
      consumptionInput.value = 8000;
      etsToggle.checked = false;
    }
    updateUnitLabel();
    calculate();
  }

  function updateUnitLabel() {
    const unit = unitSelect.value;
    if (unit === 'mwh') unitLabelEl.textContent = 'MWh / rok';
    else if (unit === 'm3') unitLabelEl.textContent = 'm³ / rok';
    else if (unit === 'liters') unitLabelEl.textContent = 'litrów / rok';
    else if (unit === 'tons') unitLabelEl.textContent = 'ton / rok';
  }

  // Calculation Engine
  function calculate() {
    const consumption = parseFloat(consumptionInput.value) || 0;
    const unit = unitSelect.value;
    const fuel = fuelSourceSelect.value;
    const biomethaneShare = parseFloat(biomethaneShareRange.value) / 100;
    const isEts = etsToggle.checked;
    const etsPriceEur = parseFloat(etsPriceInput.value) || 75; // EUR / ton
    const eurToPln = 4.30;

    // Convert consumption to MWh
    const totalMwh = getMwhEquivalent(consumption, unit, fuel);
    const biomethaneMwh = totalMwh * biomethaneShare;

    // Current baseline emissions
    const baselineFactor = EMISSION_FACTORS[fuel] || 0.202;
    // Biomethane certified emission under RED II has 0 t CO2/MWh direct Scope 1 (net neutral)
    const co2SavedTons = biomethaneMwh * baselineFactor;

    // ETS Savings
    let etsSavingsEur = 0;
    let etsSavingsPln = 0;
    if (isEts) {
      etsSavingsEur = co2SavedTons * etsPriceEur;
      etsSavingsPln = etsSavingsEur * eurToPln;
    }

    // Equivalencies
    // 1 ton of CO2 absorbed by ~50 trees in 1 year
    const trees = Math.round(co2SavedTons * 50);
    // 1 long-haul diesel truck emits ~80 tons CO2 / year
    const trucks = (co2SavedTons / 80).toFixed(1);

    // Render results with smooth animations
    animateValue(co2ReductionEl, Math.round(co2SavedTons), ' t CO₂');
    animateValue(ozeShareEl, Math.round(biomethaneShare * 100), '%');
    animateValue(treeEquivEl, trees.toLocaleString('pl-PL'), '');
    animateValue(truckEquivEl, trucks, '');

    if (isEts) {
      etsSavingsPlnEl.textContent = Math.round(etsSavingsPln).toLocaleString('pl-PL') + ' PLN';
      etsSavingsEurEl.textContent = '(' + Math.round(etsSavingsEur).toLocaleString('pl-PL') + ' €)';
      etsPriceWrapper.style.opacity = '1';
      etsPriceWrapper.style.pointerEvents = 'auto';
    } else {
      etsSavingsPlnEl.textContent = 'Brak EU ETS (N/D)';
      etsSavingsEurEl.textContent = 'Możliwość handlu gwarancjami';
      etsPriceWrapper.style.opacity = '0.5';
      etsPriceWrapper.style.pointerEvents = 'none';
    }

    // Sync share value
    biomethaneShareVal.textContent = Math.round(biomethaneShare * 100) + '%';

    // Store in hidden input for contact form handover
    const hiddenCalcInput = document.getElementById('form-calc-summary');
    if (hiddenCalcInput) {
      hiddenCalcInput.value = `Zapotrzebowanie: ${consumption} ${unitSelect.options[unitSelect.selectedIndex].text}, OZE: ${Math.round(biomethaneShare * 100)}%, Redukcja CO2: ${Math.round(co2SavedTons)} t/rok, ETS oszczędność: ${Math.round(etsSavingsPln)} PLN`;
    }
  }

  // Value animation helper
  function animateValue(element, targetNum, suffix = '') {
    if (!element) return;
    if (typeof targetNum === 'string') {
      element.textContent = targetNum + suffix;
      return;
    }
    const currentNum = parseFloat(element.dataset.val) || 0;
    const diff = targetNum - currentNum;
    const duration = 300;
    const steps = 15;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const val = Math.round(currentNum + (diff * (step / steps)));
      element.textContent = val.toLocaleString('pl-PL') + suffix;
      if (step >= steps) {
        clearInterval(timer);
        element.textContent = targetNum.toLocaleString('pl-PL') + suffix;
        element.dataset.val = targetNum;
      }
    }, stepDuration);
  }

  // Event Listeners
  consumptionRange.addEventListener('input', (e) => {
    consumptionInput.value = e.target.value;
    calculate();
  });

  consumptionInput.addEventListener('input', (e) => {
    consumptionRange.value = e.target.value;
    calculate();
  });

  biomethaneShareRange.addEventListener('input', calculate);
  fuelSourceSelect.addEventListener('change', calculate);
  unitSelect.addEventListener('change', () => {
    updateUnitLabel();
    calculate();
  });
  etsToggle.addEventListener('change', calculate);
  etsPriceInput.addEventListener('input', calculate);

  sectorRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        applySectorPreset(e.target.value);
      }
    });
  });

  // Initial calculation
  applySectorPreset('przemysl');
});
