const sliderContainer = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = '';
let effectUnitMeasure = '';

const DEFAULT_START_VALUE = 100;
const sliderOptions = {
  'NONE': {
    RANGE: {
      MIN: 0,
      MAX: 1,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: '',
    EFFECT_UNIT_MEASURE: '',
  },
  'CHROME': {
    RANGE: {
      MIN: 0,
      MAX: 1,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'grayscale',
    EFFECT_UNIT_MEASURE: '',
  },
  'SEPIA': {
    RANGE: {
      MIN: 0,
      MAX: 1,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'sepia',
    EFFECT_UNIT_MEASURE: '',
  },
  'MARVIN': {
    RANGE: {
      MIN: 0,
      MAX: 100,
    },
    START: 0,
    STEP: 1,
    CURRENT_EFFECT: 'invert',
    EFFECT_UNIT_MEASURE: '%',
  },
  'PHOBOS': {
    RANGE: {
      MIN: 0,
      MAX: 3,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'blur',
    EFFECT_UNIT_MEASURE: 'px',
  },
  'HEAT': {
    RANGE: {
      MIN: 1,
      MAX: 3,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'brightness',
    EFFECT_UNIT_MEASURE: '',
  },
};

function setFilterClass(className) {
  photoPreview.classList = '';
  photoPreview.classList.add(className);
}

function updateSliderOptions({ RANGE: { MIN, MAX }, START, STEP, CURRENT_EFFECT, EFFECT_UNIT_MEASURE }, startValue, display) {
  currentEffect = CURRENT_EFFECT;
  effectUnitMeasure = EFFECT_UNIT_MEASURE;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN,
      max: MAX,
    },
    start: START,
    step: STEP,
  });

  sliderElement.noUiSlider.set(startValue);
  sliderContainer.style.display = display;
}

export function resetEffectSettings() {
  photoPreview.classList = '';
  photoPreview.style.filter = '';

  updateSliderOptions(sliderOptions.NONE, DEFAULT_START_VALUE, 'none');
}

noUiSlider.create(sliderElement, {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  photoPreview.style.filter = `${currentEffect}(${unencoded[handle]}${effectUnitMeasure})`;

  effectLevelValue.setAttribute('value', unencoded[handle]);
});

effectsList.addEventListener('change', (evt) => {
  const target = evt.target;
  const targetEffect = target.value.toUpperCase();

  if (target && target.value === 'none') {
    resetEffectSettings();

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'none');
  }

  if (target && target.value === 'chrome') {
    setFilterClass('effects__preview--chrome');

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'block');
  }

  if (target && target.value === 'sepia') {
    setFilterClass('effects__preview--sepia');

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'block');
  }

  if (target && target.value === 'marvin') {
    setFilterClass('effects__preview--marvin');

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'block');
  }

  if (target && target.value === 'phobos') {
    setFilterClass('effects__preview--phobos');

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'block');
  }

  if (target && target.value === 'heat') {
    setFilterClass('effects__preview--heat');

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'block');
  }
});


