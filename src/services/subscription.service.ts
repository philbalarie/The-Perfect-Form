import {Subscription} from "../types/types";
import Axios from 'axios'

export default class SubscriptionService {
    public static async save(subscription: Subscription) {
        const res = await Axios.post<Subscription>("http://localhost:3004/subscriptions", subscription)
        return res.data
    }
}