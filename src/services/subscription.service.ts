import { type Subscription } from '../types/types'
import Axios from 'axios'

// TODO: Validate the returned value
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SubscriptionService {
  public static async save(subscription: Subscription): Promise<any> {
    const res = await Axios.post<Subscription>('http://localhost:3004/subscriptions', subscription)
    return res.data
  }
}
