import {Subscription} from "../types/types";
import Axios from 'axios'

export default class SubscriptionService {
    public static async save(subscription: Subscription) {
        return await Axios.post<Subscription>("http://localhost:3000/subscriptions", subscription)
    }
}