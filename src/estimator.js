const { getTimeInDays } = require('./helper');

function hosBeds(avBed, container) {
  return Math.trunc(avBed - container.severeCasesByRequestedTime);
}

function infections(container, factor) {
  return container.currentlyInfected * (2 ** factor);
}

function severeCases(container) {
  return Math.trunc(0.15 * (container.infectionsByRequestedTime));
}

function vent(container) {
  return Math.trunc(0.02 * container.infectionsByRequestedTime);
}

function icu(container) {
  return Math.trunc(0.05 * container.infectionsByRequestedTime);
}

function dollarsInFlight(container, avgIncome, income, days) {
  return +Math.trunc((container.infectionsByRequestedTime * avgIncome * income) / days);
}

const computeCurrentlyInfected = (field, value) => field * value;

const covid19ImpactEstimator = (data) => {
  const {
    periodType: period,
    timeToElapse: time,
    reportedCases,
    totalHospitalBeds: beds,
    region: {
      avgDailyIncomeInUSD: income,
      avgDailyIncomePopulation: avgIncome
    }
  } = data;

  const impact = {};
  const severeImpact = {};

  // Challenge 1
  impact.currentlyInfected = computeCurrentlyInfected(reportedCases, 10);
  severeImpact.currentlyInfected = computeCurrentlyInfected(reportedCases, 50);

  const inDays = getTimeInDays(period, time);
  const factor = Math.trunc(inDays / 3);

  impact.infectionsByRequestedTime = infections(impact, factor);
  severeImpact.infectionsByRequestedTime = infections(severeImpact, factor);

  // Challenge 2
  impact.severeCasesByRequestedTime = severeCases(impact);
  severeImpact.severeCasesByRequestedTime = severeCases(severeImpact);

  const avBed = 0.35 * beds;
  impact.hospitalBedsByRequestedTime = hosBeds(avBed, impact);
  severeImpact.hospitalBedsByRequestedTime = hosBeds(avBed, severeImpact);

  // Challenge 3
  impact.casesForICUByRequestedTime = icu(impact);
  severeImpact.casesForICUByRequestedTime = icu(severeImpact);
  impact.casesForVentilatorsByRequestedTime = vent(impact);
  severeImpact.casesForVentilatorsByRequestedTime = vent(severeImpact);
  impact.dollarsInFlight = dollarsInFlight(impact, avgIncome, income, inDays);
  severeImpact.dollarsInFlight = dollarsInFlight(severeImpact, avgIncome, income, inDays);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
