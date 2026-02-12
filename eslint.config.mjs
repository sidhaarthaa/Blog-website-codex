import nextVitalsImport from 'eslint-config-next/core-web-vitals.js';

const nextVitals = nextVitalsImport?.default ?? nextVitalsImport;

export default Array.isArray(nextVitals) ? nextVitals : [nextVitals];
