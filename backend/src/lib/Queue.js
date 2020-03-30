import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import DeliveryNotificationMail from '../app/jobs/DeliveryNotificationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail, DeliveryNotificationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        queue: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].queue.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { queue, handle } = this.queues[job.key];

      queue.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
