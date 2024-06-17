export const ContactSchema = {
  name: 'Contact5',
  properties: {
    id: 'string',
    name: 'string',
    phone: 'string',
    gender: 'string',
    address: 'string',
    dob: 'string',
    dateDOJ: 'string',
    status: 'string', //User Active/Closed
    image: 'string',
  },
};

export const SubscriptionInfo = {
  name: 'SubscriptionInfo',
  properties: {
    id: 'string',
    payment: 'string',
    status: 'string', // Subscription Active/Closed
    paymentFrequency: 'string',
    startDate: 'string',
    endDate: 'string',
  },
};

export const Attendance = {
  name: 'Attendance',
  properties: {
    id: 'string',
    Date: 'string',
    inTime: 'string',
    outTime: 'string',
  },
};
