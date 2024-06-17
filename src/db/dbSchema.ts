import Realm from 'realm';
import {Attendance, ContactSchema, SubscriptionInfo} from './model';


const realm = new Realm({schema: [Attendance, ContactSchema,SubscriptionInfo]});

export default realm;