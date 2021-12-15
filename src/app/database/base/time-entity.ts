import { BaseTracker } from './base-tracker';
import { TimeTracker } from './time-tracker';
import { TrashTracker } from './trash-tracker';
import { Constructor } from '../../../../global';

export enum TimeType {
  TrashTracker,
  TimeTracker,
}

export const TimeEntityGenerator = (type?: TimeType): Constructor<any> => {
  if (!type) return BaseTracker;

  const typeToClass = {
    [TimeType.TrashTracker]: TrashTracker,
    [TimeType.TimeTracker]: TimeTracker,
  };

  return typeToClass[type];
};
