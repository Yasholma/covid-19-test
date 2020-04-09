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
  factor = Math.floor(factor);
  const timeInDays = 2 ** factor;
  const sInfectionsByRequestedTime = severeCurrentlyInfected * timeInDays;
  const sImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * timeInDays;

  // Challenge 2
  const sCasesByRequestedTime = Math.floor(0.15 * sInfectionsByRequestedTime);
  const sImpactCasesByRequestedTime = Math.floor(0.15 * sImpactInfectionsByRequestedTime);

  const numberOfAvailableBeds = Math.floor(0.35 * totalHospitalBeds);

  const sHospitalBedsByRequestedTime = numberOfAvailableBeds - sCasesByRequestedTime;
  const sImpactHospitalBedsByRequestedTime = numberOfAvailableBeds - sImpactCasesByRequestedTime;

  // Challenge 3
  const sICU = 0.5 * sInfectionsByRequestedTime * 0.1;
  const sCasesForICUByRequestedTime = sICU;
  const sIICU = 0.5 * sImpactInfectionsByRequestedTime;
  const sImpactCasesForICUByRequestedTime = sIICU;

  const sCasesForVentilatorsByRequestedTime = 0.2 * sInfectionsByRequestedTime;
  const sImpactCasesForVentilatorsByRequestedTime = 0.2 * sImpactInfectionsByRequestedTime;

  const inUSD = (avgDailyIncomeInUSD * timeToElapse);
  const sDollarsInFlight = (sInfectionsByRequestedTime * inUSD).toFixed(2);
  const sImpactDollarsInFlight = (sImpactInfectionsByRequestedTime * inUSD).toFixed(2);

  return {
    data,
    impact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesByRequestedTime: sCasesByRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: sCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: sCasesForVentilatorsByRequestedTime,
      dollarsInFlight: sDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: sImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: sImpactCasesByRequestedTime,
      hospitalBedsByRequestedTime: sImpactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: sImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: sImpactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: sImpactDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
