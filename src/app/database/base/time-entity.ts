import { BaseTracker } from './base-tracker';
import { TimeTracker } from './time-tracker';
import { TrashTracker } from './trash-tracker';

export enum TimeType {
  TrashTracker,
  TimeTracker,
}

export const TimeEntityGenerator = (type?: TimeType): Constructor => {
  if (!type) return BaseTracker;

  const typeToClass = {
    [TimeType.TrashTracker]: TrashTracker,
    [TimeType.TimeTracker]: TimeTracker,
  };

  return typeToClass[type];
};
