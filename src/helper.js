const PERIOD = { MONTHS: 'months', WEEKS: 'weeks' };

const getTimeInDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case PERIOD.MONTHS:
      return 30 * timeToElapse;
    case PERIOD.WEEKS:
      return 7 * timeToElapse;
    default:
      return timeToElapse;
  }
};

module.exports = { getTimeInDays };
