const { getTimeInDays } = require('./helper');

const covid19ImpactEstimator = (data) => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    region: {
      avgDailyIncomeInUSD
    }
  } = data;

  // Challenge 1
  const severeCurrentlyInfected = reportedCases * 10;
  const severeImpactCurrentlyInfected = reportedCases * 50;
  let factor = getTimeInDays(periodType, timeToElapse) / 3;
  factor = Math.trunc(factor);
  const timeInDays = 2 ** factor;
  const sInfectionsByRequestedTime = severeCurrentlyInfected * timeInDays;
  const sImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * timeInDays;

  // Challenge 2
  const sCasesByRequestedTime = Math.trunc(0.15 * sInfectionsByRequestedTime);
  const sImpactCasesByRequestedTime = Math.trunc(0.15 * sImpactInfectionsByRequestedTime);
  const nOfAvailableBeds = 0.35 * totalHospitalBeds;
  const sHospitalBedsByRequestedTime = Math.trunc(nOfAvailableBeds - sCasesByRequestedTime);
  const sImpactHospitalBedsByRT = Math.trunc(nOfAvailableBeds - sImpactCasesByRequestedTime);

  // Challenge 3
  const sInfectionsBRT = severeCurrentlyInfected * getTimeInDays(periodType, timeToElapse);
  const sIInfectionsBRT = severeImpactCurrentlyInfected * getTimeInDays(periodType, timeToElapse);
  const sICU = Math.trunc(0.05 * sInfectionsBRT);
  const sIICU = Math.trunc(0.05 * sIInfectionsBRT);
  const sCasesForICUByRequestedTime = sICU;
  const sImpactCasesForICUByRequestedTime = sIICU;

  const sCasesForVenBRT = Math.trunc(0.02 * sInfectionsBRT);
  const sImpactCasesForVenBRT = Math.trunc(0.02 * sIInfectionsBRT);

  const inUSD = (avgDailyIncomeInUSD * timeToElapse);
  const sDollarsInFlight = +(sInfectionsByRequestedTime * inUSD).toFixed(2);
  const sImpactDollarsInFlight = +(sImpactInfectionsByRequestedTime * inUSD).toFixed(2);

  return {
    data,
    impact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesByRequestedTime: sCasesByRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: sCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: sCasesForVenBRT,
      dollarsInFlight: sDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: sImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: sImpactCasesByRequestedTime,
      hospitalBedsByRequestedTime: sImpactHospitalBedsByRT,
      casesForICUByRequestedTime: sImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: sImpactCasesForVenBRT,
      dollarsInFlight: sImpactDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
